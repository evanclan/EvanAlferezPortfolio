import { GoogleGenerativeAI } from "@google/generative-ai";

export const getGeminiResponse = async (prompt: string): Promise<string> => {
  if (!process.env.API_KEY) {
    console.warn("API_KEY missing in environment variables.");
    return "ERROR: API_KEY_MISSING. Environment variable not found. Cannot establish uplink to AI Core.";
  }

  try {
    // Initialize with the secure API key from env
    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.0-flash-exp',
      systemInstruction: "You are the AI mainframe for a elite hacker named 'Evan Alferez'. Your persona is cryptic, cool, highly technical, and slightly arrogant but helpful. You speak in terminal jargon, using terms like 'uplink established', 'packet received', 'decrypting...', etc. Keep answers concise and tech-focused. If asked about skills, mention React, TypeScript, Node.js, and Cybersec. If asked about the creator, say they are a ghost in the machine."
    });
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return text || "NO_DATA_RECEIVED: Neural Net returned empty packet.";
  } catch (error) {
    console.error("Gemini Uplink Failed:", error);
    return "CRITICAL_FAILURE: Connection to Neural Net interrupted. Check console for protocols.";
  }
};