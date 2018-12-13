'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var schema = mongoose.Schema;
var userSchema = new schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    location: { type: String, required: true },
    workID: { type: String, required: true }
}, { collection: 'user' });
userSchema.methods.hashPassword = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};
userSchema.methods.comparePassword = function (password, hash) {
    return bcrypt.compareSync(password, hash);
};
module.exports = mongoose.model('users', userSchema, 'users');