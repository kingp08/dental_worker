import { AllHTMLAttributes, ForwardedRef, forwardRef, useMemo } from "react";
import { ICON_MAPPER, PATH_MAPPER, SHORT_WEEKDAYS } from "@/utils/constants";
import { Icon } from "@/libraries/iconify-react";
import { IconButton } from "@/libraries/material-tailwind";
import { Calendar } from "@/libraries/react-calendar";
import Button from "@/components/custom/buttons/Button";
import Link from "next/link";

interface IProps extends AllHTMLAttributes<HTMLDivElement> {
  date: Date;
  gotoNeighborMonth: (toNext: boolean) => void;
  isAddSchedule: boolean;
}

const SCalendar = forwardRef<HTMLDivElement, IProps>(
  (
    { className = "", date, gotoNeighborMonth, isAddSchedule = true }: IProps,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const monthYear = useMemo(() => {
      const formatter = new Intl.DateTimeFormat("en-us", {
        year: "numeric",
        month: "long",
      });
      return formatter.format(date).replaceAll(".", "");
    }, [date]);

    return (
      <div className={`flex flex-col gap-4 ${className}`} ref={ref}>
        {isAddSchedule ? (
          <div className="flex items-center justify-between">
            <h5 className="text-lg font-bold text-dark">Calendar</h5>
            <div className="border border-lightDark border-opacity-30 rounded-lg py-1 px-1 flex items-center justify-between w-40">
              <IconButton
                placeholder=""
                variant="text"
                className="w-4 h-4 text-secondary"
                onClick={() => gotoNeighborMonth(false)}
              >
                <Icon icon={ICON_MAPPER.leftArrow} />
              </IconButton>
              <p className="text-sm font-semibold">{monthYear}</p>
              <IconButton
                placeholder=""
                variant="text"
                className="w-4 h-4 text-secondary"
                onClick={() => gotoNeighborMonth(true)}
              >
                <Icon icon={ICON_MAPPER.rightArrow} />
              </IconButton>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <IconButton
              placeholder=""
              variant="text"
              className="w-6 h-6 text-secondary text-base"
              onClick={() => gotoNeighborMonth(false)}
            >
              <Icon icon={ICON_MAPPER.leftArrow} />
            </IconButton>
            <p className="text-lg font-bold text-dark">{monthYear}</p>
            <IconButton
              placeholder=""
              variant="text"
              className="w-6 h-6 text-secondary text-base"
              onClick={() => gotoNeighborMonth(true)}
            >
              <Icon icon={ICON_MAPPER.rightArrow} />
            </IconButton>
          </div>
        )}

        <div className="flex flex-col items-center gap-2">
          <Calendar
            className="!border-none !text-xl !font-sans"
            showNavigation={false}
            formatShortWeekday={(_, date) => SHORT_WEEKDAYS[date.getDay()]}
            calendarType="gregory"
            value={date}
          />
          {isAddSchedule ? (
            <Link href={PATH_MAPPER.schedule}>
              <Button
                variant="text"
                color="secondary"
                className="flex items-center py-1 px-1"
              >
                <Icon icon={ICON_MAPPER.plus} className="text-lg" />
                Add Schedule
              </Button>
            </Link>
          ) : (
            <button className="underline text-lightDark block">
              Clear Selection
            </button>
          )}
        </div>
      </div>
    );
  },
);

SCalendar.displayName = "SCalendar";

export default SCalendar;
