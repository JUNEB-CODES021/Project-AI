# 🎯 TikTok Ads AI Agent  
### CLI-Based Conversational Workflow

A **production-style AI workflow** that conversationally builds and submits TikTok Ads using **deterministic business rules**, **mocked APIs**, and a **CLI-based agent**.

This project focuses on **correct rule enforcement, prompt design, and resilient API handling** — not UI or scaling.

---

## 🚀 What This Project Does

This AI agent:

- Conversationally collects TikTok ad inputs via **CLI**
- Enforces TikTok Ads business rules **before submission**
- Handles **music logic correctly** (primary evaluation area)
- Produces a **validated ad payload**
- Submits ads to a **mocked TikTok Ads API**
- Gracefully handles **LLM and API failures**
- Prints the **full conversation, payload, and final decision**

---

## 🧠 Key Design Principles

### Conversation ≠ Validation
The conversation happens interactively, while validation is fully deterministic.

### Rule-First, API-Second
Invalid ads are blocked **before** any API call is made.

### Resilient to Unreliable APIs
If the LLM (Gemini) fails or returns malformed output, the system falls back to a mocked response.

### No UI Required
A CLI agent is used for clarity, testability, and demo friendliness.

---

## 🏗️ Architecture Overview

CLI (readline)
↓
Conversation Flow (State Machine)
↓
Business Rules Engine
↓
Music Logic (Case A / B / C)
↓
Mock TikTok Ads API
↓
Submission Decision

---

## 📂 Project Structure

src/
├── main.js              # CLI entry point
├── agent.js             # Core AI agent + conversation orchestration
├── prompts.js           # LLM system + user prompt templates
├── state.js             # Conversation / ad state management
├── validators.js        # Business rules + validation logic
├── musicRules.js        # Music-specific rules (separated for clarity)
├── tiktokAuth.js        # OAuth flow (mocked)
├── tiktokApi.js         # TikTok Ads API client (mocked)
├── llmClient.js         # Gemini integration with fallback
├── errorInterpreter.js  # API / validation error handling
└── config.js            # Configuration & constants


---

## 🔑 Tech Stack

- **Language:** JavaScript (Node.js, ES Modules)
- **LLM:** Google Gemini (with mocked fallback)
- **Backend:** CLI-based (no UI)
- **APIs:** Mocked TikTok Ads API
- **State Management:** In-memory state machine

---

## 🔐 Environment Variables

Create a `.env` file in the project root:

```env
GEMINI_API_KEY=AIzaSyXXXXXXXXXXXX
TIKTOK_CLIENT_ID=mock_client_id
TIKTOK_CLIENT_SECRET=mock_secret
TikTok credentials are mocked by design.

▶️ How to Run the Agent

1️⃣ Install dependencies
npm install

2️⃣ Start the CLI agent
node src/cli.js

Or (recommended):
npm run cli

🗣️ Example CLI Conversation

🚀 TikTok Ads AI Agent (CLI Mode)

🤖 What is your campaign name?
> Winter Sale

🤖 Choose objective: Traffic or Conversions
> Conversions

🤖 Enter ad text (max 100 characters)
> 50% off today

🤖 Enter CTA (e.g., Shop Now)
> Shop Now

🤖 Music choice? (existing / upload / none)
> upload

📦 Output (Printed Automatically)
Full Conversation

1. Campaign name → Winter Sale
2. Objective → Conversions
3. Ad text → 50% off today
4. CTA → Shop Now
5. Music → Upload

Final Ad Payload

{
  "campaign_name": "Winter Sale",
  "objective": "Conversions",
  "ad_text": "50% off today",
  "cta": "Shop Now",
  "music_choice": "upload",
  "music_id": "mock_music_1729"
}

Submission Result
{
  "submission_decision": "allow",
  "ad_id": "mock_ad_123"
}
🎵 Music Logic (Primary Evaluation Area)
Case A — Existing Music ID
Prompts for Music ID
Validates via mocked API
Explains failure if rejected

Case B — Uploaded Music
Simulates upload
Generates mock music_id
Validates before submission

Case C — No Music
✅ Allowed only for Traffic
❌ Blocked for Conversions before submission
❌ Error Handling & Reasoning

The agent interprets and explains:

Invalid campaign input
Missing required fields
Invalid music ID
Geo-restriction (mocked)
OAuth issues (mocked)
LLM failure or malformed output
Errors are never returned raw — they are translated into clear explanations and suggested actions.

🤖 LLM Strategy (Gemini + Fallback)

Google Gemini is used for prompt-driven reasoning
Output must match a strict JSON schema
If Gemini fails:

The system falls back to a mocked response
Core workflow continues uninterrupted
❓ Why CLI Instead of UI?

No UI was required
CLI enables:

True conversational flow
Simple demos
Clear separation of concerns
Matches backend-agent use cases in production

🧪 What Is NOT Included (By Design)
Model fine-tuning
Vector databases
Multi-agent orchestration
Frontend UI
Production-scale infrastructure

🔮 What I’d Improve With More Time

Persistent session storage
Retry/backoff strategies
Schema validation with Zod
Real TikTok Ads API integration
Streaming LLM responses

🏁 Final Note
This project is built as a production-ready AI workflow, not a demo chatbot.
The focus is on correct reasoning, rule enforcement, and engineering judgment.

Author
Juneb Khan

---



