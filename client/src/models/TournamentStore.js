// import React  from 'react';
import { action, useStrict, extendObservable} from 'mobx'
import AuthStore from "./AuthStore"

import axios from 'axios'

const url = "http://localhost:3001/";

useStrict(true)

class TournamentStore{

    //Doesn't support decorators yet
    constructor() {
        extendObservable(this,{
            _tournaments: []
        })
        this._jwt = AuthStore.getToken();
        this._authHeader = {headers: {
            'Authorization' : `JWT ${this._jwt}`
        }}

        this.fetchTournaments();
    };


    getTournaments(){
        return this._tournaments;
    };

    getTournament(id){
        return this._tournaments.filter((tournament)=>{
            return tournament.id === Number(id);
        })[0];
    };

    fetchTournaments = () => {
        fetch(url + "tournaments")
            .then((response) => {
                return response.json()
            })
            .then(action((response)=>{
                this._tournaments = response;
            }))
    }


    addTournament = (tournament) => {

        var self = this
        axios.post(url +"tournament",{tournament},this._authHeader)
            .then(()=>{
            self.fetchTournaments();

        });

    }

    deleteTournament = (id) =>{
        var self = this
        axios.delete(url + "tournament/" + id, this._authHeader)
            .then((response) =>{
            self.fetchTournaments();
        }).catch((err)=>{
          console.log(err);
        })

    }

    updateTournament = (tournament) => {
        var self = this
        let id = tournament.id
        axios.put(url + "tournament/" + id,{tournament}, this._authHeader)
            .then(()=>{
                self.fetchTournaments()
            }).catch((err)=>{
            console.log(err);
        })
    }

}

export default new TournamentStore();