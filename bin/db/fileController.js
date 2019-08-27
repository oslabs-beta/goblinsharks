const fs = require('fs').promises;
const path = require('path')
const jsonData = require("./data.json")

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
}


module.exports = {
  createFile,
  appendFile
}
