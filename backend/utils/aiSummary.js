const dotenv = require('dotenv');
const path = require('path');

// Load .env explicitly (ensure correct path if needed)
dotenv.config({ path: path.resolve(__dirname, '../.env') });
const { GoogleGenerativeAI } = require("@google/generative-ai");

const AI_API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(AI_API_KEY);

const aiSummary = async (reviews) => {
  try {
    console.log("✅ Running AI Model to Generate Summary...");
    console.log('Your API key:', AI_API_KEY);

    // Use the latest version of the model
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash", // or "gemini-2.0-flash" for faster responses
    });

    const generationConfig = {
      temperature: 0.7, // Balanced creativity
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 8192,
    };

    // Start Chat Session for Better Summarization
    const chatSession = model.startChat({
      generationConfig,
      history: [], // Optional, can add context if needed
    });

    // Prepare Review Summary Prompt
    const prompt = `Summarize the following customer reviews for a product in a concise and informative manner:\n\n${reviews}`;

    // Send message and get response
    const result = await chatSession.sendMessage(prompt);
    const summary = result.response.text();

    // Return the generated summary
    return summary || "No summary generated.";
  } catch (error) {
    console.error("❌ Error generating AI summary:", error.message);
    return "Unable to generate summary due to AI error.";
  }
};

module.exports = aiSummary;
