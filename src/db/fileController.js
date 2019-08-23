const fs = require('fs').promises;
const path = require('path')

 async function createFile(filename) {

    try {
      const fileStatus = await fs.open(__dirname + '/data.json','r')
      console.log('file already exists')
    }
    catch {
      await fs.writeFile(__dirname + '/data.json',JSON.stringify({}))
      console.log('the file was saved')
    }
    
}
// createFile('data.json')

async function appendFile(queryKey,resolverName,data){
  try{
    const data = await fs.readFile(path.join(__dirname,'data.json'))
    const jsonData = (JSON.parse(data))
    if (!jsonData[queryKey]){
      jsonData[queryKey] = {
        [resolverName] : {
          speed:0,
          frequency:0,
          time:0
        }
      }
       fs.writeFile(path.join(__dirname,'data.json'),JSON.stringify(jsonData))
    } else {
      jsonData[queryKey][resolverName].speed ++
      jsonData[queryKey][resolverName].frequency ++
      fs.writeFile(path.join(__dirname,'data.json'),JSON.stringify(jsonData))
    }
  } catch {
    console.log('unable to append')
  }
 
}



// createFile('data.json')


module.exports = {
  createFile,
  appendFile
}
