export function nextQuestion(state) {
  if (!state.campaign_name) return "What is your campaign name?";
  if (!state.objective) return "Choose objective: Traffic or Conversions";
  if (!state.ad_text) return "Enter ad text (max 100 characters)";
  if (!state.cta) return "Enter CTA (e.g., Learn More, Shop Now)";
  if (!state.music_choice)
    return "Music choice? (existing / upload / none)";
  if (state.music_choice === "existing" && !state.music_id)
    return "Provide existing Music ID";
  return null;
}
