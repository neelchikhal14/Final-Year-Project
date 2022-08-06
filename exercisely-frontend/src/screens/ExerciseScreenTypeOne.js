import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import '@tensorflow/tfjs-core';
import Webcam from 'react-webcam';
import '@tensorflow/tfjs-backend-webgl';
import * as poseDetection from '@tensorflow-models/pose-detection';
import { updateExerciseStats } from '../actions/patientActions';
import {
  drawCanvas,
  getExerciseStats,
  calculateStatistics,
  setCurrentAngles,
} from '../utlities/utilities';

import './css/ExerciseScreenTypeOne.css';

let timer;
let det;
let stats = [];

const ExerciseScreenTypeOne = ({ setReady, duration, history }) => {
  //init history
  // const history = useHistory();
  //init dispatch
  const dispatch = useDispatch();
  //access states from store
  const { selectedExercise } = useSelector(
    (state) => state.patientSelectExercises
  );
  const { name, bodyParams } = selectedExercise[0];
  const assignedExercise = useSelector(
    (state) => state.patientAssignedExercises
  );
  const {
    assignedExercisesDetailed: { pendingExercises },
  } = assignedExercise;

  // create local state

  //create refs
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  // init local state
  const [detailedExercise, setDetailedExercise] = useState(null);
  const [displayMedialements, setDisplayMedialements] = useState(true);
  const [currentAngleInfo, setCurrentAngleInfo] = useState({});

  //model init
  const model = poseDetection.SupportedModels.BlazePose;
  const detectorConfig = {
    runtime: 'tfjs',
    modelType: 'heavy',
  };

  async function initPoseDetection() {
    const poseDetector = await poseDetection.createDetector(
      model,
      detectorConfig
    );
    return poseDetector;
  }

  async function start() {
    // await initCamera();
    console.log('2. start');
    det = await initPoseDetection();
    // setReady(true);
    timer = setInterval(() => {
      render(det);
    }, 500);
  }

  function poseColor(poses) {
    if (poses[0].score > 0.7) {
      return 'pink';
    } else if (poses.score <= 0.7 && poses.score > 0.4) {
      return 'yellow';
    } else {
      return 'red';
    }
  }

  async function render(det) {
    if (
      typeof webcamRef.current !== 'undefined' &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // console.log('3.render if');
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;
      // Make Detections
      const estimationConfig = { flipHorizontal: false };

      const poses = await det.estimatePoses(video, estimationConfig);
      let theColor = poseColor(poses);

      if (poses[0].score > 0.5 && canvasRef.current !== null) {
        // console.log('main operations');
        drawCanvas(poses, videoWidth, videoHeight, canvasRef, theColor);

        let temp = getExerciseStats(poses, bodyParams);
        stats = [...stats, ...temp];
        setCurrentAngleInfo(setCurrentAngles(poses, bodyParams));
      }
    }
  }

  const begin = () => {
    console.log('1. begin');
    setReady(true);
    start();
  };

  const genStats = () => {
    // normaliseExerciseStats(stats);
    // console.log('clicked');
    console.log(stats);
    const finalStats = calculateStatistics(stats);
    console.log(finalStats);
    console.log('****');
    console.log(detailedExercise);
    console.log(detailedExercise.exerciseId, finalStats);
    setDisplayMedialements(false);
    dispatch(updateExerciseStats(detailedExercise.exerciseId, finalStats));
    if (timer) {
      console.log(timer);
      clearInterval(timer);
    }
    console.log(history);
    history.push(`/patient-dashboard`);
  };
  useEffect(() => {
    if (duration === 0) {
      setDisplayMedialements(false);
      clearInterval(timer);
    }
  }, [duration]);

  useEffect(() => {
    const exercise = pendingExercises.filter(
      (ex) => ex.exerciseId === selectedExercise[0]._id
    );
    console.log(exercise);
    setDetailedExercise(...exercise);
  }, [detailedExercise, pendingExercises, selectedExercise]);

  return (
    <>
      <section className='exercise-section'>
        {displayMedialements && (
          <>
            <div className='media'>
              <Webcam id='webcam' ref={webcamRef} />
              <canvas ref={canvasRef} id='my-canvas' />
            </div>

            <div className='exercise-info'>
              <h3>Instructions</h3>
              <ul>
                <li>
                  You are about to start a session of <b>{name}</b>
                </li>
                {detailedExercise !== null &&
                  detailedExercise.instructions.map((ins, idx) => (
                    <li key={idx}>{ins}</li>
                  ))}
              </ul>
              <span className='rep-count'>
                <b>Duration :</b>
                {duration}
              </span>
              <div>
                {Object.keys(currentAngleInfo).length > 0 &&
                  Object.keys(currentAngleInfo).map((key) => (
                    <span>
                      {key} = {currentAngleInfo[key]}
                    </span>
                  ))}
              </div>
              <button onClick={() => begin()} className='start-exercise-button'>
                Start
              </button>
            </div>
          </>
        )}
        {!displayMedialements && (
          <>
            <div className='exercise-complete-banner'>
              <img
                src='../images/exercise-complete-banner.jpg'
                alt='exercise-complete-banner'
              />
            </div>
            <div className='exercise-complete-info'>
              <h2>Wohoo!!</h2>
              <h3>You have successfully completed the session</h3>
              <h4>Please click the below button to generate Statistics</h4>
              <button onClick={genStats} className='genrate-stats-button'>
                Generate Statistics
              </button>
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default ExerciseScreenTypeOne;
