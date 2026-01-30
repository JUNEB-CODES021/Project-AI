import dotenv from "dotenv";
dotenv.config();   // 👈 MUST be first

console.log(
  process.env.GEMINI_API_KEY ? "GEMINI KEY LOADED" : "GEMINI KEY MISSING"
);

import express from "express";
import { runAgent } from "./agent/llmClient.js";
import { submit } from "./agent/submitAgent.js";

const app = express();
app.use(express.json());

app.post("/agent", async (req, res) => {
  const agentResponse = await runAgent(req.body.conversation);
  const submissionResult = submit(agentResponse.ad_payload);

  res.json({
    conversation: agentResponse.conversation,
    internal_reasoning: agentResponse.internal_reasoning,
    final_ad_payload: agentResponse.ad_payload,
    ...submissionResult
  });
});

app.listen(3000, () =>
  console.log("AI Agent running on port 3000")
);
