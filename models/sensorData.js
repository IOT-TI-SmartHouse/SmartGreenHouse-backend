var mongoose = require('mongoose');
var User = require('./user');

var schema = new Schema({
    id: {type: Number, required: true},
    node: {type: Number, required: true},
    sensorType: {type: String, required: true},
    value: {type: Number, required: true}
},
{
    timestamps: true
});

module.exports = mongoose.model('SensorData', schema);
