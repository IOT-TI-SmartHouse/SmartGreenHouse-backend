var mongoose = require('mongoose');
var User = require('./user');

var schema = new Schema({
    id: {type: Number, required:true},
    name: {type: String, required:true},
    location: {type: String, required:true},
},
{
    timestamps: true
});

module.exports = mongoose.model('Greenhouse', schema);
