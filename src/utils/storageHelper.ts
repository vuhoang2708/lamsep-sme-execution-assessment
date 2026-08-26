import { SurveyResponseMap, OnboardingProfile } from '../types/survey';

const STORAGE_KEYS = {
  OPT_IN: 'lamsep_storage_opt_in',
  RESPONSES: 'lamsep_survey_responses',
  PROFILE: 'lamsep_onboarding_profile',
  KUBA_SELECTION: 'lamsep_kuba_selection'
};

export const StorageHelper = {
  isOptIn(): boolean {
    try {
      return localStorage.getItem(STORAGE_KEYS.OPT_IN) === 'true';
    } catch {
      return false;
    }
  },

  setOptIn(enabled: boolean): void {
    try {
      if (enabled) {
        localStorage.setItem(STORAGE_KEYS.OPT_IN, 'true');
      } else {
        localStorage.removeItem(STORAGE_KEYS.OPT_IN);
        localStorage.removeItem(STORAGE_KEYS.RESPONSES);
        localStorage.removeItem(STORAGE_KEYS.PROFILE);
        localStorage.removeItem(STORAGE_KEYS.KUBA_SELECTION);
      }
    } catch {
      // Ignore storage errors in sandbox/private mode
    }
  },

  loadResponses(): SurveyResponseMap {
    if (!this.isOptIn()) return {};
    try {
      const data = localStorage.getItem(STORAGE_KEYS.RESPONSES);
      return data ? JSON.parse(data) : {};
    } catch {
      return {};
    }
  },

  saveResponses(responses: SurveyResponseMap): void {
    if (!this.isOptIn()) return;
    try {
      localStorage.setItem(STORAGE_KEYS.RESPONSES, JSON.stringify(responses));
    } catch {
      // Ignore
    }
  },

  loadProfile(): OnboardingProfile | null {
    if (!this.isOptIn()) return null;
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PROFILE);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  saveProfile(profile: OnboardingProfile): void {
    if (!this.isOptIn()) return;
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
    } catch {
      // Ignore
    }
  },

  clearAllData(): void {
    try {
      localStorage.removeItem(STORAGE_KEYS.OPT_IN);
      localStorage.removeItem(STORAGE_KEYS.RESPONSES);
      localStorage.removeItem(STORAGE_KEYS.PROFILE);
      localStorage.removeItem(STORAGE_KEYS.KUBA_SELECTION);
    } catch {
      // Ignore
    }
  }
};
