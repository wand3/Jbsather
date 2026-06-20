// import { Routes } from "./routes";

import { CookieConsentModal } from "./features/cookie-consent/CookieConsentModal";
import { CookiePreferencesButton } from "./features/cookie-consent/CookiePreferencesButton";
import { useCookieConsent } from "./features/cookie-consent/useCookieConsent";

// import { useCookieConsent } from "@/features/consent/useCookieConsent";
// import { useAuth } from "@/features/auth/useAuth";

export function AppShell() {
//   const { user } = useAuth();

  const {
    open,
    openModal,
    hasConsent,
  } = useCookieConsent();

  return (
    <>
      {/* {!user && hasConsent && (
        <CookiePreferencesButton
          onClick={openModal}
        />
      )} */}
      {hasConsent && (
        <CookiePreferencesButton
          onClick={openModal}
        />
      )}

      {open && <CookieConsentModal />}

      {/* <Routes /> */}
    </>
  );
}