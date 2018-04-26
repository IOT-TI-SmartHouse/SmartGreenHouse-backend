var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var schema = new Schema({
    greenhouse: {type: Schema.Types.ObjectId, required: true, ref: "Greenhouse"},
},
{
    timestamps: true
});

module.exports = mongoose.model('GreenhouseDepartment', schema);
