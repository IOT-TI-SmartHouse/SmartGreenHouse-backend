var mongoose = require('mongoose');
var User = require('./user');

var schema = new Schema({
    name: {type: String, required:true},
},
{
    timestamps: true
});

module.exports = mongoose.model('SensorType', schema);
