import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import RouterComp from './RouterComp';
import './index.css';
import TournamentStore from './models/TournamentStore'

ReactDOM.render(
  <RouterComp tournamentStore={TournamentStore} />,
  document.getElementById('root')
);

registerServiceWorker();
