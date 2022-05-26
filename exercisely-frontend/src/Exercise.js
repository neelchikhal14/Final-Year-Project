import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import '@tensorflow/tfjs-backend-webgl';
import * as poseDetection from '@tensorflow-models/pose-detection';
import { drawCanvas } from './utlities/utilities';
import '@mediapipe/pose';
import './Exercise.css';
const Exercise = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [keypoints, setKeypoints] = useState([]);
  const model = poseDetection.SupportedModels.BlazePose;
  const detectorConfig = {
    runtime: 'tfjs',
    enableSmoothing: true,
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

    const det = await initPoseDetection();

    async function render() {
      if (
        typeof webcamRef.current !== 'undefined' &&
        webcamRef.current !== null &&
        webcamRef.current.video.readyState === 4
      ) {
        // Get Video Properties
        const video = webcamRef.current.video;
        const videoWidth = webcamRef.current.video.videoWidth;
        const videoHeight = webcamRef.current.video.videoHeight;

        // Set video width
        webcamRef.current.video.width = videoWidth;
        webcamRef.current.video.height = videoHeight;

        // Make Detections
        const estimationConfig = { flipHorizontal: true };
        // const timestamp = performance.now();
        const poses = await det.estimatePoses(video, estimationConfig);
        console.log('actual', poses);

        drawCanvas(poses, video, videoWidth, videoHeight, canvasRef);

        //perform functionality !!!
      }

      requestAnimationFrame(render);
    }

    render();
  }

  start();
  return (
    <div>
      <Webcam id='theWebcam' ref={webcamRef} />
      <canvas id='theCanvas' ref={canvasRef} />
    </div>
  );
};

export default Exercise;
