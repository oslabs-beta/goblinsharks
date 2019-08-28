// src/components/Overview.tsx

import * as React from 'react';

import './Queries.css'

// Header Props TS typedef.
// type OverviewProps = {
//   modes: Array<string>,
//   updateMode: Function
// }

type QueriesProps = {
  data: Object
}
function Queries({ data }: QueriesProps) {
  return (
    <div id="modeQueries">
    </div>
  )
}

export default Queries;
