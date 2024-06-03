import { AllHTMLAttributes, useMemo } from "react";
import { IconButton, Typography } from "@/libraries/material-tailwind";
import { Icon } from "@/libraries/iconify-react";
import { ICON_MAPPER } from "@/utils/constants";

interface IProps extends AllHTMLAttributes<HTMLDivElement> {
  pickPrevMonth: () => void;
  pickNextMonth: () => void;
  date: Date;
}

export default function MonthPick({
  pickPrevMonth,
  pickNextMonth,
  date,
  className = "",
}: IProps) {
  const monthYear = useMemo(() => {
    const formatter = new Intl.DateTimeFormat("en-us", {
      year: "numeric",
      month: "long",
    });
    return formatter.format(date).replaceAll(".", "");
  }, [date]);

  return (
    <div
      className={`w-[150px] border border-lightDark border-opacity-30 rounded-lg py-1 px-1 flex justify-between items-center ${className}`}
    >
      <IconButton
        placeholder=""
        variant="text"
        className="w-4 h-4 text-secondary"
        onClick={pickPrevMonth}
      >
        <Icon icon={ICON_MAPPER.leftArrow} />
      </IconButton>
      <Typography placeholder="" className="text-sm font-semibold">
        {monthYear}
      </Typography>
      <IconButton
        placeholder=""
        variant="text"
        className="w-4 h-4 text-secondary"
        onClick={pickNextMonth}
      >
        <Icon icon={ICON_MAPPER.rightArrow} />
      </IconButton>
    </div>
  );
}
