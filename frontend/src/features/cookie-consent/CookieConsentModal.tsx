import { CookieCategory } from "./CookieCategory";
import { useCookieConsent } from "./useCookieConsent";

export function CookieConsentModal() {
  const {
    open,
    closeModal,

    preferences,
    updatePreferences,

    savePreferences,
    acceptAll,
  } = useCookieConsent();

  if (!open) return null;

  const handleSave = async () => {
    await savePreferences(preferences);
  };

  const handleAcceptAll = async () => {
    await acceptAll();
  };

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}

      <div
        onClick={closeModal}
        className="
          absolute
          inset-0
          bg-black/50
          backdrop-blur-sm
        "
      />

      {/* Modal */}

      <div className="absolute inset-0 overflow-y-auto p-4">
        <div className="flex min-h-full items-center justify-center">
        <div
          className="
            relative
            w-full
            max-w-3xl
            overflow-hidden
            rounded-3xl
            bg-white
            shadow-2xl
          "
        >
          {/* Header */}

          <div className="border-b border-slate-100 px-8 pt-8 pb-6">
            <div className="mb-6 flex justify-center">
              <div
                className="
                  flex
                  h-20
                  w-20
                  items-center
                  justify-center
                  rounded-full
                  bg-slate-100
                "
              >
                🍪
              </div>
            </div>

            <h2
              className="
                text-center
                text-3xl
                font-bold
                tracking-tight
                text-slate-900
              "
            >
              Privacy Preferences
            </h2>

            <p
              className="
                mx-auto
                mt-4
                max-w-2xl
                text-center
                text-sm
                leading-7
                text-slate-600
              "
            >
              We use cookies to keep our website
              running, remember your preferences,
              and understand how people use our
              services. Some cookies are essential,
              while others help us improve your
              experience.
            </p>

            <p
              className="
                mx-auto
                mt-3
                max-w-2xl
                text-center
                text-sm
                leading-7
                text-slate-600
              "
            >
              You can choose which optional cookies
              you'd like to allow and update your
              preferences at any time.
            </p>
          </div>

          {/* Categories */}

          <div
            className="
              max-h-[420px]
              space-y-3
              overflow-y-auto
              px-8
              py-6
            "
          >
            <CookieCategory
              title="Necessary Cookies"
              description="
              These cookies are required for the website
              to work. They support core features such as
              security, authentication, session management,
              and navigation. Because they are essential to
              the service, they are always enabled.
              "
              checked={true}
              disabled
            />

            <CookieCategory
              title="Functionality & Performance Cookies"
              description="
              These cookies remember settings you've chosen
              and help certain features work as expected.
              They may be used to keep you signed in,
              remember preferences, or support media and
              interactive content across the site.
              "
              checked={preferences.preferences}
              onChange={(value) =>
                updatePreferences({
                  ...preferences,
                  preferences: value,
                })
              }
            />

            <CookieCategory
              title="Analytics Cookies"
              description="
              These cookies help us understand how visitors
              use our website. They tell us which pages are
              visited most often, how users move through the
              site, and where improvements may be needed.
              The information collected is used to improve
              the overall experience.
              "
              checked={preferences.analytics}
              onChange={(value) =>
                updatePreferences({
                  ...preferences,
                  analytics: value,
                })
              }
            />

            <CookieCategory
              title="Marketing Cookies"
              description="
              These cookies help us measure the
              effectiveness of our campaigns and deliver
              more relevant content and advertising.
              They may be used to understand how users
              interact with our marketing activities
              across different platforms and devices.
              "
              checked={preferences.marketing}
              onChange={(value) =>
                updatePreferences({
                  ...preferences,
                  marketing: value,
                })
              }
            />
          </div>

          {/* Footer */}

          <div
            className="
              flex
              flex-col
              gap-3
              border-t
              border-slate-100
              p-6

              sm:flex-row
            "
          >
            <button
              onClick={handleSave}
              className="
                flex-1
                rounded-xl
                border
                border-slate-300
                px-5
                py-3
                text-sm
                font-medium
                text-slate-700

                transition

                hover:bg-slate-50
              "
            >
              Save Preferences
            </button>

            <button
              onClick={handleAcceptAll}
              className="
                flex-1
                rounded-xl
                bg-slate-900
                px-5
                py-3
                text-sm
                font-medium
                text-white

                transition

                hover:bg-slate-800
              "
            >
              Accept All Cookies
            </button>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}