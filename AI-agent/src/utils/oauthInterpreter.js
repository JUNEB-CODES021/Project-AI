export function interpretOAuth(error) {
  const map = {
    invalid_client: {
      explanation: "Client ID or secret is invalid",
      action: "Regenerate TikTok app credentials"
    },
    expired_token: {
      explanation: "OAuth token has expired",
      action: "Re-authenticate user"
    },
    missing_scope: {
      explanation: "Ads permission not granted",
      action: "Enable Ads scope in TikTok app"
    },
    geo_restricted: {
      explanation: "Ads not allowed in this region",
      action: "Change target region"
    }
  };

  return map[error] || {
    explanation: "Unknown OAuth error",
    action: "Check OAuth configuration"
  };
}
