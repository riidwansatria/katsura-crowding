import React, { useState, useEffect } from "react";

import { Chart } from 'react-chartjs-2';
import { Chart as ChartJS, BarController, BarElement, LinearScale, Title, CategoryScale } from 'chart.js';
import myJson from '../data/historical-trend-data/December-Tue.json';

ChartJS.register(BarController, BarElement, LinearScale, CategoryScale, Title);

function App() {
	const [vdata, setData] = useState({
		time: "",
		count: 0,
	});

	// Using useEffect for single rendering
	useEffect(() => {
		fetch("http://127.0.0.1:5000/api")
    .then(res =>res.json())
    .then(vdata => {
				setData({
					time: vdata.time,
					count: vdata.count
				});
			});
	}, []);

  const liveData = JSON.parse(JSON.stringify(myJson));

  var objIndex = liveData.findIndex((obj => obj.time == "13:45:00"));

  liveData[objIndex].count = vdata.count

  var labels = myJson.map(function(e) {
    return e.time;
  });
  var data = myJson.map(function(e) {
    return e.count;
  });
  var dataLive = liveData.map(function(e) {
    return e.count;
  });

  const configdata = {
    labels: labels,
    datasets: [{
      label: 'Historical Trend',
      data: data,
      backgroundColor: [
        '#00000066'
      ],
      xAxisID: "bar-x-axis1",
    },  {
      label: 'Live Data',
      data: dataLive,
      backgroundColor: [
        '#FF000066'
      ],
      xAxisID: "bar-x-axis2",
    }
  ]
  };

  var options = {
    scales: {
      x: [{
        stacked: false,
        id: "bar-x-axis1",
        barThickness: 10,
        display: false,
      }, {
        display: false,
        stacked: false,
        id: "bar-x-axis2",
        barThickness: 10,
        // these are needed because the bar controller defaults set only the first x axis properties
        type: 'category',
        categoryPercentage: 0.8,
        barPercentage: 0.9,
        gridLines: {
          offsetGridLines: true
        },
        offset: true,
      }],
      y: {
        display: false,
     }

    }
  };


	return (
		<div className="App">
      <div>
        <Chart 
          type='bar'
          data={configdata}
          options={options}
        />
      </div>
		</div>
	);
}






export default App