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
// function drawSkeleton(poses, ctx, color) {
//   skeletonLookup.forEach((item) => {
//     const startPoints = poses[0].keypoints[item[0]];
//     const endPoints = poses[0].keypoints[item[1]];
//     ctx.beginPath();
//     ctx.moveTo(startPoints.x, startPoints.y);
//     ctx.lineTo(endPoints.x, endPoints.y);
//     ctx.strokeStyle = color;
//     ctx.stroke();
//   });
// }

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
};

// export const measureAngle = (pointOne, pointTwo, pointThree) => {
//   let p1x = pointOne.x;
//   let p1y = pointOne.y;
//   let p2x = pointTwo.x;
//   let p2y = pointTwo.y;
//   let p3x = pointThree.x;
//   let p3y = pointThree.y;

//   let num = p2y * (p1x - p3x) + p1y * (p3x - p2x) + p3y * (p2x - p1x);
//   let den = (p2x - p1x) * (p1x - p3x) + (p2y - p1y) * (p1y - p3y);

//   let ratio = num / den;

//   let angleRad = Math.atan(ratio) * 180;

//   let angleDeg = angleRad / Math.PI;

//   if (angleDeg > 180) {
//     angleDeg = 360 - angleDeg;
//   } else if (angleDeg < 0) {
//     angleDeg = 180 + angleDeg;
//   }

//   return angleDeg;
// };

export const rightTreePose = [
  {
    pointOne: 24,
    pointTwo: 26,
    pointThree: 28,
    name: 'right_leg',
  },
  {
    pointOne: 12,
    pointTwo: 24,
    pointThree: 26,
    name: 'right_mid_body',
  },
  {
    pointOne: 11,
    pointTwo: 22,
    pointThree: 25,
    name: 'left_mid_body',
  },
  {
    pointOne: 12,
    pointTwo: 24,
    pointThree: 16,
    name: 'right_hand',
  },
  {
    pointOne: 11,
    pointTwo: 13,
    pointThree: 15,
    name: 'left_hand',
  },
];

export const boatPoseRight = [
  {
    pointOne: 24,
    pointTwo: 26,
    pointThree: 28,
    name: 'right_leg',
  },
  {
    pointOne: 12,
    pointTwo: 24,
    pointThree: 26,
    name: 'right_knee_hip_shoulder',
  },
];

// export const right_prone_knee_flexon = [
//   {
//     pointOne: 24,
//     pointTwo: 26,
//     pointThree: 28,
//     name: 'right_leg',
//   },
//   {
//     pointOne: 12,
//     pointTwo: 24,
//     pointThree: 26,
//     name: 'right_knee_hip_shoulder',
//   },
// ];
export const right_prone_knee_flexon = [
  {
    pointOne: 11,
    pointTwo: 13,
    pointThree: 15,
    name: 'left_hand',
  },
];

export const right_squats = [
  {
    pointOne: 24,
    pointTwo: 26,
    pointThree: 28,
    name: 'right_leg',
  },
];

export const downdog = [
  {
    pointOne: 24,
    pointTwo: 26,
    pointThree: 28,
    name: 'right_leg',
  },
  {
    pointOne: 12,
    pointTwo: 24,
    pointThree: 26,
    name: 'right_knee_hip_shoulder',
  },
  {
    pointOne: 12,
    pointTwo: 14,
    pointThree: 16,
    name: 'right_hand',
  },
];

export const setExerciseInformation = (exercise) => {
  if (exercise === 'rightTreePose') {
    return rightTreePose;
  } else if (exercise === 'boatPoseRight') {
    return boatPoseRight;
  } else if (exercise === 'right_prone_knee_flexon') {
    return right_prone_knee_flexon;
  } else if (exercise === 'right_squats') {
    return right_squats;
  } else if (exercise === 'downdog') {
    return downdog;
  }
};

export const getExerciseStats = (poses, exercise) => {
  let statsArray = [];
  let exerciseInformation = setExerciseInformation(exercise);
  // console.log(exercise);
  // console.log(poses);
  // console.log(exerciseInformation);
  exerciseInformation.forEach((singleAngle) => {
    let pointOne = poses[0].keypoints[singleAngle.pointOne];
    let pointTwo = poses[0].keypoints[singleAngle.pointTwo];
    let pointThree = poses[0].keypoints[singleAngle.pointThree];
    let angle = calculateAngle(pointOne, pointTwo, pointThree);
    let name = singleAngle.name;
    statsArray.push({ bodyPart: name, angle });
  });
  return statsArray;
};

export const calculateStatistics = (statsArray) => {
  // console.log(statsArray);
  const unique = [...new Set(statsArray.map((item) => item.bodyPart))];
  let sessionStats = [];
  // console.log(unique);
  unique.forEach((uniqueMeasurement) => {
    const tempData = statsArray.filter(
      (stat) => uniqueMeasurement === stat.bodyPart
    );
    let angleArray = [];
    tempData.forEach((data) => {
      angleArray.push(data.angle);
    });
    const averageAngle =
      angleArray.reduce((acc, curr) => acc + curr, 0) / angleArray.length;
    sessionStats.push({ name: uniqueMeasurement, avgAngle: averageAngle });
  });
  return sessionStats;
};

export const normaliseExerciseStats = (statsArray) => {
  const unique = [...new Set(statsArray.map((item) => item.bodyPart))].length;
  const endSpliceIndex = 100 * unique;
  statsArray.splice(0, endSpliceIndex);
};

export const calculateAngle = (pointOne, pointTwo, pointThree) => {
  let p1x = pointOne.x;
  let p1y = pointOne.y;
  let p2x = pointTwo.x;
  let p2y = pointTwo.y;
  let p3x = pointThree.x;
  let p3y = pointThree.y;

  let angleRad =
    Math.atan2(p3y - p2y, p3x - p2x) - Math.atan2(p1y - p2y, p1x - p2x);
  // console.log(angleRad);
  let angleDeg = (angleRad * 180) / Math.PI;
  // console.log(angleDeg);
  if (angleDeg < 0) {
    angleDeg = 360 + angleDeg;
  }
  return angleDeg;
};
