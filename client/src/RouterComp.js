import {Router, IndexRoute, Route, hashHistory,Link} from "react-router";
import React, { Component } from 'react';
import App from "./App";
import Home from "./Home";
import Tournaments from "./modules/tournament/Tournaments.js"
import CreateTournament from "./modules/tournament/CreateTournament.js"

export default class RouterComp extends Component{

    render(){
        return(
            <div>
                <Router history={hashHistory}>
                    <Route path="/" component={App}>
                        <IndexRoute component={Home}></IndexRoute>
                        <Route path="tournaments" component={Tournaments}/>
                        <Route path="createtournament" component={CreateTournament}/>
                    </Route>
                </Router>
            </div>
        )
    }
}