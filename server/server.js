let express = require('express');
let app = express();
let logger = require('morgan');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let config = require('./config')
let Models = require('./models/Tournament')
let Player = require('./models/Player')

app.use(logger("dev"))



mongoose.connect(`mongodb://${config.username}:${config.password}@ds153400.mlab.com:53400/todoapp`);

mongoose.connection.on('connected',()=>{
    console.log('Mongose connected');
    app.listen(3001,()=>{
        console.log('Powered up and listening to port: 3001');
    });
});

mongoose.connection.on('error', function(err){
    console.log('Mongoose error' + err);

});

mongoose.connection.on('disconnected',()=>{
    console.log('Disconnected');
})


app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/',function(req,res){
   res.sendFile(__dirname + '/public/index.html')
});

//Get a list of tournaments
app.get('/tournaments',(req,res)=>{
    Models.TournamentModel.find({},function (err,tournaments) {
       if(err) throw err;
       res.send(JSON.stringify(tournaments))

    })
})

//Create new tournament
app.post('/tournament',(req,res)=>{
    let tournament = req.body.tournament
    console.log(req.body.tournament)
    Models.TournamentModel.create(tournament, (err,tournament)=> {
       if(err) throw err;
       res.json(tournament);
       console.log(tournament)
   })
});


//Update tournament
app.put('/tournament/:id',function(req,res){
    let id = req.params.id;
    let tournamentToEdit = req.body.tournament
    console.log("My _id = " + tournamentToEdit._id)
    Models.TournamentModel.findById(tournamentToEdit._id, (err,tournament)=>{
        if(err){
           console.log(err)
            console.log("error")
        } else
        {
            tournament.title = tournamentToEdit.title
            tournament.description = tournamentToEdit.description

            tournament.save((err,tournament)=>{
                if (err){
                    res.status(500).send(err)
                }
                res.send(tournament)
            })

        }
    })

})

//Delete tournament
app.delete('/tournament/:id', (req,res)=>{
    let tournamentId = parseInt (req.params.id);
    Models.TournamentModel.findOneAndRemove({id: tournamentId}, (err,data)=> {
        if(err){console.log(err.message)}
        else {res.status(204).send()}

    })

})

//PLAYERS
//Create new tournament
app.post('/tournament/player',(req,res)=>{
    let player = req.body.player
    console.log(player)
    Models.TournamentModel.findOne({'id' : player.tournamentId},(err,tournament)=>{
        if(err) {
            console.log(err.message)
        }
        tournament.players.push(player);
        tournament.save(function(err){
            if(err) return console.log(err)
            console.log("succes!")
        })
        res.send(player.json)

    })
});