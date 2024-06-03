"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isActive?: boolean;
}

export default function TabButton({
  className = "",
  children,
  onClick,
  isActive = false,
}: IProps) {
  return (
    <button
      className={`px-3 py-1 text-base rounded-lg border-b-2 border-[#F8F4FF] hover:text-dark ${
        isActive ? "text-dark border-secondary" : "text-lightDark"
      } transition ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
