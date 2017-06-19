/**
 * Created by Dennis on 18-06-2017.
 */
let router = require("express").Router()
let secrets = require(".././secrets/secrets")
const Models = require(".././models/Tournament")
let User = require(".././models/User")

//Everything JWT related
let jwt = require('jsonwebtoken')
let passport = require('passport');
let passportJWT = require('passport-jwt');
let ExtractJWT = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJWT.fromAuthHeader();
jwtOptions.secretOrKey = secrets.secret

//Get a list of tournaments


router.get('/', function (req, res) {
    res.json({message: "You got served"})
});

router.get('/tournaments', (req, res,next) => {
    Models.TournamentModel.find({}, function (err, tournaments) {
        if (err) throw err;
        res.send(JSON.stringify(tournaments))

    })
})


//Create new tournament
router.post('/tournament', passport.authenticate('jwt', {session: false}), (req, res) => {
    player = {name: "first"}
    let tournament = req.body.tournament
    Models.TournamentModel.create(tournament, (err, tournament) => {
        if (err) console.log(err);
        tournament.players.push(player);
        tournament.save((err, tournament) => {
            if (err) logger("error", err)
        })
        res.json(tournament);
    })
});

//Update tournament
router.put('/tournament/:id', passport.authenticate('jwt', {session: false}), function (req, res) {
    let id = req.params.id;
    let tournamentToEdit = req.body.tournament
    console.log("My _id = " + tournamentToEdit._id)
    Models.TournamentModel.findById(tournamentToEdit._id, (err, tournament) => {
        if (err) {
            console.log(err)
            console.log("error")
        } else {
            tournament.title = tournamentToEdit.title
            tournament.description = tournamentToEdit.description

            tournament.save((err, tournament) => {
                if (err) {
                    res.status(500).send(err)
                }
                res.send(tournament)
            })
        }
    })

})

//Delete tournament
router.delete('/tournament/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    let tournamentId = parseInt(req.params.id);
    Models.TournamentModel.findOneAndRemove({id: tournamentId}, (err, data) => {
        if (err) {
            console.log(err.message)
        }
        else {
            res.status(204).send()
        }

    })

})

//PLAYERS API
//Get list of tournaments specific to tournament
router.get('/tournament/players/:id', (req, res) => {
    let tournamentId = parseInt(req.params.id);
    console.log("got to get")
    Models.TournamentModel.findOne({'id': tournamentId}, (err, tournament) => {
        if (err) {
            logger(err);
            return;
        }
        res.send(JSON.stringify(tournament.players))
    })
});

//Create new player in tournament
router.post('/tournament/player', passport.authenticate('jwt', {session: false}), (req, res) => {
    let player = req.body.player
    //console.log(player)
    Models.TournamentModel.findOne({'id': player.tournamentId}, (err, tournament) => {
        if (err) {
            console.log(err.message)
        }
        tournament.players.push(player);
        tournament.save(function (err, tournament) {
            if (err) return console.log(err)

            var players = [];
            players = tournament.players
            let size = players.length - 1
            res.send(players[size])
        })

    })
});

//LOGIN API
router.post("/login", (req, res) => {
    if (req.body.name && req.body.password) {
        var name = req.body.name;
        var password = req.body.password;
    }
    User.findOne({userName: name}, (err, user) => {
        if (err) {
            logger("Error", err)
        }
        if (user == null) {
            res.status(401).json({message: "no such user found"});
        }
        user.comparePassword(password,(err,isMatch)=>{
            if(isMatch){
                var payload = {userName: user.userName}
                var token = jwt.sign(payload,jwtOptions.secretOrKey);
                res.json({message: "ok",token:token});
            } else{
                res.status(401).json({message: "passwords did not match"});
            }
        })
    })
});
module.exports = router