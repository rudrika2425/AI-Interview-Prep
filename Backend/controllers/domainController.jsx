const Domain = require('../models/Domain');

addDomain = async (req, res) => {
  try {
    const { companyName, jobTitle, yearsOfExperience, jobDescription, userId } = req.body;
    
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const newDomain = new Domain({
      userId, // Now coming from request body
      companyName,
      jobTitle,
      yearsOfExperience,
      jobDescription
    });

    await newDomain.save();
    res.status(201).json(newQuestionSet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

getDomain = async (req, res) => {
  try {
    const { userId } = req.query;
    
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const questionSets = await Domain.find({ userId });
    res.json(questionSets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports={addDomain,getDomain};
