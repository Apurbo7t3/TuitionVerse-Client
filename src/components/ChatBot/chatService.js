import { GoogleGenAI } from "@google/genai";

const API_KEY = import.meta.env.VITE_AI_KEY;

if (!API_KEY) {
  console.error("Missing VITE_AI_KEY in .env");
}

// Create client (no API key needed here – we pass it in the request header)
// But the SDK expects to read from env; we'll pass explicitly
const ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;

export const sendMessageToAI = async (userMessage) => {
  if (!ai || !API_KEY) {
    return "API key missing. Please check your .env file (VITE_AI_KEY).";
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userMessage,
    });

    // Response structure: response.text is the plain string answer
    const reply = response.text || "No content received.";

    console.log("Gemini reply:", reply.slice(0, 100));
    return reply;
  } catch (error) {
    console.error("Gemini error:", error);

    if (error.message?.includes("429")) {
      return "Quota exceeded. Please try again in a minute or enable billing.";
    }
    if (error.message?.includes("API key")) {
      return "Invalid API key. Get a new one from Google AI Studio.";
    }
    return `Error: ${error.message}`;
  }
};
