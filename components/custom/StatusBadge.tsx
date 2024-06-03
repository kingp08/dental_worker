import { ReactNode, useMemo } from "react";
import { STATUS_MAPPER } from "@/utils/constants";
import { IComponent } from "@/utils/interfaces";

interface IProps extends IComponent {
  status: string;
  isDefault?: boolean;
  beta?: string;
  children: ReactNode;
}

export default function StatusBadge({
  className = "",
  status = "",
  isDefault = false,
  children,
}: IProps) {
  const { colorClassName, fontWeightClassName } = useMemo(() => {
    let colorClass = "";
    let fontWeightClass = "font-semibold";

    if (isDefault) {
      colorClass = "bg-lightDark text-lightDark";
      fontWeightClass = "font-normal";
    } else {
      if (status === STATUS_MAPPER.pending) {
        colorClass = "bg-error text-error";
      } else if (status === STATUS_MAPPER.ongoing) {
        colorClass = "bg-primary text-primary";
      } else if (status === STATUS_MAPPER.completed) {
        colorClass = "bg-success text-success";
      } else if (status === STATUS_MAPPER.eligible) {
        colorClass = "bg-success text-success";
        fontWeightClass = "font-normal";
      } else if (status === STATUS_MAPPER.available) {
        colorClass = "bg-success text-success";
        fontWeightClass = "font-normal";
      } else if (status === STATUS_MAPPER.notAvailable) {
        colorClass = "bg-error text-error";
        fontWeightClass = "font-normal";
      } else if (status === STATUS_MAPPER.notVerified) {
        colorClass = "bg-error text-error";
        fontWeightClass = "font-normal";
      }
    }

    return { colorClassName: colorClass, fontWeightClassName: fontWeightClass };
  }, [status, isDefault]);

  return (
    <div
      className={`rounded-lg bg-opacity-5 capitalize ${fontWeightClassName} px-2 py-1 text-sm xl:text-base flex items-center text-center ${colorClassName} w-fit ${className}`}
    >
      {children}
    </div>
  );
}
