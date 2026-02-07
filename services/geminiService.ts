
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

const API_KEY = process.env.API_KEY || '';

export const getGeminiResponse = async (history: ChatMessage[], userMessage: string): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    const model = ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history.map(m => ({
          role: m.role === 'user' ? 'user' : 'model' as any,
          parts: [{ text: m.content }]
        })),
        { role: 'user', parts: [{ text: userMessage }] }
      ],
      config: {
        systemInstruction: `You are the Aaayafuj SMM AI Assistant. Your goal is to help users optimize their social media marketing strategies. 
        Provide expert advice on:
        1. Content engagement trends (IG Reels, TikTok trends).
        2. Optimal posting schedules.
        3. Hashtag strategy and SEO for video platforms.
        4. Interpreting SMM metrics (retention, click-through rates).
        Keep your tone professional, innovative, and slightly technical to reflect the 'Aaayafuj' brand. 
        Always mention that you are part of the Aaayafuj_SMM toolset.`,
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
      },
    });

    const response = await model;
    return response.text || "I apologize, but I couldn't generate a response at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error connecting to the Aaayafuj Intelligence core. Please check your API key.";
  }
};
