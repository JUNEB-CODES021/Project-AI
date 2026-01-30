export function validateCampaign(state) {
  if (!state.campaign_name || state.campaign_name.length < 3)
    return "Campaign name must be at least 3 characters";

  if (!["Traffic", "Conversions"].includes(state.objective))
    return "Invalid campaign objective";

  if (!state.ad_text || state.ad_text.length > 100)
    return "Ad text is required and must be under 100 characters";

  if (!state.cta)
    return "CTA is required";

  return null;
}
