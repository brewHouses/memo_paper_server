const mongoose = require('mongoose');

const MemoRecordSchema = new mongoose.Schema({
  // identifies user
  email: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  record: {
    type: String,
    required: true
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
