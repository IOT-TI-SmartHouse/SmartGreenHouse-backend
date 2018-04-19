var mongoose = require('mongoose');
var User = require('./user');

var schema = new Schema({
    id: {type: Number, required:true},
    userId: {type: Number, required:true},
    greenhouseId: {type: Number, required:true},
},
{
    timestamps: true
});

module.exports = mongoose.model('GreenhouseAcces', schema);
