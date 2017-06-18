// import React  from 'react';
import { action, useStrict, extendObservable} from 'mobx'

import axios from 'axios'

const url = "http://localhost:3001/";

useStrict(true)

class TournamentStore{

    //Doesn't support decorators yet
    constructor() {
        extendObservable(this,{
            _tournaments: []
        })

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
                console.log("We have data!")
            }))
    }


    addTournament = (tournament) => {

        console.log("Before fetch")
        console.log(tournament)
        var self = this
        axios.post(url +"tournament",{tournament})
            .then(()=>{
            self.fetchTournaments();


        });

    }

    deleteTournament = (id) =>{
        var self = this
        axios.delete(url + "tournament/" + id)
            .then((response) =>{
            self.fetchTournaments();
        }).catch((err)=>{
          console.log(err);
        })

    }

    updateTournament = (tournament) => {
        var self = this
        let id = tournament.id
        axios.put(url + "tournament/" + id,{tournament})
            .then(()=>{
                self.fetchTournaments()
            }).catch((err)=>{
            console.log(err);
        })
    }

}

export default new TournamentStore();