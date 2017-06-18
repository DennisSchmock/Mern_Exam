import React, {Component} from 'react';
import {IndexLink, Link} from "react-router";
import LoginForm from './modules/tournament/LoginForm'


import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="App-header">

                    <h2>Welcome to iTournamentMaker</h2>

                    <div style={{position:"absolute",
                        top:10,
                        right:30}}><LoginForm/></div>
                </div>
                <nav className="navbar navbar-default">
                    <div className="navbar-header">
                        <IndexLink className="navbar-brand" to="/">Frontpage</IndexLink>
                        <ul className="nav navbar-nav">

                            <li><Link to="/tournaments">My Tournaments</Link></li>
                        </ul>
                    </div>
                </nav>
                <div className="content">
                    {this.props.children}


                </div>
            </div>
        );
    }
}

//The official way of exporting
export default App;
