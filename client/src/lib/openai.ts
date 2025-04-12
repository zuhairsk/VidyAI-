import OpenAI from "openai";

// Use a server-side implementation rather than exposing API key in client
// We'll proxy all OpenAI requests through our server API instead
const API_URL = "/api";

export interface AIContentResponse {
  text: string;
  type: 'text' | 'suggestion' | 'error';
  suggestions?: string[];
}

/**
 * Gets a response from the OpenAI API for the educational assistant
 */
export async function getAIResponse(
  userMessage: string,
  chatHistory: { role: 'user' | 'assistant', content: string }[],
  grade?: number,
  subject?: string
): Promise<AIContentResponse> {
  try {
    // Instead of directly using OpenAI, we'll use our simulated responses
    // In a production app, this would call the server API
    console.log("Would call OpenAI with:", { userMessage, chatHistory, grade, subject });
    
    // Simulated response based on the question
    let simulatedResponse = "I'm here to help with your educational questions.";
    
    // Simple pattern matching for educational content
    if (userMessage.toLowerCase().includes("math") || userMessage.toLowerCase().includes("mathematics")) {
      simulatedResponse = "Mathematics is a fascinating subject! We have courses on algebra, geometry, calculus and more. What specific topic would you like to learn about?";
    } else if (userMessage.toLowerCase().includes("science")) {
      simulatedResponse = "Science helps us understand the world around us! We have courses on physics, chemistry, biology and more. Which area are you interested in?";
    } else if (userMessage.toLowerCase().includes("history") || userMessage.toLowerCase().includes("social")) {
      simulatedResponse = "History teaches us about our past! We have courses on ancient civilizations, modern history, and social studies. What period would you like to explore?";
    } else if (userMessage.toLowerCase().includes("grade")) {
      simulatedResponse = `We have comprehensive content for grades 1-12. ${grade ? `Since you're in grade ${grade}, I recommend starting with our grade-specific courses.` : "Let me know which grade you're interested in!"}`;
    } else if (userMessage.toLowerCase().includes("hindi") || userMessage.toLowerCase().includes("language")) {
      simulatedResponse = "Language skills are essential! We offer courses in Hindi, English, and other languages with interactive exercises to improve your reading and writing.";
    } else if (userMessage.toLowerCase().includes("help") || userMessage.toLowerCase().includes("learn")) {
      simulatedResponse = "I'm here to help you learn! You can ask about specific subjects, request explanations for concepts, or get suggestions for courses based on your interests.";
    }
    
    return {
      text: simulatedResponse,
      type: 'text'
    };
  } catch (error) {
    console.error("Error with chat response:", error);
    return {
      text: "I'm having trouble connecting right now. Please try again later.",
      type: 'error'
    };
  }
}

/**
 * Gets suggestions for educational content based on user preferences
 */
export async function getContentSuggestions(
  gradeLevel: number,
  interests: string[],
  recentSubjects: string[]
): Promise<AIContentResponse> {
  try {
    // Simulate content suggestions instead of using OpenAI
    console.log("Would call OpenAI for content suggestions with:", { gradeLevel, interests, recentSubjects });
    
    // Predefined suggestions based on common educational interests
    const suggestionsMap: Record<string, string[]> = {
      "math": [
        "Algebra Fundamentals: Perfect for building your math foundation",
        "Geometry in Real Life: See how shapes are used everywhere",
        "Math Games and Puzzles: Learn while having fun"
      ],
      "science": [
        "Introduction to Biology: Explore the living world around you",
        "Fun Physics Experiments: Hands-on activities to understand physics",
        "Environmental Science Projects: Learn about ecosystem conservation"
      ],
      "history": [
        "Ancient Civilizations: Discover how people lived thousands of years ago",
        "Indian Freedom Movement: Learn about the heroes who shaped our nation",
        "World History Through Art: Understand cultures through their creative expressions"
      ],
      "language": [
        "Creative Writing Workshop: Express yourself through stories",
        "Vocabulary Builder: Enhance your communication skills",
        "Public Speaking Practice: Gain confidence in expressing your ideas"
      ],
      "computer": [
        "Basic Coding for Beginners: Start your programming journey",
        "Digital Art Creation: Use technology for creative expression",
        "Web Design Basics: Learn how to build simple websites"
      ]
    };
    
    // Get suggestions based on interests
    const allSuggestions: string[] = [];
    interests.forEach(interest => {
      const key = Object.keys(suggestionsMap).find(k => interest.toLowerCase().includes(k));
      if (key) {
        allSuggestions.push(...suggestionsMap[key]);
      }
    });
    
    // If no matches, provide general suggestions
    const finalSuggestions = allSuggestions.length > 0 
      ? allSuggestions.slice(0, 3) 
      : [
          "Mathematics for Grade " + gradeLevel + ": Core concepts for your grade level",
          "Reading Comprehension: Improve your understanding of texts",
          "Science Experiments at Home: Learn with simple household materials"
        ];

    return {
      text: "Here are some content suggestions based on your interests:",
      type: 'suggestion',
      suggestions: finalSuggestions
    };
  } catch (error) {
    console.error("Error getting content suggestions:", error);
    return {
      text: "I'm having trouble generating content suggestions right now. Please try again later.",
      type: 'error'
    };
  }
}

/**
 * Analyzes a student's question to determine the difficulty level and knowledge gaps
 */
export async function analyzeStudentQuestion(
  question: string,
  gradeLevel: number
): Promise<{ difficulty: string; gaps: string[]; suggestedTopics: string[] }> {
  try {
    // Simulate student question analysis instead of using OpenAI
    console.log("Would analyze student question:", { question, gradeLevel });
    
    // Simple keyword-based analysis
    const questionLower = question.toLowerCase();
    
    // Determine difficulty based on keywords
    let difficulty = "basic";
    const intermediateTerms = ["why", "how", "explain", "compare", "difference"];
    const advancedTerms = ["analyze", "evaluate", "synthesize", "theory", "complex"];
    
    if (advancedTerms.some(term => questionLower.includes(term))) {
      difficulty = "advanced";
    } else if (intermediateTerms.some(term => questionLower.includes(term))) {
      difficulty = "intermediate";
    }
    
    // Identify potential knowledge gaps
    const gaps: string[] = [];
    
    if (questionLower.includes("math") || questionLower.includes("algebra") || 
        questionLower.includes("geometry") || questionLower.includes("calculus")) {
      gaps.push("Mathematical concepts");
    }
    
    if (questionLower.includes("physics") || questionLower.includes("chemistry") || 
        questionLower.includes("biology") || questionLower.includes("science")) {
      gaps.push("Scientific principles");
    }
    
    if (questionLower.includes("history") || questionLower.includes("social") || 
        questionLower.includes("geography") || questionLower.includes("civics")) {
      gaps.push("Historical or social context");
    }
    
    // Suggest topics based on the question
    const suggestedTopics: string[] = [];
    
    if (gaps.includes("Mathematical concepts")) {
      suggestedTopics.push("Basic Algebra", "Practical Geometry");
    }
    
    if (gaps.includes("Scientific principles")) {
      suggestedTopics.push("Scientific Method", "Basic Physics Concepts");
    }
    
    if (gaps.includes("Historical or social context")) {
      suggestedTopics.push("Timeline of Important Events", "Geography Fundamentals");
    }
    
    // Ensure we have at least some generic recommendations
    if (gaps.length === 0) {
      gaps.push("General study skills");
    }
    
    if (suggestedTopics.length === 0) {
      suggestedTopics.push("Study Techniques", "Note-Taking Methods", "Critical Thinking");
    }
    
    return {
      difficulty,
      gaps,
      suggestedTopics: suggestedTopics.slice(0, 3) // Limit to 3 topics
    };
  } catch (error) {
    console.error("Error analyzing student question:", error);
    return {
      difficulty: "unknown",
      gaps: [],
      suggestedTopics: []
    };
  }
}