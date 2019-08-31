const now = require('performance-now')
const { appendFile } = require("../bin/db/fileController")
const uniqid = require('uniqid');

module.exports = function enableTracking(resolversObject,queryField) {
  // takes resolvers object of key value pairs - 
  // key refers to resolver name, value refers to resolver function definition
  const newResolversObject = {}
  const fields = Object.keys(resolversObject);
  const resolverFunctions = Object.values(resolversObject);
  
  const updatedResolverFunctions = resolverFunctions.map((resolverFunc,index) => {
    const fieldName = fields[index];
    const currentResolver = async function(...args) { 
    const [parent, params, ctx, info] = args // 4 arguments available to resolvers. 
    // if (!parent){
    //   // console.log(info)
    // }
    if (!ctx['id'])  { // setting a unique id per request on the context obj
      ctx['id'] = uniqid.process();

    }
    const id = ctx.id
    var t0 = now(); 
    const resolverReturnValue = await resolverFunc(...args) // executing the original resolver. 
    var t1 = now();
    let speed = parseFloat((t1-t0).toFixed(4));
    await appendFile(queryField,fieldName,speed,id);

    console.log('Took', (t1 - t0).toFixed(4), 'milliseconds to run the ', fieldName + ' resolver.');
    return resolverReturnValue
  }
    Object.defineProperty(currentResolver,'name', {value:fieldName,writable:true}) // dynamically naming all of the resolvers respective to their original name
    return currentResolver
  })
  
  fields.forEach((field,index) => { // mapping to each field each respective resolver that has been updated. 
    newResolversObject[field] = updatedResolverFunctions[index]
  })
  return newResolversObject
  }
  