const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
      type: String, 
      required: true,
    },

    email: {
      type: String, 
      required: true},

    password: {
      type: String,
      required: true,
    },
});

UserSchema.pre('save', function (next) {
  const user = this;
  bcrypt.hash(user.password, 10, (err, hash) =>  {
    if (err) return next(err);
    user.password = hash;
    next();
  });
});
// Export the model
module.exports = mongoose.model('User', UserSchema);