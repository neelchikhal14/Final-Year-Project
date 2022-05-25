import React, { useRef } from 'react';
import Webcam from 'react-webcam';
import * as ml5 from 'ml5';
import * as p5 from 'p5';

import './App.css';
import { drawCanvas } from './utlities/utilities';
const App = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  let mready = false;
  let poseNet;
  function modelReady() {
    mready = true;
    console.log('model ready');
  }

  //detection functionality
  const detect = async () => {
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

      if (!mready) {
        poseNet = await ml5.poseNet(video, modelReady);
      }
      poseNet.on('pose', (poses) => {
        console.log(poses);
        if (poses.length > 0) {
          let pose;
          pose = poses[0].pose;
          drawCanvas(pose, video, videoWidth, videoHeight, canvasRef);
        }
      });
    }
  };

  const runPosenet = () => {
    setInterval(() => {
      detect();
    }, 5000);
  };

  runPosenet();
  return (
    <div>
      <Webcam id='theWebCam' ref={webcamRef} />
      <canvas id='theCanvas' ref={canvasRef} />
    </div>
  );
};

export default App;
