var mongoose = require('mongoose');
var User = require('./user');

var schema = new Schema({
    id: {type: Number, required: true},
    greenhouseDepartment: {type: Number, required: true},
    value: {type: Number, required: true}
},
{
    timestamps: true
});

module.exports = mongoose.model('SensorNode', schema);
