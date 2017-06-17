import React, { Component } from 'react';
import { IndexLink, Link} from "react-router";
 
import logo from './logo.svg';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
        
          <h2>Welcome to iTournamentMaker</h2>
        </div>
         <nav className="navbar navbar-default">
           <div className="navbar-header">
             <IndexLink className="navbar-brand" to="/">Brand</IndexLink>
             <ul className="nav navbar-nav">
               <li><Link to="/createtournament">Create tournament</Link></li>
               <li><Link to="/tournaments">My Tournaments</Link></li>
             </ul>
           </div>
         </nav>
        <p className="content">
          {this.props.children}

        </p>
      </div>
    );
  }
}

//The officialt way of exporting
export default App;
