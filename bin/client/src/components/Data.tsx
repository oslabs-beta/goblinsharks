// src/components/Data.tsx

// TS types.
type RequestObject = {
  speed: number,
  time: number,
  frequency: number,
  id: string
}

// Output object.
const testingData = {
  Query:{ state: [] }
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
    resolvers: getOverviewResolversData(data)
  };

  // Gets summary data from 'data'.
  function getOverviewSummaryData (data: object) {
    // Init data to return.
    const rtnObj = {
      'numTotalRequests': 0
    };

    // Count total requests.
    for (var entrypoint in data['Query']) {  
      rtnObj.numTotalRequests += data['Query'][entrypoint].length;
    }

    // Return the data.
    return rtnObj;
  }
  
  /**
   * Gets Requests data from 'data'.
   * @params
   * @todo: account for empty bins.
   */
  function getOverviewRequestsData (data: object) {
    // Init data to return.
    const rtnObj = {
      'times': [''],
      'rpm': [null],
      'ave': 0,
      'count': 0
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
      'ave': 0.0,
      'count': 0
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
        
        // Set the average.
        rtnObj['count']++;
        rtnObj['ave'] = ( rtnObj['ave'] * (rtnObj['count']-1) / rtnObj['count'] )
                        + ( request.speed / rtnObj['count'] );
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

  // Execution Times data.
  function getOverviewResolversData(data: object) {
    // Init an object to hold our analysis.
    const rtnObj = {
      'times': [''],
      'aveSpeed': [null]
    };

    const tempData = { "speed": {} , "counts": {} };
    // Init a recursive funtion to count nested resolvers.
    const recurseSpeed = (key: any, element: any) => {
      if (Array.isArray(element)) {
        
        element.forEach(request => {
          let bin = Number(Math.floor((request.time - minTS)/1000)*1000 + minTS);
          tempData["counts"][bin] = bin in tempData["counts"] ? tempData["counts"][bin] + 1 : 1;
          tempData["speed"][bin] = bin in tempData["speed"] ? 
                                 ((tempData["counts"][bin] - 1) * tempData["speed"][bin] / tempData["counts"][bin])
                                 + (request.speed / tempData["counts"][bin]) : request.speed;
        });

      } else for (let el in element) recurseSpeed(key + ":" + el, element[el]);
    }

    // Iterate through top level Resolvers.
    for (let key in data) if (key !== "Query") recurseSpeed(key, data[key]);

    // Cast the counts obj to array and sort.
    const tempDataAsSortedArray = Object.keys(tempData["speed"])
                                        .map(key => [Number(key), tempData['speed'][key]])
                                        .sort((a, b)=> a[0] - b[0]);
    
    rtnObj["times"] = tempDataAsSortedArray.map(el => new Date(el[0]).toTimeString().split(' ')[0]);
    rtnObj["aveSpeed"] = tempDataAsSortedArray.map(el => el[1]);
  
    // Return
    return rtnObj;
  }

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
    executionTimes: getExecutionTimesData(data),
    averageTime: 0.0,
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
        rtnObj[key]={
          ave: speedArr.reduce((a,c) => a+c) / speedArr.length,
          count: speedArr.length,
        };
      } else for (let el in element) recurseSpeed(key + ":" + el, element[el]);
    }

    // Iterate through top level Resolvers.
    for (let key in data) if (key !== "Query") recurseSpeed(key, data[key]);

    // Return
    return rtnObj;
  }


  // Get Average Times data.
  let sumAve = 0.0;
  let count = 0;

  for (let key in returnData.executionTimes) {
    count += returnData.executionTimes[key]['count']
    sumAve += returnData.executionTimes[key]['ave'] * returnData.executionTimes[key]['count'];
  }

  returnData['averageTime'] = sumAve / count;

  // Return.
  return returnData;
}

// Export.
export { processedData, getOverviewData, getResolversData };
