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
  deadline: {
    type: Date,
  },
  class: {
    type: String,
    enum: ['study', 'life', 'other'],
    default: 'other'
  },
  position: {
    type: String
  },
  priority: {
    type: String,
    enum: ['high', 'normal', 'low'],
    default: 'normal'
  },
  top: {
    type: Boolean,
    default: false
  },
  comments: {
    type: String
  },
  status: {
    type: String,
    enum: ['not', 'done'],
    default: 'not'
  },

});

const MemoRecord = mongoose.model('MemoRecord', MemoRecordSchema);

module.exports = MemoRecord;
