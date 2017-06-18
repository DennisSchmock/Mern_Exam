/**
 * Created by Dennis on 17-06-2017.
 */
import React  from 'react';
import {observer} from "mobx-react";
import EventForm from "./EventForm"

const Events = observer((props) => {

    // var tournaments = props.route.tournamentStore.getTournaments();

    return (
        <div>
            <div className="panel panel-default">
                <div className="panel-heading">A list of Events</div>

                <div className="panel-body">
                    Eventlist here
                    <ul className="list-group">

                    </ul>
                </div>
                <div className="panel-footer">
                    <EventForm/>
                </div>
            </div>

        </div>
    )

})

export default Events
