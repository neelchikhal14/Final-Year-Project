import * as posenet from '@tensorflow-models/posenet';

const color = 'aqua';
const dangerColor = '';
const detectionColor = '';
const successColor = '';

const lineWidth = 2;

export function drawPoint(ctx, y, x, r, color) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
}

export function drawSegment([ay, ax], [by, bx], color, ctx) {
  ctx.beginPath();
  ctx.moveTo(ax, ay);
  ctx.lineTo(bx, by);
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = color;
  ctx.stroke();
}

function objectToArray(position) {
  return [position.x, position.y];
}

// export function drawSkeleton(keypoints, minConfidence, ctx, scale = 1) {
//   // key;
//   const adjacentKeyPoints = [];

//   adjacentKeyPoints.forEach((keypoints) => {
//     drawSegment(
//       objectToArray(keypoints[0].position),
//       objectToArray(keypoints[1].position),
//       color,
//       scale,
//       ctx
//     );
//   });
// }

const posenetSkeletonLookup = [
  [0, 1],
  [0, 2],
  [0, 5],
  [0, 6],
  [1, 3],
  [2, 4],
  [5, 6],
  [5, 7],
  [5, 11],
  [6, 8],
  [6, 12],
  [7, 9],
  [8, 10],
  [11, 12],
  [11, 13],
  [12, 14],
  [13, 15],
  [14, 16],
];
function drawSkeleton(poses, ctx, color) {
  console.log('poses', poses);
  // if (poses.score > 0.5) {
  //   // Loop through all the skeletons detected
  //   for (let i = 0; i < poses.length; i += 1) {
  //     // For every skeleton, loop through all body connections
  //     for (let j = 0; j < poses[i].skeleton.length; j += 1) {
  //       let partA = poses[i].skeleton[j][0];
  //       let partB = poses[i].skeleton[j][1];
  //       ctx.beginPath();
  //       ctx.moveTo(partA.position.x, partA.position.y);
  //       ctx.lineTo(partB.position.x, partB.position.y);
  //       ctx.strokeStyle = color;
  //       ctx.stroke();
  //     }
  //   }
  // }
  if (poses.score >= 0.5) {
    posenetSkeletonLookup.forEach((item) => {
      const startPoints = poses.keypoints[item[0]];
      const endPoints = poses.keypoints[item[1]];
      ctx.beginPath();
      ctx.moveTo(startPoints.position.x, startPoints.position.y);
      ctx.lineTo(endPoints.position.x, endPoints.position.y);
      ctx.strokeStyle = color;
      ctx.stroke();
    });
  }
}

export function drawKeypoints(keypoints, ctx) {
  keypoints.forEach((keypoint) => {
    if (keypoint.score >= 0.5) {
      drawPoint(ctx, keypoint.position.y, keypoint.position.x, 5, color);
    }
  });
}

export const drawCanvas = (poses, video, videoWidth, videoHeight, canvas) => {
  const ctx = canvas.current.getContext('2d');
  canvas.current.width = videoWidth;
  canvas.current.height = videoHeight;
  // drawPoint(ctx, poses.nose.y, poses.nose.x, 5, color);
  drawKeypoints(poses.keypoints, ctx);
  drawSkeleton(poses, ctx, color);
};
