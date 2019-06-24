const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  /*
   * We just support one papaer for one user
   * and the user must input the papaer id when register
  */
  paper_id: {
    type: String,
    required: true
  },
  mode: {
    type: String,
    enum: ['memo', 'weather', 'clock'],
    default: 'memo'
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
