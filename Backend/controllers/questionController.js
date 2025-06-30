// controllers/questionController.js
const Question = require('../models/Questions');
const Domain = require('../models/Domain');
const { generateInterviewQuestions } = require('../services/geminiService');
const mongoose=require("mongoose");

// Get or generate questions for a domain
const getDomainQuestions = async (req, res) => {
  try {
    const { domainId } = req.params;
    const { userId } = req.query;
    console.log(userId);
    // First check cache/database
    let questions = await Question.findOne({ domainId, userId });
    if (questions) return res.json(questions);
     
    // Get domain details
    const domain = await Domain.findById(domainId);
    if (!domain) {
      return res.status(404).json({ message: 'Domain not found' });
    }

    // Generate questions
    let generatedData;
    try {
      generatedData = await generateInterviewQuestions(domain);
    } catch (error) {
      if (error.message.includes('Invalid response format')) {
        // Provide fallback questions
        generatedData = {
          skills: [{
            name: "General",
            questions: [{
              question: "What interested you about this position?",
              answer: "Fallback answer about position interest"
            }]
          }]
        };
      } else {
        throw error;
      }
    }

    // Save to database
    questions = new Question({
      domainId,
      userId,
      skills: generatedData.skills
    });
    await questions.save();

    res.json(questions);
  } catch (error) {
    console.error('Error:', error);
    res.status(error.status || 500).json({ 
      message: error.message || 'Server error'
    });
  }
};

// Pin/unpin a question
// controllers/questionController.js
const togglePinQuestion = async (req, res) => {
  try {
    const { domainId, skillIndex, questionIndex } = req.params;
    const userId = req.body.userId || req.user?.id; // Support both auth methods

    if (!userId) {
      return res.status(401).json({ message: 'User ID required' });
    }

    // Find the question document by domainId and userId
    const questionDoc = await Question.findOne({ 
      domainId,
      userId 
    });

    if (!questionDoc) {
      return res.status(404).json({ message: 'Question set not found' });
    }

    // Validate indices
    if (!questionDoc.skills[skillIndex] || 
        !questionDoc.skills[skillIndex].questions[questionIndex]) {
      return res.status(400).json({ message: 'Invalid question index' });
    }

    // Toggle pin status
    questionDoc.skills[skillIndex].questions[questionIndex].isPinned = 
      !questionDoc.skills[skillIndex].questions[questionIndex].isPinned;
    
    questionDoc.markModified('skills'); // Mark array as modified
    await questionDoc.save();

    res.json({
      success: true,
      updatedDoc: questionDoc
    });
    
  } catch (error) {
    console.error('Error pinning question:', error);
    res.status(500).json({ 
      message: 'Server error',
      error: error.message 
    });
  }
};


// controllers/questionController.js
const getPinnedQuestions = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ 
        success: false,
        message: 'User ID is required as a query parameter' 
      });
    }

    // Find all question documents for the user
    const questionDocs = await Question.find({ userId }).lean();

    if (!questionDocs || questionDocs.length === 0) {
      return res.status(404).json({ 
        success: false,
        message: 'No questions found for this user' 
      });
    }

    // Filter and format pinned questions
    const pinnedQuestions = questionDocs.flatMap(doc => {
      return doc.skills.flatMap((skill, skillIdx) => {  // Add skill index
        return skill.questions
          .filter(q => q.isPinned)
          .map((q, qIdx) => ({  // Add question index
            domainId: doc.domainId,
            skillCategory: skill.name,
            skillIndex: skillIdx,  // Include skillIndex
            questionIndex: qIdx,   // Include questionIndex
            question: q.question,
            answer: q.answer,
            pinnedAt: doc.lastUpdated
          }));
      });
    });

    if (pinnedQuestions.length === 0) {
      return res.status(404).json({ 
        success: false,
        message: 'No pinned questions found for this user' 
      });
    }

    res.status(200).json({
      success: true,
      count: pinnedQuestions.length,
      pinnedQuestions
    });

  } catch (error) {
    console.error('Error fetching pinned questions:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error while fetching pinned questions',
      error: error.message 
    });
  }
};



const unpinQuestion = async (req, res) => {
  try {
    const { domainId, skillIndex, questionIndex } = req.params;
    const {userId }= req.query;

    // Validate inputs
    if (!mongoose.Types.ObjectId.isValid(domainId)) {
      return res.status(400).json({ success: false, message: 'Invalid domain ID' });
    }

    if (!userId) {
      return res.status(401).json({ success: false, message: 'User ID required' });
    }

    if (isNaN(skillIndex) || isNaN(questionIndex)) {
      return res.status(400).json({ success: false, message: 'Invalid skill or question index' });
    }

    // Find the question document
    const questionDoc = await Question.findOne({ 
      domainId,
      userId 
    });

    if (!questionDoc) {
      return res.status(404).json({ success: false, message: 'Question set not found' });
    }

    // Validate indices
    if (!questionDoc.skills[skillIndex] || !questionDoc.skills[skillIndex].questions[questionIndex]) {
      return res.status(400).json({ success: false, message: 'Invalid question index' });
    }

    // Unpin the question (set isPinned to false)
    questionDoc.skills[skillIndex].questions[questionIndex].isPinned = false;
    questionDoc.markModified('skills');
    await questionDoc.save();

    res.status(200).json({
  success: true,
  message: 'Question unpinned successfully',
  updatedQuestion: questionDoc.skills[skillIndex].questions[questionIndex]
});


  } catch (error) {
    console.error('Error unpinning question:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error while unpinning question',
      error: error.message 
    });
  }
};

module.exports = {
  getDomainQuestions,
  togglePinQuestion,
  getPinnedQuestions,
  unpinQuestion
};



