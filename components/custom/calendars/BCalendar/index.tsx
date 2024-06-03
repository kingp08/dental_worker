"use client";

import { AllHTMLAttributes, useMemo, useState } from "react";
import {
  BigCalendar,
  EventProps,
  momentLocalizer,
} from "@/libraries/react-big-calendar";
import moment from "@/libraries/moment";
import type { DialogProps } from "@/libraries/material-tailwind";
import {
  Dialog,
  DialogBody,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
} from "@/libraries/material-tailwind";
import { Icon } from "@/libraries/iconify-react";
import { useMediaQuery } from "@/libraries/usehooks-ts";
import { ICON_MAPPER, SCREEN_MAPPER } from "@/utils/constants";
import WeekDay from "@/components/custom/calendars/BCalendar/WeekDay";
import EventItem from "@/components/custom/calendars/BCalendar/EventItem";
import AddEventDialog from "@/components/custom/calendars/BCalendar/AddEventDialog";
import SCalendar from "@/components/custom/calendars/SCalendar";
import { useCalendar } from "@/contexts/CalendarContext";
import { IEvent } from "@/utils/interfaces";

interface IProps extends AllHTMLAttributes<HTMLDivElement> {
  title?: string;
}

const localizer = momentLocalizer(moment);
const currentDate = new Date();

export default function BCalendar({ title = "", className = "" }: IProps) {
  const isMd = useMediaQuery(`(max-width: ${SCREEN_MAPPER.md})`);

  const { events } = useCalendar();

  const [date, setDate] = useState<Date>(currentDate);
  const [sCalendarOpened, setSCalendarOpened] = useState<boolean>(false);
  const [addEventDialogOpened, setAddEventDialogOpened] =
    useState<boolean>(false);
  const [sCalDialogOpened, setSCalDialogOpened] = useState<boolean>(false);

  const dialogSize = useMemo<DialogProps["size"]>(() => {
    if (isMd) return "xl";
    return "xs";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSCalendarOpened = () => {
    setSCalendarOpened((prev) => !prev);
  };

  const gotoNeighborMonth = (toNext: boolean) => {
    const monthOffset = toNext ? 1 : -1;
    setDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + monthOffset, 1)
    );
  };

  const gotoNeighborDate = (toNext: boolean) => {
    const dateOffset = toNext ? 1 : -1;
    setDate(
      (prev) =>
        new Date(
          prev.getFullYear(),
          prev.getMonth(),
          prev.getDate() + dateOffset
        )
    );
  };

  const onClickDate = (dt: Date) => {
    setDate(dt);
    setAddEventDialogOpened(true);
  };

  return (
    <>
      <div className={`h-full flex flex-col gap-8 items-stretch ${className}`}>
        <div className="flex justify-between items-center">
          <h2 className="text-dark text-xl font-bold">
            {title || moment(date).format("MMMM, YYYY")}
          </h2>

          <div className="items-center justify-between gap-4 border border-lightDark/20 rounded-lg py-1 px-2 hidden md:flex w-40">
            <IconButton
              placeholder=""
              variant="text"
              className="w-4 h-4"
              onClick={() => gotoNeighborDate(false)}
            >
              <Icon
                icon={ICON_MAPPER.leftArrow}
                className="text-secondary text-sm"
              />
            </IconButton>

            <Menu open={sCalendarOpened} handler={handleSCalendarOpened}>
              <MenuHandler>
                <div className="flex items-center gap-1 cursor-pointer">
                  <Icon
                    icon={ICON_MAPPER.calendar}
                    className="text-secondary"
                  />
                  <span className="text-sm text-dark font-semibold">
                    {date.getDate() === currentDate.getDate()
                      ? "Today"
                      : moment(date).format("l")}
                  </span>
                </div>
              </MenuHandler>
              <MenuList placeholder="" className="hidden md:block">
                <SCalendar
                  date={date}
                  gotoNeighborMonth={gotoNeighborMonth}
                  isAddSchedule={false}
                />
              </MenuList>
            </Menu>

            <IconButton
              placeholder=""
              variant="text"
              className="w-4 h-4"
              onClick={() => gotoNeighborDate(true)}
            >
              <Icon
                icon={ICON_MAPPER.rightArrow}
                className="text-secondary text-sm"
              />
            </IconButton>
          </div>

          <IconButton
            placeholder=""
            variant="text"
            className="text-secondary text-2xl block md:hidden"
            onClick={() => setSCalDialogOpened(true)}
          >
            <Icon icon={ICON_MAPPER.calendar} />
          </IconButton>
        </div>

        <BigCalendar
          date={date}
          localizer={localizer}
          events={events}
          step={60}
          showMultiDayTimes
          components={{
            toolbar: () => <></>,
            month: {
              header: WeekDay,
              event: (props: EventProps<IEvent>) => <EventItem {...props} />,
            },
          }}
          onNavigate={onClickDate}
        />
      </div>

      <AddEventDialog
        opened={addEventDialogOpened}
        setOpened={setAddEventDialogOpened}
        date={date}
        size={dialogSize}
      />

      <Dialog
        placeholder=""
        size="xl"
        open={sCalDialogOpened}
        handler={setSCalDialogOpened}
      >
        <DialogBody placeholder="">
          <SCalendar
            date={date}
            gotoNeighborMonth={gotoNeighborMonth}
            isAddSchedule={true}
          />
        </DialogBody>
      </Dialog>
    </>
  );
}
