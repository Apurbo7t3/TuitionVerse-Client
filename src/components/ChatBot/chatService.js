import { puter } from "@heyputer/puter.js";

export const sendMessageToAI = async (userMessage) => {
  try {
    const response = await puter.ai.chat(userMessage);

    console.log("RAW RESPONSE:", response);

    //  DIRECT FIX (based on your real response)
    const replyText = response?.message?.content;

    if (!replyText) {
      return "No response from AI.";
    }

    return replyText; //  ALWAYS STRING
  } catch (error) {
    console.error("ERROR:", error);
    return "Error connecting to AI.";
  }
};
