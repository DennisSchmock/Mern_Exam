/**
 * Created by Dennis on 17-06-2017.
 */
import {action, useStrict, extendObservable} from 'mobx'

import axios from 'axios'

const url = "http://localhost:3001/";

useStrict(true)

class PlayerStore{


    //Doesn't support decorators yet
    constructor() {
        extendObservable(this,{
            _players: []
        })

        this.fetchPlayers();
    };


    getPlayers(){
        return this._players;
    };

    getPlayer(id){
        return this._players.filter((player)=>{
            return player.id === Number(id);
        })[0];
    };

    fetchPlayers = (id) => {
        fetch(url + "tournament/" + id + "/players")
            .then((response) => {
                console.log(response)
                return response.json()
            })
            .then(action((response)=>{
                this._players = response;
                console.log("We have playerdata!")
            }))
    }


    addPlayer = (player) => {

        console.log( player)
        var self = this
        axios.post(url +"tournament/player",{player})
            .then(()=>{
                self.fetchPlayers();


            });

    }



}

export default new PlayerStore();