
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
}: CookieCategoryProps) {}
