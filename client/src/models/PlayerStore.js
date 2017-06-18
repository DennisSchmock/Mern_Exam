/**
 * Created by Dennis on 17-06-2017.
 */
import {action, useStrict, extendObservable} from 'mobx'

import axios from 'axios'
import AuthStore from "./AuthStore"


const url = "http://localhost:3001/";

useStrict(true)

class PlayerStore{

    //Doesn't support decorators yet
    constructor() {
        extendObservable(this,{
            _players: []
        })
        this._jwt = AuthStore.getToken();
        this._authHeader = {headers: {
            'Authorization' : `JWT ${this._jwt}`
        }}
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
        fetch(url + "tournament/players/" + id)
            .then((response) => {
                return response.json()
            })
            .then(action((response)=>{
                this._players = response;
            }))
    }


    addPlayer = (player) => {
        axios.post(url +"tournament/player",{player},this._authHeader)
            .then(action((response)=>{
                this._players.push(response.data)
            }));

    }

}

export default new PlayerStore();