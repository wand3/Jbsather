import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "../../utils/utils";

interface CookieCategoryProps {
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (value: boolean) => void;
}

export function CookieCategory({
  title,
  description,
  checked,
  disabled = false,
  onChange,
}: CookieCategoryProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative border border-[#e0e4eb] border-b-0 rounded-t-lg p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={checked}
            disabled={disabled}
            onChange={(e) => onChange?.(e.target.checked)}
            className="
              h-4
              w-4
              rounded
              border-slate-300
              accent-[#16181d]
              hover:border-slate-700
              disabled:cursor-not-allowed
              disabled:opacity-50
              hover:bg-transparent
              active:bg-slate-900
              focus:outline-none
              focus:ring-0
              checked:bg-slate-900

            "
          />

          <span className="font-medium text-slate-900">
            {title}
          </span>
        </div>

        <button
          type="button"
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
          className="
            bg-transparent
            border-none
            shadow-none
            hover:bg-transparent
            active:bg-transparent
            focus:outline-none
            focus:ring-0
          "
        >
          <ChevronDown
            size={20}
            className={cn(
              "text-slate-500 transition-transform duration-200",
              open && "rotate-180"
            )}
          />
        </button>
      </div>

      <div
        className={cn(
          "grid transition-all duration-200 ease-out",
          open
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <div className="border-t border-slate-100 px-4 py-4 text-sm leading-6 text-slate-600">
            {description}
          </div>
        </div>
      </div>
    </div>
  );
}