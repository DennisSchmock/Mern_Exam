import React, {Component}  from 'react';
import {Link} from "react-router"
import {observer} from "mobx-react";
import Players from './Players'
import Events from './Events'
import PlayerStore from '../../models/PlayerStore'
import EventStore from '../../models/EventStore'


const TournamentDashboard = observer(class TournamentDetails extends Component {



    render() {
        let id = this.props.params.id;
        let tournament
        tournament = this.props.route.tournamentStore.getTournament(id)
        console.log(tournament)


        return (
            <div className="container">
                <div className="col-md-4">
                <div className="panel panel-default">
                    <div className="panel-heading">Tournament Title: {tournament.title}</div>
                    <div className="panel-body"> {tournament.description}</div>

                    <Link to={`edittournament/id/${tournament.id}`}>Edit Tournament</Link>
                </div>

                </div>
                <div className="col-md-4">
                    <Players playerStore={PlayerStore} tournamentId ={id}/>
                </div>
                <div className="col-md-4">
                    <Events/>
                </div>

            </div>

        );
    }

})

export default TournamentDashboard
/**
 * Created by Dennis on 17-06-2017.
 */
