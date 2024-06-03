"use client";
import { ButtonHTMLAttributes, useMemo } from "react";
import { Button as MTButton } from "@/libraries/material-tailwind";
import { TColor, TVariant } from "@/utils/types";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: TVariant;
  color: TColor;
}

export default function Button({
  variant,
  color,
  className = "",
  children,
  onClick,
  type,
  disabled = false,
}: IProps) {
  const _className = useMemo(() => {
    let defaultClassName = "";
    if (variant === "filled") {
      if (color === "primary") return "border border-primary bg-primary";
      if (color === "secondary") return "border border-secondary bg-secondary";
      if (color === "success") return "border border-success bg-success";
      if (color === "warning") return "border border-warning bg-warning";
      if (color === "error") return "border border-error bg-error";
      if (color === "dark") return "border border-dark bg-dark";
      if (color === "lightDark") return "border border-lightDark bg-lightDark";
    }

    if (variant === "outlined") {
      defaultClassName = "bg-transparent border";

      if (color === "primary")
        return `${defaultClassName} border-primary text-primary`;
      if (color === "secondary")
        return `${defaultClassName} border-secondary text-secondary`;
      if (color === "success")
        return `${defaultClassName} border-success text-success`;
      if (color === "warning")
        return `${defaultClassName} border-warning text-warning`;
      if (color === "error")
        return `${defaultClassName} border-error text-error`;
      if (color === "dark") return `${defaultClassName} border-dark text-dark`;
      if (color === "lightDark")
        return `${defaultClassName} border-lightDark text-lightDark`;
    }

    if (variant === "text") {
      if (color === "secondary") return "text-secondary";
    }

    return defaultClassName;
  }, [variant, color]);

  return (
    <MTButton
      type={type}
      placeholder=""
      className={`text-base normal-case py-1.5 ${_className} ${className}`}
      variant={variant}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </MTButton>
  );
}
