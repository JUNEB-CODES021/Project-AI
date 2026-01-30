import { GoogleGenerativeAI } from "@google/generative-ai";
import { SYSTEM_PROMPT } from "./systemPrompt.js";

/**
 * Mock fallback (used if Gemini fails or quota is hit)
 */
const MOCK_RESPONSE = {
  conversation: [
    "Campaign name: Mock Campaign",
    "Objective: Traffic",
    "Ad text: This is a mocked ad text",
    "CTA: Shop Now",
    "Music: None"
  ],
  internal_reasoning:
    "Mocked LLM response used due to Gemini API failure or quota limits.",
  ad_payload: {
    campaign_name: "Mock Campaign",
    objective: "Traffic",
    ad_text: "This is a mocked ad text",
    cta: "Shop Now",
    music_choice: "none",
    music_id: null
  }
};

export async function runAgent(conversation) {
  try {
    console.log("🧠 Calling Gemini API...");

    // Initialize Gemini client
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({
     model: "gemini-1.0-pro"
     });


    const prompt = `
${SYSTEM_PROMPT}

USER CONVERSATION:
${conversation.map(c => `- ${c.content}`).join("\n")}

Respond ONLY with valid JSON matching the required schema.
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    console.log("📩 Raw Gemini response:\n", text);

    // 🔴 IMPORTANT: Gemini often wraps JSON in text → extract safely
    const jsonStart = text.indexOf("{");
    const jsonEnd = text.lastIndexOf("}");

    if (jsonStart === -1 || jsonEnd === -1) {
      throw new Error("Gemini did not return valid JSON");
    }

    const jsonString = text.slice(jsonStart, jsonEnd + 1);
    return JSON.parse(jsonString);

  } catch (err) {
    console.error("❌ Gemini error:", err.message);
    console.warn("⚠️ Falling back to MOCK LLM response");

    return MOCK_RESPONSE;
  }
}
