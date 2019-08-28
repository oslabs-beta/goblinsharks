// src/components/Overview.tsx

import * as React from 'react';
import { Line } from 'react-chartjs-2';
// let  = require("react-chartjs-2").Line;


import './Overview.css'

// Header Props TS typedef.
// type OverviewProps = {
//   modes: Array<string>,
//   updateMode: Function
// }

interface OverviewProps  {
  overviewData: OverviewData,
}

type OverviewData = {
  summary: Object,
  requests: Object,
  response: Object
}

// type OverviewSummaryProps = {
//   summary: OverviewSummaryData
// }

// type OverviewSummaryData = {
//   numRequests: number
// }


// type OverviewRequestsProps = {
//   requests: Object
// }


/**
 * Overview-Summary functional component.
 * @param props 
 */
function OverviewSummary(props: any) {
  // An array statistics.
  // console.log(props.summary);
  const summaryItems = ['Total Requests', 'Average Resolution Time'];

  // Map statistics to a list.
  const summaryItemsList = summaryItems.map((statistic: string) => {
    return (
      <div key={"overview-summary-statistics" + statistic.toLowerCase()}
           className="overview-summary-statistic-statval">
        <div className="overview-summary-statistic-stat">{statistic}</div>
        <div className="overview-summary-statistic-val">{props.summary.numTotalRequests}</div>
      </div>
    )
  });

  // Render the summary statistics according to the following.
  return (
    <div id="overview-summary" className="overview-content">
      <div id="overview-summary-title" className="content-title overview-content-whitebg">
        <b>Summary</b>
      </div>
      <div id="overview-summary-statistics-wrapper" className="overview-content-whitebg">{summaryItemsList}</div>
    </div>
  )
}
  
/**
 * Overview-Requests functional component.
 * 
 * @param props 
 */
function OverviewRequests(props: any) {
  console.log('overviewrequests props:', props);
  // Chart.js data.
  const chartData = {
    labels: props.requests.times,
    datasets: [
      {
        label: 'Requests Per Second',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        // borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        // borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: props.requests.rpm
      }
    ]
  };

  // Chart.js options.
  const chartOptions = {
    maintainAspectRatio: false,	
    legend: { display: false }
  }

  // Render the following:
  return (
    <div id="overview-requests" className="overview-content">
      <div id="overview-requests-title"
           className="content-title overview-content-whitebg">
        <b>Requests Per Second</b> this session:
      </div>
      <div id="overview-requests-chart-wrapper"
           className="chart-wrapper overview-content-whitebg">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  )
}

/**
 * Overview-Response functional component.
 * 
 * @param props 
 */
function OverviewResponse(props: any) {
  // Chart.js data.
  console.log('overviewresponse props:', props);
  const chartData = {
    labels: props.response.times,
    datasets: [
      {
        label: 'Response Time',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        // borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        // borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: props.response["90"]
      }
    ]
  };

  // Chart.js options.
  const chartOptions = {
    maintainAspectRatio: false,	
    legend: { display: false }
  }

  // Render the following:
  return (
    <div id="overview-response" className="overview-content">
      <div id="overview-response-title" className="content-title overview-content-whitebg">
        <b>Response Time (90th Percentile)</b> this session:
      </div>
      <div id="overview-response-chart-wrapper" className="chart-wrapper overview-content-whitebg">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  )
}

/**
 * Overview-Errors functional component.
 */
function OverviewErrors() {
  return (
    <div id="overview-errors"
         className="overview-content">
    </div>
  )
}

/**
 * Overview parent functional component.  Renders 'Summary', 'Requests',
 * 'Response', and 'Errors' containers.
 * 
 * @param props 
 */
function Overview(props: OverviewProps) {
  return (
    <div id="modeOverview">
      <OverviewSummary summary={props.overviewData.summary} />
      <OverviewRequests requests={props.overviewData.requests} />
      <OverviewResponse response={props.overviewData.response} />
      <OverviewErrors />
    </div>
  )
}

// Export.
export default Overview;
