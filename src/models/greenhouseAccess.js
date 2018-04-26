var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var schema = new Schema({
    _id: Schema.Types.ObjectId,
    userId: {type: Schema.Types.ObjectId, required:true, ref: "UserAccount"},
    greenhouseId: {type: Schema.Types.ObjectId, required:true, ref: "Greenhouse"},
},
{
    timestamps: true
});

module.exports = mongoose.model('GreenhouseAccess', schema);
