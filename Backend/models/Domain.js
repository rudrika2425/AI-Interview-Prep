const mongoose=require('mongoose');

const domainSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  companyName: { type: String, required: true },
  jobTitle: { type: String, required: true },
  yearsOfExperience: { type: String, required: true },
  jobDescription: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

 module.exports=mongoose.model('Domain',domainSchema);

