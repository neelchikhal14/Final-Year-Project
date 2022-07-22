import React, { useEffect, useState } from 'react';
import { Chart as ChartJS } from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import { dataParamsForBarChart } from '../../utlities/utilities';

const BarChart = ({ singleExerciseInfo }) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    setData(dataParamsForBarChart(singleExerciseInfo));
  }, [singleExerciseInfo]);

  return (
    <div className='graph-section'>{data !== null && <Bar data={data} />}</div>
  );
};

export default BarChart;
