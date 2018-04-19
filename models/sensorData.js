var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var schema = new Schema({
    node: {type: Number, required: true},
    sensorType: {type: String, required: true},
    value: {type: Number, required: true}
},
{
    timestamps: true
});

module.exports = mongoose.model('SensorData', schema);
