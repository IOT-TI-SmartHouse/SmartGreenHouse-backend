var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var schema = new Schema({
    userId: {type: Schema.Types.ObjectId, required:true, ref: "UserAccount"},
    greenhouseId: {type: Schema.Types.ObjectId, required:true, ref: "Greenhouse"},
},
{
    timestamps: true
});

schema.statics.hasAccess(greenhouseId, accountId) {

}

module.exports = mongoose.model('GreenhouseAccess', schema);
