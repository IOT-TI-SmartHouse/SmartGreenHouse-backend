var mongoose = require('mongoose');
var User = require('./user');

var schema = new Schema({
    id: {type: Number, required:true},
    username: {type: String, required:true, unique: true},
    password: {type: String, required:true},
    isAdmin: {type: Boolean, required:true},
},
{
    timestamps: true
});

module.exports = mongoose.model('UserAccount', schema);
