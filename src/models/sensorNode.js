var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var schema = new Schema({
    greenhouseDepartment: {type: Schema.Types.ObjectId, required: true, ref:"GreenhouseDepartment"},
    value: {type: Number, required: true},
    latitude: {type: Number},
    longitude: {type: Number}
},
{
    timestamps: true
});

module.exports = mongoose.model('SensorNode', schema);
