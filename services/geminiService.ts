
import { GoogleGenAI } from "@google/genai";
import { Word } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getMnemonicForWord = async (word: Word): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Create a simple, fun mnemonic to help me remember the Japanese word "${word.kanji}" (${word.kana} / ${word.romaji}), which means "${word.meaning}". Keep it under 50 words.`,
      config: {
        temperature: 0.7,
      }
    });
    return response.text || "Could not generate mnemonic at this time.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Failed to connect to AI for mnemonics.";
  }
};

export const getGrammarUsage = async (word: Word): Promise<string> => {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Provide 1 simple example sentence in Japanese using the word "${word.kanji}" (${word.meaning}), including its reading and English translation.`,
        config: {
          temperature: 0.5,
        }
      });
      return response.text || "No usage example available.";
    } catch (error) {
      return "Unable to fetch usage example.";
    }
};
