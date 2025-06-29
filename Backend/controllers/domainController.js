const Domain = require('../models/Domain');

const addDomain = async (req, res) => {
   try {
    const { userId, companyName, jobTitle, yearsOfExperience, jobDescription } = req.body;

    if (!userId || !companyName || !jobTitle || !yearsOfExperience || !jobDescription) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const validExperienceLevels = [
      '0-1 years (Entry Level)',
      '2-3 years (Junior)',
      '4-6 years (Mid-Level)',
      '7-10 years (Senior)',
      '10+ years (Expert)'
    ];
    
    if (!validExperienceLevels.includes(yearsOfExperience)) {
      return res.status(400).json({ 
        message: 'Invalid experience level',
        validOptions: validExperienceLevels
      });
    }

    const newDomain = new Domain({
      userId,
      companyName,
      jobTitle,
      yearsOfExperience,
      jobDescription
    });

    const savedDomain = await newDomain.save();
    res.status(201).json(savedDomain);
  } 
  catch (error) {
    console.error('Error adding domain:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


const getDomains = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const domains = await Domain.find({ userId }).sort({ createdAt: -1 });
    
    if (!domains || domains.length === 0) {
      return res.status(404).json({ message: 'No domains found for this user' });
    }

    res.status(200).json(domains);
  } 
  catch (error) {
    console.error('Error fetching domains:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
module.exports={addDomain,getDomains}