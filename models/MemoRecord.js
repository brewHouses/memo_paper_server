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
  },
  status: {
    type: String,
    enum: ['not', 'done'],
    default: 'memo'
  },
  deadline: {
    type: Date,
  },
  stick: {
    type: Boolean,
    default: false
  },
  class: {
    type: String
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
