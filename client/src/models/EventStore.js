/**
 * Created by Dennis on 17-06-2017.
 */
import { action, useStrict, extendObservable} from 'mobx'

import axios from 'axios'

const url = "http://localhost:3001/";

useStrict(true)

class EventStore{


    //Doesn't support decorators yet
    constructor() {
        extendObservable(this,{
            _events: []
        })

        this._observer = null;
    };

    getEvents(){
        return this._events;
    };

    getEvent(id){
        return this._events.filter((events)=>{
            return events.id === Number(id);
        })[0];
    };

    fetchEvents = (id) => {
        fetch(url + "tournament/" + id + "/events")
            .then((response) => {
                console.log(response)
                return response.json()
            })
            .then(action((response)=>{
                this._events = response;
                console.log("We have event data!")
            }))
    }


    addTournament = (event) => {

        console.log(event)
        var self = this
        axios.post(url +"tournament/player",{event})
            .then(()=>{
                self.fetchEvents();
            });

    }



}

export default new EventStore();