export function interpretError(error) {
  switch (error) {
    case "INVALID_MUSIC_ID":
      return {
        explanation: "Music ID is not approved by TikTok",
        action: "Choose a different music ID or upload custom music"
      };

    case "GEO_RESTRICTION":
      return {
        explanation: "Ads are not allowed in this region",
        action: "Change targeting region"
      };

    default:
      return {
        explanation: "Unknown error",
        action: "Check configuration"
      };
  }
}
