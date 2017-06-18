/**
 * Created by Dennis on 17-06-2017.
 */
import React, {Component}  from 'react';


export default class PlayerForm extends Component {


    handleSubmit = (event) => {
        event.preventDefault()
        const target = event.target;
        var player = {}
        player.name = target.name.value
        player.tournamentId = this.props.tournamentId;
        this.props.playerStore.addPlayer(player);

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
                        required={true}
                    />

                    <span className="input-group-btn">
                            <button className="btn btn-default">Add!</button>
                        </span>
                </div>


            </form>

        )
    }
}


