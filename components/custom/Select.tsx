import { ReactNode, SelectHTMLAttributes, useState } from "react";
import { Icon } from "@/libraries/iconify-react";
import { ICON_MAPPER } from "@/utils/constants";

interface IProps extends SelectHTMLAttributes<HTMLSelectElement> {
  children: ReactNode;
  available?: boolean;
  iconClassName?: string;
  label?: string;
  error?: string | boolean;
}

export default function Select({
  className = "",
  available,
  children,
  iconClassName = "",
  label,
  error,
  id,
  ...others
}: IProps) {
  const [opened, setOpened] = useState<boolean>(false);

  return (
    <div className="flex flex-col gap-2 w-full">
      {!!label && (
        <label htmlFor={id} className="text-lightDark">
          {label}
        </label>
      )}
      <div className="relative w-full">
        <select
          id={id}
          {...others}
          disabled={typeof available !== "undefined" && !available}
          className={`${
            typeof available === "undefined" || available
              ? "text-[#1F1233]"
              : "text-lightDark"
          }  text-sm font-semibold border rounded-lg appearance-none focus:outline-none pl-2 pr-8 py-2 w-full ${className} ${
            !!error ? "border-red-500" : "border-gray-300"
          }`}
          onClick={() => setOpened(!opened)}
        >
          {children}
        </select>
        <Icon
          icon={opened ? ICON_MAPPER.upArrow : ICON_MAPPER.downArrow}
          className={`text-sm ${
            typeof available === "undefined" || available
              ? "text-secondary"
              : "text-lightDark"
          } absolute top-[35%] right-2 ${iconClassName}`}
        />
      </div>
    </div>
  );
}
