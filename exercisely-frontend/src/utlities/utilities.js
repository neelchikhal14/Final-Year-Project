import {
  DOCTOR_CHECK_MEDICAL_RECORD_CLEAR,
  DOCTOR_CREATE_MEDICAL_RECORD_CLEAR,
  DOCTOR_DELETE_EXERCISE_CLEAR,
  DOCTOR_FETCH_PATIENT_CLEAR,
  DOCTOR_GET_EXERCISE_CLEAR,
  DOCTOR_GET_HISTORY_CLEAR,
  DOCTOR_GET_MULTIPLE_PATIENTS_CLEAR,
  DOCTOR_REGISTER_DETAILS_CLEAR,
  DOCTOR_RETRIEVE_MESSAGES_CLEAR,
  DOCTOR_SET_EXERCISE_CLEAR,
  DOCTOR_UPDATE_EXERCISE_CLEAR,
} from '../constants/doctorConstants.js';
import {
  PATIENT_EXERCISE_CLEAR,
  PATIENT_EXERCISE_STATS_CLEAR,
  PATIENT_REGISTER_BASIC_DETAILS_CLEAR,
  PATIENT_SELECTED_EXERCISE_CLEAR,
  PATIENT_SEND_MESSAGE_CLEAR,
  PATIENT_UPDATE_EXERCISE_STATS_CLEAR,
} from '../constants/patientConstants.js';
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

export const bodyPartsRef = [
  'right_hand',
  'left_hand',
  'right_mid_body',
  'left_mid_body',
  'right_leg',
  'left_leg',
  'left_hand_shoulder',
  'right_hand_shoulder',
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
    completeName: 'left_shoulder#left_elbow#left_wrist',
  },
];

export const right_squats = [
  {
    pointOne: 24,
    pointTwo: 26,
    pointThree: 28,
    name: 'right_leg',
    completeName: 'right_hip#right_knee#right_ankle',
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

  exercise.forEach((singleAngle) => {
    let pointOne = poses[0].keypoints[singleAngle.pointOne];
    let pointTwo = poses[0].keypoints[singleAngle.pointTwo];
    let pointThree = poses[0].keypoints[singleAngle.pointThree];
    let angle = calculateAngle(pointOne, pointTwo, pointThree);
    let name = singleAngle.bodyPartName;
    statsArray.push({ bodyPart: name, angle });
  });
  return statsArray;
};
export const setCurrentAngles = (poses, exercise) => {
  let angleObject = {};

  exercise.forEach((singleAngle) => {
    let pointOne = poses[0].keypoints[singleAngle.pointOne];
    let pointTwo = poses[0].keypoints[singleAngle.pointTwo];
    let pointThree = poses[0].keypoints[singleAngle.pointThree];
    let angle = calculateAngle(pointOne, pointTwo, pointThree);
    let name = singleAngle.bodyPartName;
    angleObject[name] = angle;
  });
  return angleObject;
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
    sessionStats.push({
      name: uniqueMeasurement,
      avgAngle: Math.ceil(averageAngle),
    });
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
  if (angleDeg > 180) {
    angleDeg = 360 - angleDeg;
  }
  return Math.ceil(angleDeg);
};

/**
 *  ? MAY REQUIRE IN FUTURE LOGIC TO COUNT REPS
 */

// const rightProneKneeFlexionRepCounter = (
//   poses,
//   selectedExercise,
//   stage,
//   setReps
// ) => {
//   let tempStats = [];
//   selectedExercise.bodyParams.forEach((singleAngle) => {
//     let pointOne = poses[0].keypoints[singleAngle.pointOne];
//     let pointTwo = poses[0].keypoints[singleAngle.pointTwo];
//     let pointThree = poses[0].keypoints[singleAngle.pointThree];
//     let angle = calculateAngle(pointOne, pointTwo, pointThree);
//     if (angle > 160) {
//       stage = 'stretch';
//     }
//     if (stage === 'stretch' && angle < 40) {
//       stage = 'bend';
//       setReps((prevProps) => prevProps + 1);
//     }

//     let name = singleAngle.bodyPartName;
//     tempStats.push({ bodyPart: name, angle });
//     return tempStats;
//   });
// };

// export const countReps = (poses, selectedExercise, stage, setReps) => {
//   let stats = [];
//   switch (selectedExercise.name) {
//     case 'Right Prone Knee Flexion':
//       stats = [
//         ...stats,
//         ...rightProneKneeFlexionRepCounter(
//           poses,
//           selectedExercise,
//           stage,
//           setReps
//         ),
//       ];
//       return stats;
//     default:
//       return stats;
//   }
// };

export const dataParamsForBarChart = (statsObj) => {
  const labels = [];
  const data = [];
  const bgColor = [];
  const bgBorderColor = [];
  const borderWidth = 2;
  const label = statsObj.exInfo.name;
  statsObj.exInfo.bodyParams.forEach((bpart) => {
    let name = bpart.bodyPartName.split('_').join(' ').toUpperCase();
    labels.push(name);
  });
  statsObj.sessionStats.forEach((st) => {
    let bodyPart = st.name;
    data.push(st.avgAngle);
    if (statsObj.reps !== 0) {
      if (st.avgAngle * 0.5 < statsObj.desiredValue[bodyPart]) {
        bgColor.push('#f28c82');
        bgBorderColor.push('#b7190a');
      } else {
        bgColor.push('#d1e7dd');
        bgBorderColor.push('#009400');
      }
    } else {
      bgColor.push('#98a1e9');
      bgBorderColor.push('#06116b');
    }
  });

  return {
    labels,
    datasets: [
      {
        label,
        data,
        backgroundColor: bgColor,
        borderColor: bgBorderColor,
        borderWidth,
      },
    ],
  };
};

export const generateStatistics = (completeExerciseDetails) => {
  let finalStats = [];

  completeExerciseDetails.forEach((singleExeInstance) => {
    let genStats = [];
    for (let singleExeDetail in singleExeInstance.desiredValue) {
      //   console.log('singleExeInstance', singleExeInstance);
      //   console.log(singleExeDetail);
      //   console.log(singleExeInstance.desiredValue[singleExeDetail]);
      const bodyPart = singleExeDetail;
      const setAngleValue = singleExeInstance.desiredValue[singleExeDetail];

      singleExeInstance['sessionStats'].forEach((singleStat) => {
        if (singleStat.name === bodyPart) {
          console.log(singleStat.name, bodyPart);
          const tenPercentUp = singleStat.avgAngle * 1.1;
          const tenPercentDown = singleStat.avgAngle * 0.9;
          const twentyPercentDown = singleStat.avgAngle * 0.8;
          const fiftyPercentDown = singleStat.avgAngle * 0.5;
          const fortyPercentDown = singleStat.avgAngle * 0.6;
          if (
            setAngleValue <= tenPercentUp &&
            setAngleValue >= tenPercentDown
          ) {
            // console.log(
            //   'first if',
            //   setAngleValue,
            //   tenPercentUp,
            //   tenPercentDown
            // );
            genStats.push(
              `${bodyPart
                .split('_')
                .join(' ')
                .toUpperCase()}'s angle is maintained correctly and within range`
            );
          } else if (setAngleValue <= twentyPercentDown) {
            // console.log('second if', setAngleValue, twentyPercentDown);
            genStats.push(
              `${bodyPart
                .split('_')
                .join(' ')
                .toUpperCase()}'s angle can be improved. Please increase the angle for ${bodyPart
                .split('_')
                .join(' ')
                .toUpperCase()}`
            );
          } else if (setAngleValue <= fiftyPercentDown) {
            // console.log('third if', setAngleValue, fiftyPercentDown);
            genStats.push(
              `${bodyPart
                .split('_')
                .join(' ')
                .toUpperCase()}'s angle can be poor. Please revisit the instructions for this exercise before continuing with next session`
            );
          } else if (setAngleValue <= fortyPercentDown) {
            // console.log('fourth if', setAngleValue, fortyPercentDown);
            genStats.push(
              `${bodyPart
                .split('_')
                .join(' ')
                .toUpperCase()}'s form is very poor. Please consult your doctor`
            );
          } else {
            genStats.push(
              `You have exceeded angle set for ${bodyPart
                .split('_')
                .join(' ')
                .toUpperCase()}. Please correct your form in next session`
            );
          }
        }
      });

      //   finalStats.push(genStats);
    }
    finalStats.push(genStats);
    // console.log(genStats);
    // console.log('##################');
  });
  return finalStats;
};
export const generateStatisticsOptimized = (completeExerciseDetails) => {
  let finalStats = [];

  completeExerciseDetails.forEach((singleExeInstance) => {
    let genStats = [];

    for (let keyOne in singleExeInstance.desiredValue) {
      singleExeInstance.sessionStats.forEach((singleStat) => {
        for (let sessionStatKey in singleStat) {
          let minusThreeSD = 0;
          let minusTwoSD = 0;
          let minusOneSD = 0;
          let plusThreeSD = 0;
          let plusTwoSD = 0;
          let plusOneSD = 0;

          if (keyOne === singleStat[sessionStatKey]) {
            minusThreeSD =
              singleExeInstance.desiredValue[keyOne] -
              3 * singleExeInstance.std[keyOne];

            minusTwoSD =
              singleExeInstance.desiredValue[keyOne] -
              2 * singleExeInstance.std[keyOne];

            minusOneSD =
              singleExeInstance.desiredValue[keyOne] -
              1 * singleExeInstance.std[keyOne];
            plusThreeSD =
              singleExeInstance.desiredValue[keyOne] +
              3 * singleExeInstance.std[keyOne];

            plusTwoSD =
              singleExeInstance.desiredValue[keyOne] +
              2 * singleExeInstance.std[keyOne];

            plusOneSD =
              singleExeInstance.desiredValue[keyOne] +
              1 * singleExeInstance.std[keyOne];
            console.log('Dersired Value', singleExeInstance.desiredValue);
            console.log('Mean', singleExeInstance.desiredValue[keyOne]);
            console.log(' - SD', minusThreeSD, minusTwoSD, minusOneSD);
            console.log(' + SD', plusThreeSD, plusTwoSD, plusOneSD);

            console.log(singleStat.avgAngle);
            if (singleStat.avgAngle <= minusThreeSD) {
              genStats.push(
                `${keyOne
                  .split('_')
                  .join(' ')
                  .toUpperCase()}'s angle is maintained poorly. Please increase the angle till ${
                  singleExeInstance.desiredValue[keyOne]
                } degrees.`
              );
              console.log('less equal than -3 SD');
            }
            if (
              singleStat.avgAngle > minusThreeSD &&
              singleStat.avgAngle <= minusTwoSD
            ) {
              genStats.push(
                `${keyOne
                  .split('_')
                  .join(' ')
                  .toUpperCase()}'s angle can be made better. Please increase the angle till ${
                  singleExeInstance.desiredValue[keyOne]
                } degrees.`
              );
              console.log('gt -3SD lte -2SD');
            }
            if (
              singleStat.avgAngle > minusTwoSD &&
              singleStat.avgAngle <= minusOneSD
            ) {
              genStats.push(
                `${keyOne
                  .split('_')
                  .join(' ')
                  .toUpperCase()}'s angle is good. Please increase the angle till ${
                  singleExeInstance.desiredValue[keyOne]
                } degrees.`
              );
              console.log('gt -2SD lte -1SD');
            }
            if (
              singleStat.avgAngle > minusOneSD &&
              singleStat.avgAngle <= plusOneSD
            ) {
              genStats.push(
                `${keyOne
                  .split('_')
                  .join(' ')
                  .toUpperCase()}'s angle is perfect and within range.`
              );
              console.log('gt -1SD lte +1SD');
            }
            if (
              singleStat.avgAngle > plusOneSD &&
              singleStat.avgAngle <= plusTwoSD
            ) {
              genStats.push(
                `${keyOne
                  .split('_')
                  .join(' ')
                  .toUpperCase()}'s angle is good. Please reduce the angle till ${
                  singleExeInstance.desiredValue[keyOne]
                } degrees.`
              );
              console.log('gt +1SD lte +2SD');
            }
            if (
              singleStat.avgAngle > plusTwoSD &&
              singleStat.avgAngle <= plusThreeSD
            ) {
              genStats.push(
                `${keyOne
                  .split('_')
                  .join(' ')
                  .toUpperCase()}'s angle can be made better. Please reduce the angle till ${
                  singleExeInstance.desiredValue[keyOne]
                } degrees.`
              );
              console.log('gt +2SD lte +3SD');
            }
            if (singleStat.avgAngle > plusThreeSD) {
              genStats.push(
                `${keyOne
                  .split('_')
                  .join(' ')
                  .toUpperCase()}'s angle is maintained poorly. Please reduce the angle till ${
                  singleExeInstance.desiredValue[keyOne]
                } degrees.`
              );
              console.log('gt + 3SD');
            } // end of if
          }
        }
      });
    }

    finalStats.push(genStats);
    // console.log(genStats);
    // console.log('##################');
  });
  return finalStats;
};

export const clearState = (pageInfo, dispatch) => {
  if (pageInfo === '/doctor-add-exercise') {
    dispatch({
      type: DOCTOR_SET_EXERCISE_CLEAR,
    });
    dispatch({
      type: DOCTOR_CHECK_MEDICAL_RECORD_CLEAR,
    });
    dispatch({
      type: DOCTOR_CREATE_MEDICAL_RECORD_CLEAR,
    });
    dispatch({
      type: DOCTOR_GET_MULTIPLE_PATIENTS_CLEAR,
    });
    dispatch({
      type: DOCTOR_FETCH_PATIENT_CLEAR,
    });
    dispatch({
      type: DOCTOR_GET_EXERCISE_CLEAR,
    });
  }
  if (pageInfo === '/doctor-update-patient-exercise') {
    dispatch({
      type: DOCTOR_GET_MULTIPLE_PATIENTS_CLEAR,
    });
    dispatch({
      type: DOCTOR_GET_EXERCISE_CLEAR,
    });
    dispatch({
      type: DOCTOR_FETCH_PATIENT_CLEAR,
    });
    dispatch({
      type: DOCTOR_UPDATE_EXERCISE_CLEAR,
    });
  }
  if (pageInfo === '/doctor-delete-patient-exercise') {
    dispatch({
      type: DOCTOR_GET_MULTIPLE_PATIENTS_CLEAR,
    });
    dispatch({
      type: DOCTOR_GET_EXERCISE_CLEAR,
    });
    dispatch({
      type: DOCTOR_FETCH_PATIENT_CLEAR,
    });
    dispatch({
      type: DOCTOR_DELETE_EXERCISE_CLEAR,
    });
  }
  if (pageInfo === '/doctor-read-patient-messages') {
    dispatch({
      type: DOCTOR_RETRIEVE_MESSAGES_CLEAR,
    });
  }
  if (pageInfo === '/doctor-check-patient-history') {
    dispatch({
      type: DOCTOR_GET_MULTIPLE_PATIENTS_CLEAR,
    });
    dispatch({
      type: DOCTOR_GET_HISTORY_CLEAR,
    });
    dispatch({
      type: PATIENT_EXERCISE_CLEAR,
    });
    dispatch({
      type: PATIENT_EXERCISE_STATS_CLEAR,
    });
  }
  if (pageInfo === '/doctor-add-personal-details') {
    dispatch({
      type: DOCTOR_REGISTER_DETAILS_CLEAR,
    });
  }
  if (
    pageInfo === '/patient/start-exercise-type-two' ||
    pageInfo === '/patient/start-exercise-type-one'
  ) {
    dispatch({
      type: PATIENT_UPDATE_EXERCISE_STATS_CLEAR,
    });
  }
  if (pageInfo === '/patient/add-details') {
    dispatch({
      type: PATIENT_REGISTER_BASIC_DETAILS_CLEAR,
    });
  }
  if (pageInfo === '/send-message') {
    dispatch({
      type: PATIENT_SEND_MESSAGE_CLEAR,
    });
  }
  if (pageInfo === '/patient/view-staticstics') {
    dispatch({
      type: PATIENT_EXERCISE_STATS_CLEAR,
    });
  }
  if (pageInfo === 'all') {
    dispatch({
      type: DOCTOR_CHECK_MEDICAL_RECORD_CLEAR,
    });
    dispatch({
      type: DOCTOR_CREATE_MEDICAL_RECORD_CLEAR,
    });
    dispatch({
      type: DOCTOR_DELETE_EXERCISE_CLEAR,
    });
    dispatch({
      type: DOCTOR_FETCH_PATIENT_CLEAR,
    });
    dispatch({
      type: DOCTOR_GET_EXERCISE_CLEAR,
    });
    dispatch({
      type: DOCTOR_GET_HISTORY_CLEAR,
    });
    dispatch({
      type: DOCTOR_GET_MULTIPLE_PATIENTS_CLEAR,
    });
    dispatch({
      type: DOCTOR_REGISTER_DETAILS_CLEAR,
    });
    dispatch({
      type: DOCTOR_RETRIEVE_MESSAGES_CLEAR,
    });
    dispatch({
      type: DOCTOR_SET_EXERCISE_CLEAR,
    });
    dispatch({
      type: DOCTOR_UPDATE_EXERCISE_CLEAR,
    });
    dispatch({
      type: PATIENT_EXERCISE_CLEAR,
    });
    dispatch({
      type: PATIENT_EXERCISE_STATS_CLEAR,
    });
    dispatch({
      type: PATIENT_REGISTER_BASIC_DETAILS_CLEAR,
    });
    dispatch({
      type: PATIENT_SEND_MESSAGE_CLEAR,
    });
    dispatch({
      type: DOCTOR_CHECK_MEDICAL_RECORD_CLEAR,
    });
    dispatch({
      type: PATIENT_UPDATE_EXERCISE_STATS_CLEAR,
    });
    dispatch({
      type: PATIENT_SELECTED_EXERCISE_CLEAR,
    });
    if (sessionStorage.key('expiresAt')) {
      sessionStorage.removeItem('expiresAt');
    }
  }
};
