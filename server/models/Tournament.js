/**
 * Created by Dennis on 17-06-2017.
 */
'use strict'
let config = require('../config')

let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let autoIncrement = require('mongoose-auto-increment');
let con = mongoose.createConnection(`mongodb://${config.username}:${config.password}@ds153400.mlab.com:53400/todoapp`);
autoIncrement.initialize(con);



var PlayerSchema = new Schema({
    name: String,
    id: Number
})

PlayerSchema.plugin(autoIncrement.plugin,{
    model: 'Player',
    field: 'id',
    startAt: 1,
    incrementBy: 1,
    unique: false
})
let PlayerModel = mongoose.model("Player", PlayerSchema);


var TournamentSchema = new Schema({
    title: String,
    description: String,
    userId: String,
    players: [PlayerSchema],
    events: [],
    id: Number
})

TournamentSchema.plugin(autoIncrement.plugin,{
    model: 'Tournament',
    field: 'id',
    startAt: 100,
    incrementBy: 1
})
let TournamentModel = mongoose.model("Tournament", TournamentSchema);


let Models = {
    TournamentModel : TournamentModel,
    PlayerModel : PlayerModel
}
module.exports = Models;