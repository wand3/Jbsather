import {
    createContext,
    useCallback,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from "react";

export interface CookiePreferences {
necessary: true;
analytics: boolean;
preferences: boolean;
marketing: boolean;
}

interface CookieConsentContextType {
    open: boolean;
    preferences: CookiePreferences;

    openModal: () => void;
    closeModal: () => void;

    updatePreferences: (preferences: CookiePreferences) => void;

    savePreferences: (preferences: CookiePreferences) => Promise<void>;

    acceptAll: () => Promise<void>;

    hasConsent: boolean;
}

const STORAGE_KEY = "cookie-consent-v1";

const defaultPreferences: CookiePreferences = {
    necessary: true,
    analytics: false,
    preferences: false,
    marketing: false,
};

export const CookieConsentContext = createContext<CookieConsentContextType | null>(
    null
);

interface ProviderProps {
    children: ReactNode;
}

export function CookieConsentProvider({
    children,
    }: ProviderProps) {
    const [open, setOpen] = useState(false);

    const [hasConsent, setHasConsent] = useState(false);

    const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences);

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);

        if (!stored) {
            setOpen(true);
            return;
        }

        const parsed: CookiePreferences = JSON.parse(stored);

        setPreferences(parsed);
        setHasConsent(true);
    }, []);

    const openModal = useCallback(() => {
        setOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setOpen(false);
    }, []);

    const updatePreferences = useCallback(
        (prefs: CookiePreferences) => {
        setPreferences(prefs);
        },
        []
    );

    const savePreferences = useCallback(async (prefs: CookiePreferences) => {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(prefs)
        );

        setPreferences(prefs);
        setHasConsent(true);
        setOpen(false);

        /**
         * Future Backend Sync
         *
         * await api.post("/consent", {
         *   preferences: prefs,
         *   policyVersion: "1.0.0",
         * });
         */
        },[]
    );

    const acceptAll = useCallback(async () => {
        const allAccepted: CookiePreferences = {
            necessary: true,
            analytics: true,
            preferences: true,
            marketing: true,
        };

        await savePreferences(allAccepted);
    }, [savePreferences]);

    const value = useMemo(() => ({
        open,
        preferences,

        openModal,
        closeModal,

        updatePreferences,
        savePreferences,
        acceptAll,

        hasConsent,
        }),

        [
        open,
        preferences,
        openModal,
        closeModal,
        updatePreferences,
        savePreferences,
        acceptAll,
        hasConsent,
        ]
    );

    return (
        <CookieConsentContext.Provider value={value}>
        {children}
        </CookieConsentContext.Provider>
    );
}


