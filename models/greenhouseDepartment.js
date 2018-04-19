var mongoose = require('mongoose');
var User = require('./user');

var schema = new Schema({
    id: {type: Number, required: true},
    greenhouse: {type: Number, required: true},
},
{
    timestamps: true
});

module.exports = mongoose.model('GreenhouseDepartment', schema);
