var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var schema = new Schema({
    greenhouseDepartment: {type: Number, required: true},
    value: {type: Number, required: true}
},
{
    timestamps: true
});

module.exports = mongoose.model('SensorNode', schema);
