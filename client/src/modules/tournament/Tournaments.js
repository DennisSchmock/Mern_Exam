import React from 'react';
import {Link} from "react-router"
import {observer} from "mobx-react";
import TournamentForm from './TournamentForm'


const Tournaments = observer((props) => {

    var tournaments = props.route.tournamentStore.getTournaments();




    console.log(tournaments)
    return (
        <div className="container">
            <ul className="list-group">
                {tournaments.map((tour) =>
                    //Key to identify element
                    <button key={tour.id} className="list-group-item">
                        <div className="container col-sm-4"><strong> {tour.title}</strong></div>
                        <div className="container col-sm-4"><Link to={`tournament/id/${tour.id}`}>Tournament Dashboard</Link></div>
                            <button to ="/tournaments" type="button" name="delete" value={tour.id} onClick={()=>
                                props.route.tournamentStore.deleteTournament(tour.id)} className="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    </button>)}
            </ul>

            <TournamentForm tournamentStore={props.route.tournamentStore}/>
        </div>
    )



})

export default Tournaments
