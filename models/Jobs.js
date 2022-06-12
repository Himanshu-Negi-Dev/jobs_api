const mongoose = require('mongoose');

const jobsSchema = new mongoose.Schema({
  company: {
    type: String,
    required: [true, 'Please provide company'],
  },

  position: {
    type: String,
    required: [true, 'Please provide position'],
    maxlength: 100,
  },

  status: {
    type: String,
    enum: ['interview', 'declined', 'pending'],
    default: 'pending',
  },

  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, "please provide user info"]
  }
})

module.exports = mongoose.model('Job', jobsSchema);