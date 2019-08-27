const mapResolvers = require("./mapResolvers")


const enableMonitoring = (resolvers) => {
const injectedResolvers = mapResolvers(resolvers)
return injectedResolvers
};




module.exports = enableMonitoring