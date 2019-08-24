const stateTypeResolvers = {
  Query: {
    state(parent, args, context, info) {
    // allowing child resolvers to access the arg -- 
    return 'California'
    } 
  },
  State: {
    async name(parent,args) {
      return ("California")
    },
    async total_dosage(parent,args) {
    console.log(21)
    },
  
    async total_manufactured(parent,args) {
      console.log(421312)
    },
    county(parent,args){ // giving access state and county to child field nodes  
      return {state: parent, county:args.county}
    }
  }
}


const mockResolverObject = {
  async name(parent,args) {
   console.log("California")
  },
  async total_dosage(parent,args) {
  console.log(21)
  },

  async total_manufactured(parent,args) {
    console.log(421312)
  },
  county(parent,args){ // giving access state and county to child field nodes  
    return {state: parent, county:args.county}
  }
}

module.exports = {
  stateTypeResolvers,
}