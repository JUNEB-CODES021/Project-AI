export function mockOAuth(token) {
  if (!token) return { error: "missing_token" };
  if (token === "expired") return { error: "expired_token" };
  if (token === "invalid_scope") return { error: "missing_scope" };
  return { success: true };
}
