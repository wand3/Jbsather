export type CookieCategory =
  | "necessary"
  | "analytics"
  | "preferences"
  | "marketing";

export interface CookiePreferences {
  necessary: true;
  analytics: boolean;
  preferences: boolean;
  marketing: boolean;
}