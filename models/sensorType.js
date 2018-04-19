var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var schema = new Schema({
    name: {type: String, required:true},
},
{
    timestamps: true
});

module.exports = mongoose.model('SensorType', schema);
