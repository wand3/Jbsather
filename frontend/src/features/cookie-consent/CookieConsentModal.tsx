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
          bg-slate/10
          backdrop-blur-sm
        "
      />

      {/* Modal */}

      <div className="absolute inset-0 overflow-y-auto p-2 ">
        <div className="flex min-h-full items-center justify-center">
        <div
          className="
            relative
            w-full
            max-w-[600px]
            max-h-[100%]
            overflow-hidden
            rounded-3xl
            bg-white
            shadow-2xl
            backdrop-[#fff]
            border-solid
            p-[40px]
            border-[#e0e4eb]
          "
        >
          {/* Header */}

          <div className="font-aeonik border-b border-slate-100 py-2 my-2">
            <div className="mb-6 m-auto justify-center p-3 bg-slate-200 w-fit rounded-xl">
              <img src="src/assets/cookies.png" height={55} width={55}/>
            </div>

            <h2
              className="mb-4 text-center text-[32px] font-medium leading-[1.2] tracking-[-0.5px] text-[#16181d]"
            >
              Privacy Preferences
            </h2>

            <p className="font-normal text-base leading-7 text-center text-[#16181d] p-0 m-0 box-border antialiased">
              We use cookies to keep our website
              running, remember your preferences,
              and understand how people use our
              services. Some cookies are essential,
              while others help us improve your
              experience.

              You can choose which optional cookies
              you'd like to allow and update your
              preferences at any time.
              For a deeper dive into our cookie usage, do check out our <a href="/"> Cookie Policy</a>.
            </p>
          </div>

          {/* Categories */}

          <div className="font-aeonik font-normal text-[#16181d] text-center my-3 p-0 box-border block h-auto mt-4 mb-0 overflow-hidden antialiased"
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