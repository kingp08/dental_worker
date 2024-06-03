import { AllHTMLAttributes } from "react";
import { Icon } from "@/libraries/iconify-react";
import { IconButton } from "@/libraries/material-tailwind";
import { ICON_MAPPER } from "@/utils/constants";

interface IProps extends AllHTMLAttributes<HTMLDivElement> {
  label: string;
  status: boolean;
  onClick?: () => void;
}

export default function StatusItem({
  label,
  status,
  onClick,
  className = "",
}: IProps) {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      <div className="flex items-center gap-2">
        {status ? (
          <Icon
            icon={ICON_MAPPER.circleFilledCheck}
            className="text-success text-2xl"
          />
        ) : (
          <Icon
            icon={ICON_MAPPER.circleCheck}
            className="text-primary text-2xl"
          />
        )}
        <span>{label}</span>
      </div>

      <IconButton
        placeholder=""
        onClick={onClick}
        variant="text"
        className="text-secondary text-2xl w-5 h-5"
      >
        {status ? (
          <Icon icon={ICON_MAPPER.edit} />
        ) : (
          <Icon icon={ICON_MAPPER.externalLink} />
        )}
      </IconButton>
    </div>
  );
}
