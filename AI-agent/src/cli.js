import readline from "readline";
import { adState } from "./agent/stateStore.js";
import { nextQuestion } from "./agent/conversationFlow.js";
import { submit } from "./agent/submitAgent.js";

// Readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Store full conversation for printing
const conversationLog = [];

// Save answers into state based on question
function saveAnswer(question, answer) {
  if (question.toLowerCase().includes("campaign name")) {
    adState.campaign_name = answer;
  } else if (question.toLowerCase().includes("objective")) {
    adState.objective =
      answer.toLowerCase().includes("conversion")
        ? "Conversions"
        : "Traffic";
  } else if (question.toLowerCase().includes("ad text")) {
    adState.ad_text = answer;
  } else if (question.toLowerCase().includes("cta")) {
    adState.cta = answer;
  } else if (question.toLowerCase().includes("music choice")) {
    if (answer.toLowerCase().includes("existing")) {
      adState.music_choice = "existing";
    } else if (answer.toLowerCase().includes("upload")) {
      adState.music_choice = "upload";
    } else {
      adState.music_choice = "none";
    }
  } else if (question.toLowerCase().includes("music id")) {
    adState.music_id = answer;
  }
}

// Main conversational loop
function askNext() {
  const question = nextQuestion(adState);

  // All questions completed → submit
  if (!question) {
    console.log("\n🗣️  FULL CONVERSATION:\n");

    conversationLog.forEach((turn, index) => {
      console.log(`${index + 1}. 🤖 ${turn.agent}`);
      console.log(`   👤 ${turn.user}\n`);
    });

    console.log("📦 FINAL AD PAYLOAD:\n");
    console.log(JSON.stringify(adState, null, 2));

    console.log("\n🚀 SUBMISSION RESULT:\n");
    const result = submit(adState);
    console.log(JSON.stringify(result, null, 2));

    rl.close();
    return;
  }

  // Ask next question
  rl.question(`🤖 ${question}\n> `, answer => {
    conversationLog.push({
      agent: question,
      user: answer
    });

    saveAnswer(question, answer);
    askNext();
  });
}

// Start CLI agent
console.log("🚀 TikTok Ads AI Agent (CLI Mode)\n");
askNext();
