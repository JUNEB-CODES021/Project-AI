# 🎯 TikTok Ads AI Agent

**CLI-Based Conversational Ad Builder**

A production-style AI agent that conversationally builds and validates TikTok Ads using deterministic business rules, mocked APIs, and a command-line interface.

This project prioritizes **rule enforcement**, **prompt discipline**, and **failure-resilient workflows** over UI or scale.

---

## 🚀 Features

- Interactive CLI-based ad creation
- Deterministic business-rule validation
- Strict music logic enforcement (primary evaluation area)
- Gemini LLM integration with automatic fallback
- Mocked TikTok Ads API submission
- Human-readable error explanations
- Full conversation, payload, and decision output

---

## 🏗️ System Architecture

```text
CLI (readline)
  ↓
Conversation Orchestrator
  ↓
State Management
  ↓
Business Rule Validators
  ↓
Music Logic Engine
  ↓
Mock TikTok Ads API
  ↓
Final Submission Decision

```
📂 Project Structure

```
src/
├── main.js              # CLI entry point
├── agent.js             # Core AI agent + orchestration
├── prompts.js           # Gemini-optimized prompt templates
├── state.js             # Conversation & ad state management
├── validators.js        # Business rules & validation logic
├── musicRules.js        # Music-specific constraints
├── tiktokAuth.js        # OAuth flow (mocked)
├── tiktokApi.js         # TikTok Ads API client (mocked)
├── llmClient.js         # Gemini integration with fallback
├── errorInterpreter.js  # Error translation & explanations
└── config.js            # Centralized configuration
```
🎵 Music Logic Workflows (Primary Evaluation Area)
Case A — Existing Music ID

```
User selects "existing"
  ↓
Prompt for music_id
  ↓
Validate music_id via mocked TikTok API
  ↓
If valid → allow submission
If invalid → block + explain reason

```

Rules:

music_id must exist
music must be approved
geo restrictions are enforced (mocked)

Case B — Uploaded Music

```
User selects "upload"
  ↓
Simulate music upload
  ↓
Generate mock music_id
  ↓
Validate generated music_id
  ↓
Allow submission if validation passes

```
Case C — No Music

```
User selects "none"
  ↓
Check campaign objective
  ↓
Traffic        → allow
Conversions    → block before submission
```

Rules:

No music is allowed only for Traffic
Conversions without music are always rejected


🔑 Tech Stack

```
Language        → JavaScript (Node.js, ES Modules)
LLM             → Google Gemini (with fallback)
Interface       → CLI (readline)
APIs            → Mocked TikTok Ads API
State           → In-memory state machine

```
🔐 Environment Setup

```
GEMINI_API_KEY=AIzaSyXXXXXXXXXXXX
TIKTOK_CLIENT_ID=mock_client_id
TIKTOK_CLIENT_SECRET=mock_secret
```
▶️ Running the Agent

```
npm install
npm run cli
```

📦 Example Output
Final Ad Payload
```

{
  "campaign_name": "Winter Sale",
  "objective": "Conversions",
  "ad_text": "50% off today",
  "cta": "Shop Now",
  "music_choice": "upload",
  "music_id": "mock_music_1729"
}
```

Submission Result

```

{
  "submission_decision": "allow",
  "ad_id": "mock_ad_123"
}
```

❌ Error Handling
```

Invalid input        → explained clearly
Rule violation       → blocked before API call
Invalid music ID     → reason returned
OAuth failure        → mocked explanation
LLM failure          → fallback response
```

Errors are never surfaced raw.
🔮 Future Improvements
```

- Persistent session storage
- Retry / backoff strategies
- Schema validation (Zod)
- Real TikTok Ads API integration
- Streaming LLM responses
```

🏁 Summary

This project demonstrates production-grade AI agent design:

Deterministic validation
Rule-first architecture
Failure-resilient execution
Clear reasoning and explainability

Author: Juneb Khan







