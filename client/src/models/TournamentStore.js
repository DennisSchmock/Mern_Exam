import {observable, action, useStrict, extendObservable} from 'mobx'

useStrict(true)

class TournamentStore{

    @observable _tournaments = [];

    constructor() {

        this._tournaments = this.fetchTournaments();
    };

    getTournaments(){
        return this._tournaments;
    };

    getTournament(){
        return this._tournaments.filter((tournament)=>{
            return tournament.id === Number(id);
        })[0];
    };

    fetchTournaments = () => {
        fetch("http://localhost:3000/tournaments")
            .then((response) => {
            return response.json()
            })
            .then((response)=>{
                console.log("We have data!")
            })
    }



}

export default new BookStore();