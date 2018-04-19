var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var schema = new Schema({
    username: {type: String, required:true, unique: true},
    password: {type: String, required:true},
    isAdmin: {type: Boolean, required:true},
},
{
    timestamps: true
});

module.exports = mongoose.model('UserAccount', schema);
