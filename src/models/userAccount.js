var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var schema = new Schema({
    username: {type: String, required:true, unique: true},
    password: {type: String, required:true},
    isAdmin: {type: String }
},
{
    timestamps: true
});

module.exports = mongoose.model('UserAccount', schema);
