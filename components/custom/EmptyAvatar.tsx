import { AllHTMLAttributes } from "react";
import { Icon } from "@/libraries/iconify-react";
import { ICON_MAPPER } from "@/utils/constants";

export default function EmptyAvatar({
  className = "",
  onClick,
}: AllHTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-full flex flex-col items-center justify-center bg-gray-300 text-2xl ${className}`}
      onClick={onClick}
    >
      <Icon icon={ICON_MAPPER.user} className="text-gray-800" />
    </div>
  );
}
