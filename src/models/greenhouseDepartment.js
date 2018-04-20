var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var schema = new Schema({
    greenhouse: {type: Number, required: true},
},
{
    timestamps: true
});

module.exports = mongoose.model('GreenhouseDepartment', schema);
