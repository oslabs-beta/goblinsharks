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
import { processedData } from './Data';

// Renders App.
const App = () => {
  // An array of Modes.
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
  })

  // Initialize the current view.
  let currentView = <Overview overviewData={processedData.overview} />;

  // Conditionally render the following based on current mode.
  switch (currentMode) {
    case 'overview':
      currentView = <Overview overviewData={processedData.overview} />;
      break;
    case 'queries':
      currentView = <Queries data={processedData} />;
      break;
    case 'mutations':
      currentView = <Mutations data={processedData} />;
      break;
    case 'resolvers':
      currentView = <Resolvers resolversData={processedData.resolvers} />;
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
