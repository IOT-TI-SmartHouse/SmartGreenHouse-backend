var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var schema = new Schema({
    user: {type: Schema.Types.ObjectId, required:true, ref: "UserAccount"},
    greenhouse: {type: Schema.Types.ObjectId, required:true, ref: "Greenhouse"},
},
{
    timestamps: true
});



schema.index({ user: 1, greenhouse: 1}, { unique: true });
const model = mongoose.model('GreenhouseAccess', schema);
module.exports = model;