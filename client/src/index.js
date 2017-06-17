import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import RouterComp from './RouterComp';
import './index.css';

ReactDOM.render(
  <RouterComp />,
  document.getElementById('root')
);

registerServiceWorker();
