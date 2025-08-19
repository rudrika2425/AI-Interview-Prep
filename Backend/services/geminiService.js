const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize with your API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateInterviewQuestions(domainData) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        maxOutputTokens: 4000,
        temperature: 0.7,
        responseMimeType: "application/json",
      },
    });

    const prompt = `You are an expert interview coach. Generate exactly 30 interview questions for ${
      domainData.jobTitle
    } position at ${domainData.companyName} 
    for a candidate with ${
      domainData.yearsOfExperience
    } years of experience. Respond ONLY with a **valid JSON string** in the format below. Do NOT include code blocks, comments, or explanations.

    STRICT REQUIREMENTS:
    1. Return ONLY valid JSON format
    2. Include exactly 6-8 skill categories
    3. Each category should have 5 questions
    4. Each answer should be 80-100 words
    5. Questions should match the experience level

    JSON Format:
    {
      "skills": [
        {
          "name": "Skill Name",
          "questions": [
            {
              "question": "Question text?",
              "answer": "Answer (80-100 words)."
            }
          ]
        }
      ]
    }

    Current job details:
    - Company: ${domainData.companyName}
    - Position: ${domainData.jobTitle}
    - Experience: ${domainData.yearsOfExperience} years
    - Description: ${domainData.jobDescription || "Not provided"}`;

    // Use generateContent with proper error handling
    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    if (!response || !response.text) {
      throw new Error("Empty response from Gemini API");
    }

    const text = response.text();
    let jsonString = text;

    // Try to extract JSON if it's wrapped in markdown or tags
    const jsonMatch = text.match(/{[\s\S]*}/);
    if (jsonMatch) {
      jsonString = jsonMatch[0];
    }

    // Clean the JSON string
    jsonString = jsonString
      .replace(/```json|```/g, "")
      .replace(/<json_output>|<\/json_output>/g, "")
      .trim();

    try {
      const parsed = JSON.parse(jsonString);

      // Validate structure
      if (!parsed.skills || !Array.isArray(parsed.skills)) {
        throw new Error("Response missing required skills array");
      }

      // Validate each skill has questions
      for (const skill of parsed.skills) {
        if (!skill.questions || !Array.isArray(skill.questions)) {
          throw new Error(`Skill "${skill.name}" missing questions array`);
        }
      }

      return parsed;
    } catch (parseError) {
      console.error("Failed to parse response:", jsonString);
      throw new Error(`Invalid JSON format from Gemini: ${parseError.message}`);
    }
  } catch (error) {
    console.error("Gemini API Error:", error.message);
    
    // Enhanced fallback response
    const fallbackQuestions = [];
    const skillCategories = [
      "Technical Skills",
      "Behavioral Questions",
      "Problem Solving",
      "Teamwork & Collaboration",
      "Leadership Experience",
      "Company-Specific Knowledge"
    ];

    for (const category of skillCategories) {
      const questions = [];
      for (let i = 1; i <= 5; i++) {
        questions.push({
          question: `Sample ${category} question ${i} for ${domainData.jobTitle} at ${domainData.companyName}?`,
          answer: `This is a sample answer for ${category} question ${i}. With ${domainData.yearsOfExperience} years of experience, a candidate would typically discuss relevant examples and skills that demonstrate their proficiency in this area. The response should be 80-100 words focusing on specific achievements and how they relate to the position.`
        });
      }
      fallbackQuestions.push({
        name: category,
        questions
      });
    }

    return {
      skills: fallbackQuestions
    };
  }
}

module.exports = { generateInterviewQuestions };