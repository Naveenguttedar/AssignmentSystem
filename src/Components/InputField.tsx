import { ChangeEventHandler } from "react";
import { twMerge } from "tailwind-merge";

export default function InputField({
  type,
  placeholder,
  onchange,
  value,
  className,
  disable,
}: {
  type: string;
  placeholder: string;
  onchange: ChangeEventHandler<HTMLInputElement>;
  value?: string | number;
  className?: string;
  disable?: boolean;
}) {
  return (
    <input
      type={type}
      className={twMerge(
        "block mb-2 w-full p-2 text-gray-900 border border-gray-300  text-xs ",
        className,
      )}
      spellCheck="false"
      placeholder={placeholder}
      value={value}
      disabled={disable}
      required
      onChange={onchange}
    />
  );
}
