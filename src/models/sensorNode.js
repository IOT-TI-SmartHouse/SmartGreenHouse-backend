var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var schema = new Schema({
    name: { type: String, required: true },
    greenhouseDepartment: {type: Schema.Types.ObjectId, required: true, ref:"GreenhouseDepartment"},
    latitude: {type: Number},
    longitude: {type: Number}
},
{
    timestamps: true
});

module.exports = mongoose.model('SensorNode', schema);
