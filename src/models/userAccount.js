var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var schema = new Schema({
    username: {type: String, required:true, unique: true},
    password: {type: String, required:true},
    isAdmin: {type: Boolean, default:false }
},
{
    timestamps: true
});

schema.statics.verifyAdmin = function(accountId) {
    return new Promise((resolve, reject) => {
        this.findById(accountId, function(err, user) {
            // console.log(user);
            if(err){
                reject(err);
            } else {
                if (user.isAdmin) {
                    resolve(user)
                } else {
                    reject()
                }
            }
        });
    })
};

module.exports = mongoose.model('UserAccount', schema);
