import React, { useRef, useState } from 'react';
import '@tensorflow/tfjs-core';
import Webcam from 'react-webcam';
import '@tensorflow/tfjs-backend-webgl';
import * as poseDetection from '@tensorflow-models/pose-detection';
import { drawCanvas } from './utlities/utilities';
// import '@mediapipe/pose';
import './Exercise.css';

let timer;
let det;
let stats = [];

const Exercise = ({ setReady }) => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [startSession, setStartSession] = useState(true);

  const model = poseDetection.SupportedModels.BlazePose;
  const detectorConfig = {
    runtime: 'tfjs',
    modelType: 'lite',
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

    det = await initPoseDetection();
    setReady(true);
    timer = setInterval(() => {
      render(det);
    }, 100);
  }
  async function render(det) {
    if (
      typeof webcamRef.current !== 'undefined' &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4 &&
      startSession === true
    ) {
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

      if (canvasRef.current != null) {
        drawCanvas(poses, videoWidth, videoHeight, canvasRef);
        stats = [...stats, poses[0].keypoints];
      }
    } else {
      return;
    }
  }

  const begin = () => {
    start();
  };

  const stopSession = () => {
    console.log(stats);
    setStartSession(false);
    clearInterval(timer);
  };
  return (
    <div>
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
      <div>
        <button onClick={() => begin()}>Start</button>
        <button onClick={() => stopSession()}>Stop</button>
      </div>
    </div>
  );
};

export default Exercise;
