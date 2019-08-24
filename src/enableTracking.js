const now = require('performance-now')
const { appendFile } = require("./db/fileController")

module.exports = function enableTracking(resolversObject,queryField) {
  // takes resolvers object of key value pairs
  const newResolversObject = {}
  const fields = Object.keys(resolversObject);
  const resolverFunctions = Object.values(resolversObject);
  
  const updatedResolverFunctions = resolverFunctions.map((resolverFunc,index) => {
    const fieldName = fields[index];
    const currentResolver = async function(...args) { 
    const [parent, params, ctx, info] = args
    var t0 = now();
    const resolverReturnValue = await resolverFunc(...args)
    var t1 = now();
    let speed = parseFloat((t1-t0).toFixed(4));
    await appendFile(queryField,fieldName,speed);

    console.log('Took', (t1 - t0).toFixed(4), 'milliseconds to run the ', fieldName + ' resolver.');
    return resolverReturnValue
  }
    Object.defineProperty(currentResolver,'name', {value:fieldName,writable:true})
    return currentResolver
  })
  
  fields.forEach((field,index) => {
    newResolversObject[field] = updatedResolverFunctions[index]
  })
  return newResolversObject
  }
  