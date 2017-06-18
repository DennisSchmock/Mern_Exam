'use strict'
let bcrypt = require("bcrypt")
let mongoose = require("mongoose")
let Schema = mongoose.Schema
let secrets = require("../secrets/secrets")
let salt = secrets.salt


//This guide: http://devsmash.com/blog/password-authentication-with-mongoose-and-bcrypt
var UserSchema = new Schema({
    userName: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    loginAttemps: {type: Number, required: true, default: 0},
    lockUntil: {type: Number}
})




UserSchema.pre("save", function (next) {
    var user = this
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) { return next(err) }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) { return next(err) }
                user.password = hash
                next()
            })
        })
    } else {
        return next()
    }
})

UserSchema.methods.comparePassword = function (passw, callback) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) { return callback(err) }
        callback(null, isMatch)
    })
}

module.exports = mongoose.model('User', UserSchema);