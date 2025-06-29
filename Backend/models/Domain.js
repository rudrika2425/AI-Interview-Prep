const mongoose = require('mongoose');

const domainSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  companyName: { type: String, required: true },
  jobTitle: { type: String, required: true },
  yearsOfExperience: { 
    type: String, 
    required: true,
    enum: [
      '0-1 years (Entry Level)',
      '2-3 years (Junior)',
      '4-6 years (Mid-Level)',
      '7-10 years (Senior)',
      '10+ years (Expert)'
    ],
    default: '0-1 years (Entry Level)'
  },
  jobDescription: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Domain', domainSchema);