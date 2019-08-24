const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  paragraphs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Paragraph'
  }]
}, {
  timestamps: true
})

module.exports = mongoose.model('Question', questionSchema)
