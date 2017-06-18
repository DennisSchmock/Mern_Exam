let _ = require('lodash');
let express = require('express');
let app = express();
let logger = require('morgan');
let bodyParser = require('body-parser');
let helmet = require('helmet');
let User = require("./models/User")


//Everything JWT related
let jwt = require('jsonwebtoken')
let passport = require('passport');
let passportJWT = require('passport-jwt');
let ExtractJWT = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;

//Everything Mongoose related
let mongoose = require('mongoose');
let config = require('./config')
let Models = require('./models/Tournament')
let Player = require('./models/Player')

app.use(logger("dev"))

//Helmet help set security headers: https://github.com/helmetjs/helmet
app.use(helmet());

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJWT.fromAuthHeader();
jwtOptions.secretOrKey = 'tasmanianDevil';

var strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
    console.log("Payload recieved", jwt_payload);
    var user = users[_.findIndex(users, {id: jwt_payload.id})];
    if (user) {
        next(null, user);
    } else {
        next(null, false);
    }
});

passport.use(strategy);

mongoose.connect(`mongodb://${config.username}:${config.password}@ds153400.mlab.com:53400/todoapp`);

mongoose.connection.on('connected', () => {
    console.log('Mongose connected');
    app.listen(3001, () => {
        console.log('Powered up and listening to port: 3001');
    });


});

mongoose.connection.on('error', function (err) {
    console.log('Mongoose error' + err);

});

mongoose.connection.on('disconnected', () => {
    console.log('Disconnected');
})


app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(passport.initialize());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


//LOGIN API
app.post("/login", (req, res) => {
    if (req.body.name && req.body.password) {
        var name = req.body.name;
        var password = req.body.password;
    }
    console.log(password)
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

app.get('/', function (req, res) {
    res.json({message: "You got served"})
});

//Get a list of tournaments
app.get('/tournaments', (req, res) => {
    Models.TournamentModel.find({}, function (err, tournaments) {
        if (err) throw err;
        res.send(JSON.stringify(tournaments))

    })
})

app.get("/secret", passport.authenticate('jwt', {session: false}), (req, res) => {
    res.json("Success! You can see the secret!");
})

//Create new tournament
app.post('/tournament', passport.authenticate('jwt', {session: false}), (req, res) => {
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
app.put('/tournament/:id', passport.authenticate('jwt', {session: false}), function (req, res) {
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
app.delete('/tournament/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
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
app.get('/tournament/players/:id', (req, res) => {
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
app.post('/tournament/player', passport.authenticate('jwt', {session: false}), (req, res) => {
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

