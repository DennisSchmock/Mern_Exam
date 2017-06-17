import React, { Component } from 'react';
import { Link } from "react-router"




var tournamentStore = [
    {id: 1,name: "tournament", description: "Test"},
    {id: 2, name: "tournament2", description: "Test2"},
    {id: 3, name: "tournament3", description: "Test2"}
    
]



export default class Tournaments extends Component{

    // const MapTournaments = tournamentStore.map((book)=>{
    //     return
    // })

    render(){
        return(
            <div className="container">
                <div className="page-header">
                    <h3 className="">Here will be a list of my tournaments</h3>
                </div>
                    <ul className="list-group">
                        {tournamentStore.map((tour)=> 
                            //Key to identify element 
                            <li type="button" key={tour.id} className="list-group-item">
                                {tour.name} <Link to={`tournament/id/${tour.id}`}>Edit tournament</Link>
                            </li>)}
                    </ul>
                
            </div>
        )
    }
}

function Tournament(props){
    return (
        <li>
            {props.name}
        </li>
    )
}