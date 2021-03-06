var mongoose = require("mongoose");
const Schema = mongoose.Schema;

var schema = new Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

const GreenhouseAccess = require("./greenhouseAccess");

schema.methods.hasAccess = function(userId) {
  return new Promise((resolve, reject) => {
    GreenHouseAccess.find(
      { userId: userId, greenhouseId: this._id },
      (greenhouse, error) => {
        if (error) {
          reject(error);
        }
        resolve();
      }
    );
  });
};

const UserAccount = require("./userAccount")

schema.statics.all = function(userId) {
    return new Promise((resolve, reject) => {
        UserAccount.verifyAdmin(userId).then(user => {
            console.log("user is admin, returning all greenhouses")
            this.find((error, greenhouses) => {
                if (error) {
                    reject(error);
                }
                resolve(greenhouses);
            })
        }, error => {
            if(!error) { // user is no admin
                console.log("user is no admin, returning only selected greenhouses")
                GreenhouseAccess.find({ user: userId })
                    .populate("greenhouse")
                    .exec((error, greenhouses) => {
                    if (error) {
                        reject(error);
                    }
                    const convered_greenhouses = [];
                    for(var greenhouse of greenhouses) {
                        convered_greenhouses.push(greenhouse.greenhouse)
                    }
                    resolve(convered_greenhouses);
                });
            } else {
                reject(error);
            }
        })
    })
};

schema.statics.allUser = function(userId, greenhouseId) {
    console.log("Get all users of", greenhouseId)
    return new Promise((resolve, reject) => {
        UserAccount.verifyAdmin(userId).then(user => {
            GreenhouseAccess.find({greenhouse: greenhouseId }).populate("user", { password: 0 }).exec((error, users) => {
                if (error) {
                    reject(error);
                    return;
                }
                const solved_users = [];
                for(let user of users){
                    solved_users.push(user.user)
                }
                UserAccount.find({isAdmin: 1}, { password: 0 }).then(admin_users => {
                    resolve(solved_users.concat(admin_users));
                }, error => reject(error))
            })
        }, error => {
            if(!error) { // user is no admin
                reject('no admin')
            } else {
                reject(error);
            }
        })
    })
}
module.exports = mongoose.model("Greenhouse", schema);
