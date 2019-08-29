// src/components/App.tsx
import * as React from 'react';
import { useState, useEffect } from 'react';

// Components.
import Header from './Header';
import Overview from './Overview';
import Queries from './Queries';
import Mutations from './Mutations';
import Resolvers from './Resolvers';

// Style.
import "./App.css";

// TODO: Make this responsive to changes.
import { processedData, getOverviewData, getResolversData } from './Data';

// Renders App.
const App = () => {
  console.log('app is getting rendered')
  // An array of Modes.
  const [ data, updateData ] = useState(processedData);
  
  
  useEffect(()=>{
    
    const connection = new WebSocket('ws://localhost:9000');
    console.log('use effect fired off')
    connection.onopen = () => {
      console.log("socket is open on port 9000")
      fetch('./db/data.json')
        .then((data)=>data.json())
        .then((res)=>{
          console.log('about to process data after opening connection')
          const processedData = {
            overview: getOverviewData(res),
            resolvers: getResolversData(res),
          };
          updateData(processedData)
        })
        .catch(e => console.log('error fetching from json', e))
      connection.onmessage = (message) => {
        console.log(message);
        console.log('socket server message: ' + (message.data));
    
        fetch('./db/data.json')
        .then((data)=>data.json())
        .then((res)=>{
          console.log('about to process data')
          const processedData = {
            overview: getOverviewData(res),
            resolvers: getResolversData(res),
          };
          updateData(processedData)
        })
        .catch(e => console.log('error fetching from json', e))
      }
    }
  },[])
  const modes = ['Overview', 'Queries', 'Mutations', 'Resolvers'];
 
  // Hook to update the current mode.
  const [currentMode, updateMode] = useState('overview');

  // useEffect hook to change the css styling of the active mode.
  useEffect(() => {
    // Remove 'active' from class names.
    Array.from(document.getElementsByClassName("header-navigation-item"))
         .forEach(el => el.classList.remove('active'));
    // Add 'active' to the current Mode css.
    document.getElementById("header-navigation-item-" + currentMode)!
            .classList.toggle('active');
  });

  console.log("resolvers data: ", data);
  // Initialize the current view.
  let currentView = <Overview overviewData={data.overview} resolversData={data.resolvers}/>;

  // Conditionally render the following based on current mode.
  switch (currentMode) {
    case 'overview':
      currentView = <Overview overviewData={data.overview} resolversData={data.resolvers} />;
      break;
    case 'queries':
      currentView = <Queries data={data} />;
      break;
    case 'mutations':
      currentView = <Mutations data={data} />;
      break;
    case 'resolvers':
      currentView = <Resolvers resolversData={data.resolvers} />;
      break;
  }

  // Render App with the following DOM.
  return (
    <div>
      <Header modes={modes} updateMode={updateMode} />
      <div id="modeWrapper">
        {currentView}
      </div>
    </div>
  )
}

export default App
