const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  tasksCompleted: Number,
  badges: [String],
  sessionTime: Number
});

module.exports = mongoose.model('User', userSchema);
