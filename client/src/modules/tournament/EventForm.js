/**
 * Created by Dennis on 17-06-2017.
 */
import React, {Component}  from 'react';


export default class EventForm extends Component {


    handleSubmit = (event) => {
        event.preventDefault()
        const target = event.target;
        console.log(target)
        var e = {}
        e.name = target.name.value
        e.tournamentId = "";
        this.props.playerStore.addPlayer(e);

    }

    render() {
        return (


            <form  onSubmit={this.handleSubmit}>

                <div className="input-group">
                    <input
                        type="text"
                        name="title"
                        className="form-control"
                        placeholder="Add event name..."
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


