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
    <div
      className="
        overflow-hidden
        rounded-xl
        border
        border-slate-200
        bg-white
        transition-colors
        hover:border-gray-300
      "
    >
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className="
          flex
          w-full
          items-center
          justify-between
          gap-4
          p-4
          text-left
        "
      >
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={checked}
            disabled={disabled}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => onChange?.(e.target.checked)}
            className="
              h-4
              w-4
              cursor-pointer
              rounded
              border-slate-300
            "
          />

          <span className="font-medium text-slate-900">
            {title}
          </span>
        </div>

        <ChevronDown
          size={18}
          className={cn(
            "shrink-0 text-slate-500 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>

      <div
        className={cn(
          "grid transition-all duration-200 ease-out",
          open
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <div
            className="
              border-t
              border-slate-100
              px-4
              py-4
              text-sm
              leading-6
              text-slate-600
            "
          >
            {description}
          </div>
        </div>
      </div>
    </div>
  );
}