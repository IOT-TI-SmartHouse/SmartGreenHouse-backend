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
            this.find((error, greenhouses) => {
                if (error) {
                    reject(error);
                }
                resolve(greenhouses);
            })
        }, error => {
            if(!error) { // user is no admin
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
            }
        })
    })
};

module.exports = mongoose.model("Greenhouse", schema);
