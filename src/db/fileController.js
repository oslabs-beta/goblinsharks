const fs = require('fs').promises;
const path = require('path')
const jsonData = require("./data.json")

 async function createFile(filename) {
    try {
      const fileStatus = await fs.open(__dirname + '/data.json','r')
      // console.log('file already exists')
    }
    catch {
      await fs.writeFile(__dirname + '/data.json',JSON.stringify({}))
      // console.log('the file was saved')
    }
}
// createFile('data.json')`

async function appendFile(queryKey,resolverName,speed){
  try{
    if (!jsonData[queryKey]){
      jsonData[queryKey]= {};
    }
    if (!jsonData[queryKey][resolverName]){
      jsonData[queryKey][resolverName] = [];
    } 

      jsonData[queryKey][resolverName].push({
        speed: speed,
        frequency: 1,
        time: Date.now()
      })
    
    // console.log(jsonData)
    fs.writeFile(path.join(__dirname,'data.json'), JSON.stringify(jsonData))
    // const analyticsDataBuffer = await fs.readFile(path.join(__dirname,'data.json'))
  } catch {
    console.log('unable to append')
  }
}



// createFile('data.json')


module.exports = {
  createFile,
  appendFile
}
