const fs = require('fs').promises;
const path = require('path');
const jsonData = require("./data.json");
const errData = require('./err.json');

async function createFile(filename) {
    try { // if file does not exist. 
      const fileStatus = await fs.open(__dirname + '/data.json','r')
    }
    catch { // creates file. 
      await fs.writeFile(__dirname + '/data.json',JSON.stringify({}))
    }
}

async function appendFile(queryKey,resolverName,speed,id){
  try{
    if (!jsonData[queryKey]){ // checking if the query type is defined - - 
      jsonData[queryKey]= {};
    }
    if (!jsonData[queryKey][resolverName]){ // checking if the particular resolver has been defined. 
      jsonData[queryKey][resolverName] = [];
    } 
      jsonData[queryKey][resolverName].push({ // each resolver execution is logged with this object - 
        speed: speed,
        frequency: 1,
        time: Date.now(),
        id: id
      })
    fs.writeFile(path.join(__dirname,'data.json'), JSON.stringify(jsonData,null,2)) // write new data to json
  } catch {
    console.log('unable to append')
  }
};

async function trackError (err, time) {
  try{
    const { extensions, message } = err; // declaring path separately to avoid overwriting path module
    const resolverPath = err.path 
    const errObj = {
      message,
      path : resolverPath,
      time,
      stacktrace: extensions.exception.stacktrace
    }
    if (!errData.errors) {
      errData.errors = [];
    }
    errData.errors.push(errObj)
    console.log(errData)
    console.log('dirname inside of filecontroller', __dirname);
    await fs.writeFile(path.join(__dirname,'err.json'), JSON.stringify(errData,null,2))
    // await fs.writeFile(path.join(__dirname,'errors.json'), JSON.stringify({},null,2))
  } catch(e) {
    console.log(e)
    console.log('unable to track errors')
  }
  // console.log(err);

};


module.exports = {
  createFile,
  appendFile,
  trackError
}
