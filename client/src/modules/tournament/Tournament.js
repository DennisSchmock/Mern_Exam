import React, { Component } from 'react';

class Tournament extends Component{
    render(){
        return (
            <h1>
                I am a tournament with value {this.props.value}
            </h1>
        )
    }
}

export default Tournament