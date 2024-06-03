import { type ReactNode, type InputHTMLAttributes, useState } from "react";
import { Typography } from "@/libraries/material-tailwind";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id?: string;
  type?: string;
  name?: string;
  className?: string;
  children?: ReactNode | string;
  classNameOfInput?: string;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  error?: string | boolean;
}

export default function Input({
  label = "",
  id = "",
  type = "",
  name = "",
  className = "",
  classNameOfInput = "",
  startAdornment,
  endAdornment,
  error,
  ...others
}: IProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [focused, setFocused] = useState<boolean>(false);
  return (
    <div className="flex flex-col gap-2 w-full">
      {!!label && (
        <label htmlFor={id} className="text-lightDark">
          {label}
        </label>
      )}

      <div
        className={`flex gap-2 px-3 py-2 rounded items-center bg-gray-200 border border-gray-200 ${className} ${
          error ? "!border-red-500" : ""
        } ${
          focused
            ? "ring-[1px] ring-[#8032ff] shadow-[#8032ff60] shadow-md"
            : ""
        }`}
      >
        {startAdornment ? (
          <div className="flex flex-wrap gap-3">
            {startAdornment}
            <input
              id={id}
              name={name}
              className={`flex-1 focus:outline-none w-full bg-transparent text-lightDark placeholder:text-[#B6AACA] ${classNameOfInput}`}
              {...others}
              type={
                type == "password"
                  ? showPassword
                    ? "text"
                    : "password"
                  : type || "text"
              }
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
            />
          </div>
        ) : (
          <input
            id={id}
            name={name}
            className={`flex-1 focus:outline-none w-full bg-transparent text-lightDark placeholder:text-[#B6AACA] ${classNameOfInput}`}
            {...others}
            type={
              type == "password"
                ? showPassword
                  ? "text"
                  : "password"
                : type || "text"
            }
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
        )}

        {!!endAdornment && (
          <div
            className="text-lightDark"
            onMouseDown={() => setShowPassword(true)}
            onMouseUp={() => setShowPassword(false)}
          >
            {endAdornment}
          </div>
        )}
      </div>

      {!!error && (
        <Typography placeholder="" className="text-sm text-red-500">
          {error}
        </Typography>
      )}
    </div>
  );
}
