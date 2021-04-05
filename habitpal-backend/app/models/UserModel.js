const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/AuthConfig.js');
const SALT = 10;
const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true,'The email field is required!'],
    trim: true,
    unique: 1
  },
  password: {
    type: String,
    required: [true,'The password field is required!'],
    minlength: 5
  },
  username: {
    type: String,
    required: [true,'The username field is required!'],
    trim: true,
    maxlength: 20
  },
  token: {
    type: String
  },
  habits: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Habit' }]
});

//saving user data
userSchema.pre('save', function (next) {
  var user = this;
  if (user.isModified('password')) {//checking if password field is available and modified
    bcrypt.genSalt(SALT, function (err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

//for comparing the users entered password with database during login 
userSchema.methods.comparePassword = function (candidatePassword, callBack) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) {
      return callBack(err);
    }
    callBack(null, isMatch);
  });
}

//for generating token when loggedin
userSchema.methods.generateToken = function (callBack) {
  var user = this;
  var token = jwt.sign(user._id.toHexString(), config.secret);
  user.token = token;
  user.save(function (err, user) {
    if (err) {
      return callBack(err)
    }
    callBack(null, user)
  });
};

//validating token for auth routes middleware
userSchema.statics.findByToken = function (token, callBack) {
  var user = this;
  jwt.verify(token, config.secret, function (err, decode) {//this decode must give user_id if token is valid .ie decode=user_id

    user.findOne({ '_id': decode, 'token': token }, function (err, user) {
      if (err) {
        return callBack(err);
      }
      callBack(null, user);
    });
  });
};

const User = mongoose.model('User', userSchema);
module.exports = { User }