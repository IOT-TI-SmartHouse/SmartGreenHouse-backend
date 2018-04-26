var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var schema = new Schema({
        name: { type: String, required: true },
        greenhouse: {type: Schema.Types.ObjectId, required: true, ref: "Greenhouse"},
    active: {type: Boolean, required: true, default: true}
},
{
    timestamps: true
});


const UserAccount = require("userAccount");

schema.statics.all = function(userId, greenhouseId) {
    return new Promise((resolve, reject) => {
        UserAccount.verifyAdmin(userId).then(user => {
            console.log("user is admin, returning all greenhousesdepartments")
            this.find({greenhouse: greenhouseId, active: true}, (error, greenhouses) => {
                if (error) {
                    reject(error);
                }
                resolve(greenhouses);
            })
        }, error => {
            if(!error) { // user is no admin
                console.log("user is no admin, returning only selected greenhousesdepartments")
                GreenhouseAccess.find({ user: userId, greenhouse: greenhouseId }, (error, access) => {
                    if (error) {
                        reject(error);
                    }else {
                        if (!access) {
                            reject()
                        }else{
                            this.find({greenhouse: greenhouseId, active: true}, (error, greenhouses) => {
                                if (error) {
                                    reject(error);
                                }
                                resolve(greenhouses);
                            })
                        }
                    }
                });
            }
        })
    })
};

const GreenhouseAccess = require("greenhouseAccess")

schema.static.hasRights = function(departmentId, userId) {
    return new Promise((resolve, reject) => {
        UserAccount.verifyAdmin(userId).then(user => {
            resolve()
        }, error => {
            if(!error) {
                this.findById(departmentId).then(
                    department => {
                        GreenhouseAccess.findOne({greenhouse:department.greenhouse}).then(
                            access => {
                                if (access) {
                                    resolve();
                                } else {
                                    reject();
                                }
                            },
                            error => reject(error)
                        )
                    },
                    error => reject(error)
                )
            }else{
                reject(error)
            }
        })
    })
}

module.exports = mongoose.model('GreenhouseDepartment', schema);
