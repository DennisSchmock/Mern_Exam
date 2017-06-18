/**
 * Created by Dennis on 17-06-2017.
 */
import React from 'react';
import {observer} from "mobx-react";
import PlayerForm from "./PlayerForm"

const Players = observer((props) => {

    // var tournaments = props.route.tournamentStore.getTournaments();

    console.log("")
    return (
        <div>
            <div className="panel panel-default">
                <div className="panel-heading">A list of players</div>

                <div className="panel-body">
                    something here
                    <ul className="list-group">

                    </ul>
                </div>
                <div className="panel-footer">
                    <PlayerForm playerStore={props.playerStore} tournamentId={props.tournamentId}></PlayerForm>
                </div>
            </div>

        </div>
    )

})



export default Players
