import React, { useRef, useState, useEffect } from 'react';
import '@tensorflow/tfjs-core';
import Webcam from 'react-webcam';
import '@tensorflow/tfjs-backend-webgl';
import * as poseDetection from '@tensorflow-models/pose-detection';
import {
  drawCanvas,
  getExerciseStats,
  calculateStatistics,
  normaliseExerciseStats,
  setExerciseInformation,
  measureAngle,
  calculateAngle,
} from '../utlities/utilities';

import './ExerciseTypeTwo.css';

let timer;
let det;
let stage = null;

const ExerciseTypeTwo = ({ requiredReps, exercise }) => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [displayMedialements, setDisplayMedialements] = useState(true);
  const [reps, setReps] = useState(0);
  useEffect(() => {
    if (reps === requiredReps) {
      setDisplayMedialements(false);
      clearInterval(timer);
    }
  }, [reps, requiredReps]);
  // const model = poseDetection.SupportedModels.BlazePose;
  // const detectorConfig = {
  //   runtime: 'tfjs',
  //   modelType: 'lite',
  // };

  // async function initPoseDetection() {
  //   const poseDetector = await poseDetection.createDetector(
  //     model,
  //     detectorConfig
  //   );
  //   return poseDetector;
  // }
  const model = poseDetection.SupportedModels.MoveNet;
  const detectorConfig = {
    modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING,
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
    }, 700);
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
        // reps counter
        let exerciseInformation = setExerciseInformation(exercise);
        exerciseInformation.forEach((singleAngle) => {
          let pointOne = poses[0].keypoints[singleAngle.pointOne];
          let pointTwo = poses[0].keypoints[singleAngle.pointTwo];
          let pointThree = poses[0].keypoints[singleAngle.pointThree];
          let angle = measureAngle(pointOne, pointTwo, pointThree);
          console.log(angle);
          if (angle > 160) {
            stage = 'stretch';
          }
          if (stage === 'stretch' && angle < 40) {
            stage = 'bend';
            setReps((prevProps) => prevProps + 1);
          }
        });
      }
    } else {
      console.log('3. render else');
      return;
    }
  }
  const begin = () => {
    console.log('1. begin');
    start();
  };

  const stopSession = () => {
    // console.log('4.stop');
    setDisplayMedialements(false);
  };
  return (
    <div>
      {displayMedialements && (
        <div>
          <Webcam
            width='640px'
            height='480px'
            id='webcam'
            ref={webcamRef}
            style={{
              position: 'absolute',
              left: 120,
              top: 100,
              padding: '0px',
            }}
          />
          <canvas
            ref={canvasRef}
            id='my-canvas'
            width='640px'
            height='480px'
            style={{
              position: 'absolute',
              left: 120,
              top: 100,
              zIndex: 1,
            }}
          />
        </div>
      )}

      <div>
        <h1>Reps: {reps}</h1>
        <button onClick={() => begin()}>Start</button>
        <button onClick={() => stopSession()}>Stop</button>
      </div>
    </div>
  );
};

export default ExerciseTypeTwo;
