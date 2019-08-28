// src/components/Overview.tsx

import * as React from 'react';

import './Mutations.css'

// Header Props TS typedef.
// type OverviewProps = {
//   modes: Array<string>,
//   updateMode: Function
// }

type MutationsProps = {
  data: Object
}

function Mutations({ data }: MutationsProps) {
  return (
    <div id="modeMutations">
    </div>
  )
}

export default Mutations;
