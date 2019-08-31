// src/components/Overview.tsx

import * as React from 'react';

import './Resolvers.css'


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
 * Renders the list of resolvers sorted by invocation count, descending.
 * @param props 
 */
function ResolversInvocationCount(props: any) {
  // Sort the object of objects by count popularity descending.
  const resolverListSortedByPopularity = 
    Object.keys(props.invocationCounts).map(path => {
      return [path, props.invocationCounts[path]];
    }).sort((a, b) => b[1] - a[1]);

  // Create array of DOM elements for the resolvers.
  const resolverListItems = resolverListSortedByPopularity.map((item, idx) => {
    return (
      <div key={item[0] + idx} className="resolverListItem">
        <div className="resolverListName">{item[0]}</div>
        <div className="resolverListCount">{item[1]}</div>
      </div>
    )
  });

  // Render the following:
  return (
    <div id="resolvers-popularity" className="resolvers-content">

      <div id="resolvers-title" className="content-title resolvers-content-whitebg">
        <b>Resolver Operations</b> by invocation count:
      </div>

      <div id="resolvers-popularitylist-wrapper" className="overview-content-whitebg">
        {resolverListItems}
      </div>
    </div>
  )
}


/**
 * Renders the list of resolvers sorted by average execution time, descending.
 * @param props 
 */
function ResolversExecutionTime(props: any) {
  // Sort the object of objects by count popularity descending.
  const resolverListSortedByExecutionTime = 
    Object.keys(props.executionTimes).map(path => {
      return [path, props.executionTimes[path]['ave']];
    }).sort((a, b) => b[1] - a[1]);

  // Create array of DOM elements for the resolvers.
  const resolverListItems = resolverListSortedByExecutionTime.map((item, idx) => {
    return (
      <div key={item[0] + idx} className="resolverListItem">
        <div className="resolverListName">{item[0]}</div>
        <div className="resolverListCount">{item[1].toFixed(2)}</div>
      </div>
    )
  });

  // Render the following:
  return (
    <div id="resolvers-executiontime" className="resolvers-content">

      <div id="resolvers-title" className="content-title resolvers-content-whitebg">
        <b>Resolver Operations</b> by average execution time (ms):
      </div>

      <div id="resolvers-popularitylist-wrapper" className="overview-content-whitebg">
        {resolverListItems}
      </div>
    </div>
  )
}


/**
 * Resolvers FC renders the following.
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
