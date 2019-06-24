const mongoose = require('mongoose');

const UserConfigSchema = new mongoose.Schema({
  // email identifies the user
  email: {
    type: String,
    required: true
  },
  mode: {
    type: String,
    enum: ['memo', 'weather', 'clock'],
    default: 'memo'
  },
  font_size: {
    type: Number,
    default: 18
  },
  weather_update_time: {
    type: Number,
    // default is 1h
    default: 1
  },
  memo_update_time: {
    type: Number,
    // default is 1 minute
    default: 1
  }
});

const UserConfig = mongoose.model('User', UserConfigSchema);

module.exports = UserConfig;
