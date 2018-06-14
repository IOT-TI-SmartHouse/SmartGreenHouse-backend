var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var schema = new Schema({
    node: {type: Schema.Types.ObjectId, required: true, ref:"SensorNode"},
    sensorType: {type: String, required: true},
    value: {type: Number, required: true}
},
{
    timestamps: true
});

module.exports = mongoose.model('SensorData', schema);
