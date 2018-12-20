var express = require('express')
var router = express.Router()
var User = require('../models/users-models.js')
const passport = require('passport')
var localStrategy = require('passport-local').Strategy

passport.use(new localStrategy({usernameField: 'email',    // define the parameter in req.body that passport can use as username and password
    passwordField: 'password'},
(email, password, done) => {
    User.findOne({email: email},  (err, doc) =>{
        if (err) {done(err)} else {
            if (doc)  { var valid = doc.comparePassword(password, doc.password)
                if (valid) {
                    // do not add password hash to session
                    done (null, {email: doc.email, id: doc._id})}
                else {done(null, false)}
            } else {
                done(null, false)
            }
        }
    })
}))

passport.deserializeUser(function (user, done) {
    done(null, user)
})
passport.serializeUser(function (user, done) {
    done(null, user)
})
router.SignUp = (req, res) =>{
    var body = req.body,
        email = body.email,
        password = body.password,
        location = body.location,
        workID = body.workID
    User.findOne({
        email: email
    }, (err, doc) =>{
        if (err) {
            res.status(500).send('error')
        } else {
            if (doc) {
                res.status(500).send('Username already exists')
            } else {
                var newuser = new User()
                newuser.email = email
                newuser.password = newuser.hashPassword(password)
                newuser.location = location
                newuser.workID = workID
                newuser.save( (err) =>{
                    if (err) {
                        res.json({message: 'You have not been registered yet try again', errmsg: err})
                    } else {
                        res.json({message: 'You are now registered'})
                    }
                })
            }
        }
    })
}

router.delete =(req, res) => {
    User.findByIdAndRemove(req.params.id, function (err) {
        if (err)
            res.json({message: 'The user has not been deleted ', errmsg: err})
        else
            res.json({message: 'Successfully Deleted!'})
    })
}
module.exports = router
