export function submitAd(payload) {
  if (payload.music_id === "invalid")
    return { error: "INVALID_MUSIC_ID" };

  if (payload.geo === "restricted")
    return { error: "GEO_RESTRICTION" };

  return { success: true, ad_id: "mock_ad_123" };
}
