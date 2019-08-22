const mongoose = require('mongoose')

const openSurveySchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
    unique: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  openresponses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'OpenResponse'
  }]
}, {
  timestamps: true
})

module.exports = mongoose.model('OpenSurvey', openSurveySchema)
