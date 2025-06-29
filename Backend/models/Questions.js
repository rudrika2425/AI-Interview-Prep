// models/Question.js
const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  domainId: { type: mongoose.Schema.Types.ObjectId, ref: 'Domain', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  skills: [{
    name: { type: String, required: true },
    questions: [{
      question: { type: String, required: true },
      answer: { type: String, required: true },
      isPinned: { type: Boolean, default: false },
      createdAt: { type: Date, default: Date.now }
    }]
  }],
  generatedAt: { type: Date, default: Date.now },
  lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Questions', questionSchema);