import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/App';
import './index.css';
// import registerServiceWorker from './registerServiceWorker';



ReactDOM.render(
  <App />,
  // <Hello name="TypeScript" enthusiasmLevel={1} />,
  document.getElementById('root') as HTMLElement
);
// registerServiceWorker();
