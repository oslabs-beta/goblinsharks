const mapResolvers = require("./mapResolvers")
const { trackError } = require("../bin/db/fileController.js")


const enableMonitoring = (resolvers) => {
const injectedResolvers = mapResolvers(resolvers)
return injectedResolvers
};




module.exports = { enableMonitoring, trackError}