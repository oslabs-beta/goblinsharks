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
  resolversData: ResolversData
}

type OverviewData = {
  summary: Object,
  requests: Object,
  response: Object,
  resolvers: Object
}

type ResolversData = {
  invocationCounts: Object,
  executionTimes: Object,
  averageTime: Number
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
  // Render the summary statistics according to the following.
  return (
    <div id="overview-summary" className="overview-content">
      <div id="overview-summary-title" className="content-title overview-content-whitebg">
        <b>Summary</b>
      </div>

      <div id="overview-summary-statistics-wrapper" className="overview-content-whitebg">

        <div key={"overview-summary-statistics-totalrequests"}
            className="overview-summary-statistic-statval">
          <div className="overview-summary-statistic-stat">Total Requests</div>
          <div className="overview-summary-statistic-val">{props.summary.numTotalRequests}</div>
        </div>

        <div key={"overview-summary-statistics-averageresolutiontime"}
            className="overview-summary-statistic-statval">
          <div className="overview-summary-statistic-stat">Average Response Time (ms)</div>
          <div className="overview-summary-statistic-val">{props.averageTime.toFixed(2)}</div>
        </div>


      </div>
    </div>
  )
}
  
/**
 * Overview-Requests functional component.
 * 
 * @param props 
 */
function OverviewRequests(props: any) {
  // Chart.js data.
  const chartData = {
    labels: props.requests.times.slice(-100),
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
        data: props.requests.rpm.slice(-100)
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
  const chartData = {
    labels: props.resolvers['times'].slice(-100),
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
        data: props.resolvers["aveSpeed"].slice(-100)
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
        <b>Response Time 90 (ms)</b> this session:
      </div>
      <div id="overview-resolvers-chart-wrapper" className="chart-wrapper overview-content-whitebg">
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
      <OverviewSummary summary={props.overviewData.summary} averageTime={props.resolversData.averageTime}/>
      <OverviewRequests requests={props.overviewData.requests} />
      <OverviewResponse resolvers={props.overviewData.resolvers} />
      <OverviewErrors />
    </div>
  )
}

// Export.
export default Overview;
