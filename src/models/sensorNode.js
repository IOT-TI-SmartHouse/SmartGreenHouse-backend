var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var schema = new Schema({
    name: { type: String, required: true },
    greenhouseDepartment: {type: Schema.Types.ObjectId, required: true, ref:"GreenhouseDepartment"},
    latitude: {type: Number},
    longitude: {type: Number}
},
{
    timestamps: true
});

const GreenhouseDepartment = require("../models/greenhouseDepartment")

schema.statics.canEdit = function (nodeId, userId) {
    return new Promise((resolve, reject) => {
        this.findById(nodeId).then(
            node => {
                GreenhouseDepartment.canEdit(node.greenhouseDepartment).then(
                    _ => resolve(),
                    error => reject(error)
                )
            },
            error => reject(error)
        )
    })
}

module.exports = mongoose.model('SensorNode', schema);
