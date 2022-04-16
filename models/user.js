const mongoose = require('../db/connection');

const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String

},{timestamps: true});

const Users = mongoose.model('users', UserSchema);

module.exports = Users;