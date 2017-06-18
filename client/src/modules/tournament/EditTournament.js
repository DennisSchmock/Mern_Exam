/**
 * Created by Dennis on 18-06-2017.
 */
import React, {Component}  from 'react';


export default class EditTournament extends Component {


    handleSubmit = (event) => {
        event.preventDefault()
        const target = event.target;
        var tournament = {}
        tournament.description = target.description.value
        tournament.title = target.title.value
        tournament._id = target.id.value;
        this.props.route.tournamentStore.updateTournament(tournament);
        window.location = '#/tournament/id/' + this.props.params.id+"/";
        ;
    }


    render() {
        let id = this.props.params.id;
        let tournament
        tournament = this.props.route.tournamentStore.getTournament(id)
        return (

            <div className="container col-sm-4">


                <form className="form-horizontal" onSubmit={this.handleSubmit}>


                    <div className="input-group">
                        <input
                            type="text"
                            name="title"
                            className="form-control"
                            placeholder="Tournament Title..."
                            defaultValue={tournament.title}
                            required={true}
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="text"
                            name="description"
                            className="form-control"
                            placeholder="Description"
                            defaultValue={tournament.description}
                            required={true}
                        />
                    </div>
                    <input
                        hidden={true}
                        value={tournament._id}
                        name="id"

                    />

                    <button className="btn">Next</button>


                </form>

            </div>
        )
    }
}


