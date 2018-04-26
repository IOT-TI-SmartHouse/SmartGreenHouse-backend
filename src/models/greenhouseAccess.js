var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var schema = new Schema({
    user: {type: Schema.Types.ObjectId, required:true, ref: "UserAccount"},
    greenhouse: {type: Schema.Types.ObjectId, required:true, ref: "Greenhouse"},
},
{
    timestamps: true
});

module.exports = mongoose.model('GreenhouseAccess', schema);
