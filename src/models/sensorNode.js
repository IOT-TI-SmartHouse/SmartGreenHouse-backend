var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var schema = new Schema({
    _id: Schema.Types.ObjectId,
    greenhouseDepartment: {type: Schema.Types.ObjectId, required: true, ref:"GreenhouseDepartment"},
    value: {type: Number, required: true}
},
{
    timestamps: true
});

module.exports = mongoose.model('SensorNode', schema);
