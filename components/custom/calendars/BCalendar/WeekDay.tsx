import { Typography } from "@/libraries/material-tailwind";
import type { HeaderProps } from "@/libraries/react-big-calendar";

const today = new Date();

export default function WeekDay({ date, label }: HeaderProps) {
  return (
    <div
      className={`rounded-lg border-2 py-2 ${
        today.getDay() === date.getDay()
          ? "bg-secondary text-white border-secondary"
          : "bg-[#FCFCFD] text-dark border-[#F6F4F9]"
      }`}
    >
      <Typography
        placeholder=""
        className="font-bold text-center hidden md:block"
      >
        {label}
      </Typography>
      <Typography
        placeholder=""
        className="font-bold text-center block md:hidden"
      >
        {label[0]}
      </Typography>
    </div>
  );
}
