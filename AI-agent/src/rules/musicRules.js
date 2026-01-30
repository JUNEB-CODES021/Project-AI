export function validateMusic(state) {
  if (state.music_choice === "none") {
    if (state.objective === "Conversions") {
      return "Music is mandatory for Conversion campaigns";
    }
  }

  if (state.music_choice === "existing" && !state.music_id) {
    return "Existing music ID must be provided";
  }

  return null;
}
