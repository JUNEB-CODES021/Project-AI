import { submitAd } from "../api/tiktokAdsMock.js";

export function handleMusic(state) {
  if (state.music_choice === "upload") {
    state.music_id = "mock_music_" + Date.now();
  }

  if (state.music_choice === "none" && state.objective === "Conversions") {
    return {
      error: "Music is required for Conversion campaigns"
    };
  }

  if (state.music_id === "invalid") {
    return {
      error: "Provided music ID is invalid"
    };
  }

  return null;
}
