const skeletonLookup = [
  [0, 1],
  [0, 4],
  [1, 2],
  [2, 3],
  [3, 7],
  [4, 5],
  [5, 6],
  [6, 8],
  [9, 10],
  [11, 12],
  [11, 13],
  [11, 23],
  [12, 14],
  [12, 24],
  [13, 15],
  [14, 16],
  [15, 21],
  [15, 17],
  [15, 19],
  [16, 22],
  [16, 18],
  [16, 20],
  [17, 19],
  [18, 20],
  [23, 24],
  [23, 25],
  [24, 26],
  [25, 27],
  [26, 28],
  [27, 29],
  [27, 31],
  [28, 30],
  [28, 32],
  [29, 31],
  [30, 32],
];

function drawSkeleton(poses, ctx, color) {
  skeletonLookup.forEach((item) => {
    const startPoints = poses[0].keypoints[item[0]];
    const endPoints = poses[0].keypoints[item[1]];
    ctx.beginPath();
    ctx.moveTo(startPoints.x, startPoints.y);
    ctx.lineTo(endPoints.x, endPoints.y);
    ctx.strokeStyle = color;
    ctx.stroke();
  });
}

export const drawPoint = (ctx, y, x, r, color) => {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
};

export const drawKeypoints = (keypoints, ctx, color) => {
  keypoints.forEach((keypoint) => {
    if (keypoint.score >= 0.5) {
      drawPoint(ctx, keypoint.y, keypoint.x, 5, color);
    }
  });
};

export const drawCanvas = (poses, videoWidth, videoHeight, canvas, color) => {
  const ctx = canvas.current.getContext('2d');
  canvas.current.width = videoWidth;
  canvas.current.height = videoHeight;
  // drawPoint(ctx, poses.nose.y, poses.nose.x, 5, color);
  // console.log('drawCanvas', poses);
  drawKeypoints(poses[0].keypoints, ctx, color);
  drawSkeleton(poses, ctx, 'white');
  console.log(
    'Angle',
    measureAngle(
      poses[0].keypoints[12],
      poses[0].keypoints[14],
      poses[0].keypoints[16]
    )
  );
};

export const measureAngle = (pointOne, pointTwo, pointThree) => {
  let p1x = pointOne.x;
  let p1y = pointOne.y;
  let p2x = pointTwo.x;
  let p2y = pointTwo.y;
  let p3x = pointThree.x;
  let p3y = pointThree.y;

  let num = p2y * (p1x - p3x) + p1y * (p3x - p2x) + p3y * (p2x - p1x);
  let den = (p2x - p1x) * (p1x - p3x) + (p2y - p1y) * (p1y - p3y);

  let ratio = num / den;

  let angleRad = Math.atan(ratio) * 180;

  let angleDeg = angleRad / Math.PI;

  if (angleDeg < 0) {
    angleDeg = angleDeg + 180;
  }

  return angleDeg;
};
