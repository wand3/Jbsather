// CookiePreferencesButton.tsx

import { Cookie } from "lucide-react";

interface Props {
  onClick: () => void;
}

export function CookiePreferencesButton({
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      aria-label="Cookie Preferences"
      className="
        fixed
        bottom-6
        left-6
        z-40

        flex
        h-14
        w-14
        items-center
        justify-center

        rounded-full
        bg-slate-900
        text-white

        shadow-xl
        transition-all
        duration-200

        hover:scale-105
        hover:bg-slate-800
      "
    >
      <Cookie size={24} />
    </button>
  );
}