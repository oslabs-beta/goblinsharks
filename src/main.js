const enableTracking = require('./enableTracking.js')
const mockResolvers = require('../testResolvers/mockResolvers')
const mapResolvers = require("./mapResolvers")
const { createFile } = require('./db/fileController')


class EnableMonitoring{
  constructor(resolvers){
    this.resolvers =  mapResolvers(resolvers);
  }
}

// - - - test case - - - 
// old resolvers
const resolvers = mockResolvers.stateTypeResolvers;
// new resolvers
// const injectedResolvers = new EnableMonitoring(resolvers);
// console.log(resolvers)
// console.log(injectedResolvers);


module.exports = EnableMonitoring