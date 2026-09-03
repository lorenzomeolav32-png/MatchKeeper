export const SITE_NAME = "MatchKeeper";

export const SITE_TAGLINE = "Every match deserves a real keeper";

export const SITE_DESCRIPTION =
  "Find a goalkeeper for your amateur football match in Ghent. A community project connecting teams with available goalkeepers so no game gets cancelled.";

// Update this once the real domain is bought.
export const SITE_URL = "https://gkservice.be";

export const CITY = "Ghent";

// The three Google Forms used in the validation phase.
export const FORMS = {
  teams:
    "https://docs.google.com/forms/d/e/1FAIpQLSdg892YpGgwLlgc5ESKWGUAWUFXUdwZkAAV2lSCb_fj04GWPw/viewform",
  goalkeepers:
    "https://docs.google.com/forms/d/e/1FAIpQLSdbSFpazWcHyMFnRPUdZXs0qQwdzJQ7on6WkVLPSCrbP5V-Pw/viewform",
  goalkeeperRegistration:
    "https://docs.google.com/forms/d/e/1FAIpQLSe0Rl73fto6Y2Sqb-qfkgDjdVx5FZIQ_iRRYJ1-Pd1A3l0HQw/viewform",
} as const;
