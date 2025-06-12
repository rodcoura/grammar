import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { GEMINI_MODEL_NAME } from '../constants';

const API_KEY = process.env.API_KEY;

let ai: GoogleGenAI | null = null;

const getGenAIClient = (): GoogleGenAI => {
  if (!API_KEY) {
    // This specific error message can be caught and translated in App.tsx
    throw new Error("API key is invalid or missing. Please check your configuration.");
  }
  if (!ai) {
    ai = new GoogleGenAI({ apiKey: API_KEY });
  }
  return ai;
};

export const correctGrammarAndTranslate = async (
  text: string,
  targetLanguage: string
): Promise<string> => {
  if (!text.trim()) {
    return ""; 
  }

  // Limit the input text to maximum 1000 characters
  const inputText = text.length > 1000 ? text.substring(0, 1000).trim() : text;

  const genAI = getGenAIClient();

  const prompt = `
You are an advanced AI language assistant. Your primary task is to process user input text based on their selected target language.

Selected Target Language: ${targetLanguage}

User Input Text:
\`\`\`
${inputText}
\`\`\`

Instructions:
1. Analyze the User Input Text.
2. If the User Input Text is already in the ${targetLanguage}, correct any grammatical errors, improve clarity, fix spelling mistakes, and ensure it sounds natural and fluent.
3. If the User Input Text is in a language different from ${targetLanguage}, first accurately translate it into ${targetLanguage}. Then, correct any grammatical errors in the translated text, improve its clarity, fix spelling mistakes, and ensure it sounds natural and fluent in ${targetLanguage}.
4. Provide ONLY the final, polished text in ${targetLanguage} as your response. Do not include any preambles, apologies, or self-references like "As an AI...". Do not use markdown formatting in your response.
5. If the input text is too short, nonsensical, or impossible to correct/translate meaningfully (e.g., just symbols or random characters), return a brief, polite note in ${targetLanguage} stating that the input is unclear or insufficient. For example: "Input is unclear or too short to process." or "Please provide more context." The specific note should be in ${targetLanguage}.
`;

  try {
    const response: GenerateContentResponse = await genAI.models.generateContent({
      model: GEMINI_MODEL_NAME,
      contents: prompt,
    });
    
    let resultText = response.text ?? '';
    
    const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
    const match = resultText.match(fenceRegex);
    if (match && match[2]) {
      resultText = match[2].trim();
    }
    
    return resultText.trim();

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        // These messages will be caught by App.tsx and translated using translateError function
        if (error.message.includes("API key not valid") || error.message.includes("API_KEY_INVALID") || error.message.includes("API key is invalid or missing")) {
             throw new Error("API key is invalid or missing. Please check your configuration.");
        }
        if (error.message.includes("quota")) {
            throw new Error("API quota exceeded. Please try again later or check your API plan.");
        }
    }
    // Generic error for other cases
    throw new Error("Failed to process text. The AI service may be temporarily unavailable or encountered an issue.");
  }
};
