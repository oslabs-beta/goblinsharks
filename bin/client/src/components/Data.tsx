// src/components/Data.tsx

// Import the data.

let data = {
  "Query": {
    "state": [
      {
        "speed": 0.5189,
        "frequency": 1,
        "time": 1566953230035,
        "id": "12n6jzujhuc3"
      },
      {
        "speed": 0.0259,
        "frequency": 1,
        "time": 1566953254543,
        "id": "12n6jzujid8v"
      },
      {
        "speed": 0.6509,
        "frequency": 1,
        "time": 1566964058218,
        "id": "13e7jzupxxey"
      },
      {
        "speed": 0.0219,
        "frequency": 1,
        "time": 1566964079516,
        "id": "13e7jzupyduk"
      },
      {
        "speed": 0.7992,
        "frequency": 1,
        "time": 1567016902089,
        "id": "164hjzvlek09"
      },
      {
        "speed": 0.5589,
        "frequency": 1,
        "time": 1567024897327,
        "id": "174vjzvq5x67"
      },
      {
        "speed": 0.5087,
        "frequency": 1,
        "time": 1567025071212,
        "id": "17e2jzvq9ncc"
      }
    ]
  },
  "State": {
    "name": [
      {
        "speed": 101.998,
        "frequency": 1,
        "time": 1566953230137,
        "id": "12n6jzujhuc3"
      },
      {
        "speed": 113.1981,
        "frequency": 1,
        "time": 1566953254657,
        "id": "12n6jzujid8v"
      },
      {
        "speed": 131.8722,
        "frequency": 1,
        "time": 1566964058351,
        "id": "13e7jzupxxey"
      },
      {
        "speed": 90.4416,
        "frequency": 1,
        "time": 1566964079607,
        "id": "13e7jzupyduk"
      },
      {
        "speed": 172.7091,
        "frequency": 1,
        "time": 1567016902263,
        "id": "164hjzvlek09"
      },
      {
        "speed": 85.7238,
        "frequency": 1,
        "time": 1567024897414,
        "id": "174vjzvq5x67"
      },
      {
        "speed": 81.3556,
        "frequency": 1,
        "time": 1567025071294,
        "id": "17e2jzvq9ncc"
      }
    ]
  }
}
// async function getData(){
//   await fetch('./db/data.json')
//   .then((data)=>data.json())
//   .then((res)=>{
//     data = JSON.parse(res);
//   })
//   .catch(e => console.log('error fetching data', e))
// }

// data = JSON.parse(data)
// Types.
type RequestObject = {
  speed: number,
  time: number,
  frequency: number 
}

// Output object.
const testingData = {
  Query:{state:[]}
}
const processedData = {
  overview: getOverviewData(testingData),
  resolvers: getResolversData(testingData),
};

/**
 * For Preparing Overview data.
 * @param data 
 */
function getOverviewData (data: object) {
  // Init data to return.
  let minTS = Infinity;
  let maxTS = -Infinity;

  // Gets min and max TS.
  for (var entrypoint in data['Query']) {  
    data['Query'][entrypoint].forEach((request: RequestObject) => {
      minTS = request.time < minTS ? request.time : minTS;
      maxTS = request.time > maxTS ? request.time : maxTS;
    }
  )};

  // Init object of processed data to return.
  const returnData = {
    summary: getOverviewSummaryData(data),
    requests: getOverviewRequestsData(data),
    response: getOverviewResponseData(data),
  };

  // Gets summary data from 'data'.
  function getOverviewSummaryData (data: object) {
    // Init data to return.
    const rtnObj = {
      'numTotalRequests': 0,
    };

    // Count total requests.
    for (var entrypoint in data['Query']) {  
      rtnObj.numTotalRequests += data['Query'][entrypoint].length;
    }

    // Return the data.
    return rtnObj;
  }
  
  // Gets Requests data from 'data'.
  function getOverviewRequestsData (data: object) {
    // Init data to return.
    const rtnObj = {
      'times': [''],
      'rpm': [null],
    };

    // Counts total requests.
    const tempData = { "count": {} };
    for (var entrypoint in data['Query']) {
      data['Query'][entrypoint].forEach((request: RequestObject) => {
        // Get the bin of the data.
        let bin = Number(Math.floor((request.time - minTS)/1000)*1000 + minTS);
        tempData["count"][bin] = bin in tempData["count"] ? tempData["count"][bin] + 1 : 1;
      })
    }
    console.log('line 714: ', Object.keys(tempData["count"]).map(key => [Number(key), tempData['count'][key]]));
    // Cast the counts obj to array and sort.
    const tempDataAsSortedArray = Object.keys(tempData["count"])
                                        .map(key => [Number(key), tempData['count'][key]])
                                        .sort((a, b)=> a[0] - b[0]);
    
    rtnObj["times"] = tempDataAsSortedArray.map(el => new Date(el[0]).toTimeString().split(' ')[0]);
    rtnObj["rpm"] = tempDataAsSortedArray.map(el => el[1]);

    return rtnObj;
  };

  // Gets Response data from 'data'.
  function getOverviewResponseData (data: object) {
    // Init data to return.
    const rtnObj = {
      'times': [''],
      '90': [null],
    };

    // Counts total requests.
    const tempData = { "speed": {} , "counts": {} };
    for (var entrypoint in data['Query']) {
      data['Query'][entrypoint].forEach((request: RequestObject) => {
        // Bin the results.
        let bin = Number(Math.floor((request.time - minTS)/1000)*1000 + minTS);
        tempData["counts"][bin] = bin in tempData["counts"] ? tempData["counts"][bin] + 1 : 1;
        tempData["speed"][bin] = bin in tempData["speed"] ? 
          ((tempData["counts"][bin] - 1) * tempData["speed"][bin] / tempData["counts"][bin])
          + (request.speed / tempData["counts"][bin]) : request.speed;
      })
    }
 
    // Cast the counts obj to array and sort.
    const tempDataAsSortedArray = Object.keys(tempData["speed"])
                                        .map(key => [Number(key), tempData['speed'][key]])
                                        .sort((a, b)=> a[0] - b[0]);
    
    rtnObj["times"] = tempDataAsSortedArray.map(el => new Date(el[0]).toTimeString().split(' ')[0]);
    rtnObj["90"] = tempDataAsSortedArray.map(el => el[1]);

    return rtnObj;
  };

  // Return.
  return returnData;
}

/**
 * For Preparing Resolvers data.
 * @param data 
 */
function getResolversData(data: object) {
  const returnData = {
    invocationCounts: getInvocationCountsData(data),
    executionTimes: getExecutionTimesData(data)
  };

  // Invocation Counts data.
  function getInvocationCountsData(data: object) {
    // Init an object to hold our analysis.
    const rtnObj = {};

    // Init a recursive funtion to count nested resolvers.
    const recurseCount = (key: any, element: any) => {
      if (Array.isArray(element)) rtnObj[key] = element.length;
      else for (let el in element) recurseCount(key + ":" + el, element[el]);
    }

    // Fill out the top level Resolvers.
    for (let key in data) if (key !== "Query") recurseCount(key, data[key]);

    // Return
    return rtnObj;
  }

  // Execution Times data.
  function getExecutionTimesData(data: object) {
    // Init an object to hold our analysis.
    const rtnObj = {};

    // Init a recursive funtion to count nested resolvers.
    const recurseSpeed = (key: any, element: any) => {
      if (Array.isArray(element)) {
        let speedArr = element.map(request => request["speed"]);
        rtnObj[key] = speedArr.reduce((a,c) => a+c) / speedArr.length;
      } else for (let el in element) recurseSpeed(key + ":" + el, element[el]);
    }

    // Iterate through top level Resolvers.
    for (let key in data) if (key !== "Query") recurseSpeed(key, data[key]);

    // Return
    return rtnObj;
  }

  // Return.
  return returnData;
}

console.log('data tsx line 825: ', processedData);
// Export.
export { processedData, getOverviewData, getResolversData };
