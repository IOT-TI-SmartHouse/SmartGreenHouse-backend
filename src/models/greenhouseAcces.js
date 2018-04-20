var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var schema = new Schema({
    userId: {type: Number, required:true},
    greenhouseId: {type: Number, required:true},
},
{
    timestamps: true
});

module.exports = mongoose.model('GreenhouseAcces', schema);
