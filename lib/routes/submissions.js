'use strict';

var Sub = require('../models/submissions-model.js');
var express = require('express');
var router = express.Router();

//CREATE
router.addSubmissions = function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    var sub = new Sub();
    sub.fname = req.body.fname; // the requested value
    sub.lname = req.body.lname; // the requested value
    sub.email = req.body.email; // the requested value
    sub.number = req.body.number; // the requested value
    sub.gender = req.body.gender; // the requested value
    sub.age = req.body.age; // the requested value
    sub.startWeight = req.body.startWeight; // the requested value
    sub.goalWeight = req.body.goalWeight; // the requested value
    sub.currentWeight = req.body.currentWeight; // the requested value
    sub.height = req.body.height; // the requested value
    sub.location = req.body.location; // the requested value
    sub.date = req.body.date; // the requested value
    sub.note = req.body.note; // the requested value
    sub.save(function (err) {
        if (err) {

            res.json({ message: 'Please make sure that you have entered all fields', errmsg: err });
            return res.status(401).send();
        } else {
            // success message
            res.json({ message: 'The new member has been added', name: sub.name });
        }
    });
};
//READ

//get a list of all the submissions
router.displayAll = function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    Sub.find(function (err, subs) {
        if (err) {
            res.send(err);
            return res.status(401).send();
        } else {
            res.send(JSON.stringify(subs, null, 3));
        }
    });
};

//get a single submission
router.findSubmissionById = function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    Sub.find({ '_id': req.params.id }, function (err) {
        if (err != null) {
            res.status(400).send();
            res.json({ message: 'Sorry but we cant find this member' });
        } else {
            res.json({ message: 'Member found' });
        }
    });
};

// search for a submission by location
router.findByLocation = function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    Sub.find({ location: req.params.location }, 'location name age', function (err, subs) {
        if (err != null) {
            return res.status(401).send();
        } else res.send(JSON.stringify(subs, null, 3));
    });
};

//UPDATE
//update a submission
router.updateSubmission = function (req, res) {
    Sub.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(function () {
        res.status(200).json({ message: 'Updated' });
    });
};

//DELETE
// delete on submistion
router.deleteSubmission = function (req, res) {
    Sub.findByIdAndRemove(req.params.id, function (err) {
        if (err) res.json({ message: 'The member has not been deleted ', errmsg: err });else res.json({ message: ' Deleted!' });
    });
};
module.exports = router;