/**
 * Created by Dennis on 17-06-2017.
 */
import React, {Component}  from 'react';


export default class PlayerForm extends Component {

    constructor(props){
        super(props)
        this.state = {name: ''};
        this.handleChange = this.handleChange.bind(this);

    }

    handleChange(event) {
        this.setState({name: event.target.value});
    }

    handleSubmit = (event) => {
        event.preventDefault()
        var player = {}
        player.name = this.state.name
        player.tournamentId = this.props.tournamentId;
        this.props.playerStore.addPlayer(player);
        this.setState({name: ''});

    }

    render() {
        return (

            <form  onSubmit={this.handleSubmit}>

                <div className="input-group">
                    <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Add player name..."
                        value={this.state.name}
                        required={true}
                        onChange={this.handleChange}

                    />

                    <span className="input-group-btn">
                            <button className="btn btn-default">Add!</button>
                        </span>
                </div>


            </form>

        )
    }
}


