import React, {Component}  from 'react';


export default class TournamentForm extends Component {


    handleSubmit = (event) => {
        event.preventDefault()
        const target = event.target;
        console.log(target)
        var tournament = {}
        tournament.description = target.description.value
        tournament.title = target.title.value
        this.props.tournamentStore.addTournament(tournament);
        this.setState({
            title: "",
            description: ""
        })
    }


    render() {
        return (

            <div className="container col-sm-4">


                <form className="form-horizontal" onSubmit={this.handleSubmit}>


                    <div className="input-group">
                        <input
                            type="text"
                            name="title"
                            className="form-control"
                            placeholder="Tournament Title..."
                            required={true}
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="text"
                            name="description"
                            className="form-control"
                            placeholder="Description"
                            required={true}
                        />
                    </div>

                    <button className="btn">Next</button>


                </form>

            </div>
        )
    }
}


