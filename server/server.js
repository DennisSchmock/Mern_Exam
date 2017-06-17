let express = require('express');
let app = express();
let logger = require('morgan');
let bodyParser = require('body-parser');
let MongoCLient = require('mongodb').MongoClient;
let mongoose = require('mongoose');
let config = require('./config')
var db
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: true}));



MongoCLient.connect(`mongodb://${config.username}:${config.password}@ds153400.mlab.com:53400/todoapp`,(err,database)=>{
    if(err) return console.log(err)
    db = database
    app.listen(3001,()=>{
        console.log('3001');
    });

})




app.get('/',function(req,res){
   res.sendFile(__dirname + '/public/index.html')
});

//Get a list of tournaments
app.get('/tournaments',(req,res)=>{
    var cursor = db.collection('tournaments')
        .find()
        .toArray(function(err,results){
           res.send(JSON.stringify(results));
        });
})

//Create new tournament
app.post('/tournament',(req,res)=>{
    db.collection('tournaments').save(req.body,(err,result)=>{
        if (err) console.log(err);
        console.log('saved to db')
        res.redirect('/');
    });
});

//Update tournament
app.post('/tournament/:id',function(req,res){
    var tournamentId = parseInt( req.params.id);
    db.collection('tourmanents')
        .findOneAndUpdate({id: tournamentId},{
            $set: {
                name: req.body.name,
                quote: req.body.quote
            }
        }, (err,result)=>{
            if(err) return res.send(err)
            res.send(JSON.stringify(result));
        })
})


//Delete tournament
app.delete('/tournament/:id', (req,res)=>{
    var tournamentId = parseInt (req.params.id);
    db.collection('quotes')
        .deleteOne({id: tournamentId }, (err,data)=>{
            if (err) return res.send(500,err);
            res.send({message: 'a tournament got deleted'});
        })
})
