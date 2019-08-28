// src/components/Overview.tsx

import * as React from 'react';

import './Resolvers.css'

// Header Props TS typedef.
// type OverviewProps = {
//   modes: Array<string>,
//   updateMode: Function
// }

// ResolversProps type.
type ResolversProps = {
  resolversData: ResolversData,
}

// ResolversData type.
type ResolversData = {
  invocationCounts: Object,
  executionTimes: Object,
}

/**
 * 
 * @param props 
 */
function ResolversInvocationCount(props: any) {

  console.log('line 30: ', props);
  return (
    <div>
      
    </div>
  )
}

/**
 * 
 * @param props 
 */
function ResolversExecutionTime(props: any) {
  
  console.log('line 44: ', props);
  return (
    <div>

    </div>
  )
}

/**
 * 
 * @param props 
 */
function Resolvers(props: ResolversProps) {
  return (
    <div id="modeResolvers">
      <ResolversInvocationCount invocationCounts={props.resolversData.invocationCounts} />
      <ResolversExecutionTime executionTimes={props.resolversData.executionTimes} />
    </div>
  )
}

export default Resolvers;
