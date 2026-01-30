import { validateCampaign } from "../rules/campaignRules.js";
import { validateMusic } from "../rules/musicRules.js";
import { handleMusic } from "./musicHandler.js";
import { submitAd } from "../api/tiktokAdsMock.js";
import { interpretError } from "../utils/errorInterpreter.js";

export function submit(state) {
  const campaignError = validateCampaign(state);
  if (campaignError) return block(campaignError);

  const musicRuleError = validateMusic(state);
  if (musicRuleError) return block(musicRuleError);

  const musicLogicError = handleMusic(state);
  if (musicLogicError) return block(musicLogicError.error);

  const apiResponse = submitAd(state);

  if (apiResponse.error) {
    const interpreted = interpretError(apiResponse.error);
    return {
      submission_decision: "block",
      error_explanation: interpreted.explanation,
      suggested_action: interpreted.action,
      retry_possible: true
    };
  }

  return {
    submission_decision: "allow",
    ad_id: apiResponse.ad_id
  };
}

function block(reason) {
  return {
    submission_decision: "block",
    error_explanation: reason,
    suggested_action: "Fix input and retry"
  };
}
