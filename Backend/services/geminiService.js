const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize with your API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateInterviewQuestions(domainData) {
  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: {
        maxOutputTokens: 4000,  // Increased for better responses
        temperature: 0.7,      // For more focused responses
        responseMimeType: "application/json"  // Explicitly request JSON
      }
    });
    
    const prompt = `You are an expert interview coach. Generate exactly 20 interview questions for ${domainData.jobTitle} position at ${domainData.companyName} 
    for a candidate with ${domainData.yearsOfExperience} years of experience. 
    
    STRICT REQUIREMENTS:
    1. Return ONLY valid JSON format
    2. Include exactly 6-8 skill categories strictly
    3. Each category should have 15 questions strictly
    4. Each answer should be 80-100 words
    5. Questions should match the experience level
    
    Example format:
    {
      "skills": [
        {
          "name": "Technical Skills",
          "questions": [
            {
              "question": "Question text here?",
              "answer": "Concise answer here (30-50 words)."
            }
          ]
        }
      ]
    }
    
    Current job details:
    - Company: ${domainData.companyName}
    - Position: ${domainData.jobTitle}
    - Experience: ${domainData.yearsOfExperience} years
    - Description: ${domainData.jobDescription || 'Not provided'}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    // Clean and parse response
    const text = response.text().trim();
    const cleanText = text.replace(/```json|```/g, '').trim();
    
    try {
      const parsed = JSON.parse(cleanText);
      
      // Validate structure
      if (!parsed.skills || !Array.isArray(parsed.skills)) {
        throw new Error("Invalid response structure");
      }
      
      return parsed;
    } catch (parseError) {
      console.error("Failed to parse response:", cleanText);
      throw new Error("Invalid JSON format from Gemini");
    }
    
  } catch (error) {
    console.error('Gemini API Error:', error);
    
    // Provide comprehensive fallback
    return {
      skills: [
        {
          name: "General Questions",
          questions: [
            {
              question: "What interests you about this position at " + domainData.companyName + "?",
              answer: "I'm excited about the opportunity to work at " + domainData.companyName + " because... [40 words]"
            },
            {
              question: "How does your experience align with this " + domainData.jobTitle + " role?",
              answer: "With my " + domainData.yearsOfExperience + " years of experience, I've developed... [45 words]"
            }
          ]
        }
      ]
    };
  }
}

module.exports = { generateInterviewQuestions };