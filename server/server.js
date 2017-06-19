let _ = require('lodash');
let express = require('express');
let app = express();
let logger = require('morgan');
let bodyParser = require('body-parser');
let helmet = require('helmet');
let secrets = require("./secrets/secrets")
let api = require("./api/api")


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
let User = require("./models/User")


app.use(logger("dev"))

//Helmet help set security headers: https://github.com/helmetjs/helmet
app.use(helmet());

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJWT.fromAuthHeader();
jwtOptions.secretOrKey = secrets.secret

var strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
    console.log("Payload recieved", jwt_payload);
    User.findOne({userName: jwt_payload.userName},(err,user)=>{
        if(err){logger("error", err)}
        if(user){
            next(null,user);
        } else {
            next(null,false);
        }
    })


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
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(passport.initialize());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use("/",api)


//todo code for errorhandler

// app.use(function (req, res, next) {
//     var err = new Error('Not Found')
//     err.status = 404
//     next(err)
// })
//
// app.use(function (err, req, res, next) {
//     console.error(err.status)
//     res.status(err.status || 500)
//     res.json({ msg: err.message, status: err.status })
// })


module.exports = app;


