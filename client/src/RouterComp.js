import {Router, IndexRoute, Route, hashHistory} from "react-router";
import React, { Component } from 'react';
import App from "./App";
import Home from "./Home";
import Tournaments from "./modules/tournament/Tournaments.js"
import TournamentForm from "./modules/tournament/TournamentForm.js"
import TournamentDashboard from "./modules/tournament/TournamentDashboard"
import EditTournament from "./modules/tournament/EditTournament"
import AuthStore from "./models/AuthStore"

export default class RouterComp extends Component{


    render(){

        function loggedIn(){
            return AuthStore.isUserAuthenticated()
        }
        function requireAuth(nextState,replace){
            if (!loggedIn()) {
                replace({
                    pathname: '/'
                })
            }
        }
        return(
            <div>

                <Router history={hashHistory}>
                    <Route path="/" component={App}>
                        <IndexRoute component={Home}></IndexRoute>
                        <Route path="tournaments" component={Tournaments}
                               tournamentStore={this.props.tournamentStore} onEnter={requireAuth}/>
                        <Route path="createtournament" component={TournamentForm}
                               tournamentStore={this.props.tournamentStore} onEnter={requireAuth}/>
                        <Route path="tournament/id/:id" component={TournamentDashboard}
                               tournamentStore={this.props.tournamentStore} onEnter={requireAuth}/>
                        <Route path="edittournament/id/:id" component={EditTournament}
                               tournamentStore={this.props.tournamentStore} onEnter={requireAuth}/>

                    </Route>
                </Router>
            </div>
        )
    }
}

