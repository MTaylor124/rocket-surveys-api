const mongoose = require('mongoose')

const openResponseSchema = new mongoose.Schema({
  answer: {
    type: String
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  openSurvey: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'OpenSurvey',
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('OpenResponse', openResponseSchema)
