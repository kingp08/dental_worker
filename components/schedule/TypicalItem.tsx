"use client";
import { ChangeEvent, useEffect, useState } from "react";
import { Typography, Switch } from "@/libraries/material-tailwind";
import moment from "@/libraries/moment";
import { SCHEDULE_TIMES } from "@/utils/constants";
import { IComponent, IWeekAvailability } from "@/utils/interfaces";
import { useSchedule } from "@/contexts/ScheduleContext";
import Select from "@/components/custom/Select";

interface IProps extends IComponent {
  item: IWeekAvailability;
  weekAvailabilities: Array<IWeekAvailability>;
  setWeekAvailabilities: (
    value:
      | Array<IWeekAvailability>
      | ((prev: Array<IWeekAvailability>) => Array<IWeekAvailability>)
  ) => void;
}

export default function ScheduleItem({
  item,
  weekAvailabilities,
  setWeekAvailabilities,
}: IProps) {
  const [from, setFrom] = useState<string>(SCHEDULE_TIMES[0]);
  const [to, setTo] = useState<string>(SCHEDULE_TIMES[0]);

  const handleFrom = (e: ChangeEvent<HTMLSelectElement>) => {
    setWeekAvailabilities((prev) =>
      prev.map((availability) =>
        availability.id === item.id
          ? {
              ...availability,
              days: [
                {
                  ...availability.days[0],
                  from: moment(e.target.value, "hh:mm A").format(
                    "YYYY/MM/DD HH:mm:ss"
                  ),
                },
              ],
            }
          : availability
      )
    );
  };

  const handleTo = (e: ChangeEvent<HTMLSelectElement>) => {
    setWeekAvailabilities((prev) =>
      prev.map((availability) =>
        availability.id === item.id
          ? {
              ...availability,
              days: [
                {
                  ...availability.days[0],
                  to: moment(e.target.value, "hh:mm A").format(
                    "YYYY/MM/DD HH:mm:ss"
                  ),
                },
              ],
            }
          : availability
      )
    );
  };

  const handleChange = () => {
    setWeekAvailabilities((prev) =>
      prev.map((availability) =>
        availability.id === item.id
          ? { ...availability, enable: !availability.enable }
          : availability
      )
    );
  };

  useEffect(() => {
    setFrom(moment(item.days[0].from, "YYYY/MM/DD HH:mm:ss").format("hh:mm A"));
    setTo(moment(item.days[0].to, "YYYY/MM/DD HH:mm:ss").format("hh:mm A"));
  }, [weekAvailabilities, item]);

  return (
    <>
      <div className="flex flex-col lg:hidden pb-5">
        <div className="flex justify-between">
          <Typography placeholder="" className="text-dark font-bold text-base">
            {item.label}
          </Typography>
          <div className="flex gap-4">
            <Switch
              className="h-full w-full checked:bg-primary rounded-lg"
              containerProps={{
                className: "w-11 h-6",
              }}
              circleProps={{
                className:
                  "before:hidden left-0.5 border-none rounded-md w-5 h-5",
              }}
              crossOrigin=""
              onChange={handleChange}
              checked={item.enable}
            />
          </div>
        </div>
        <div className="flex items-center justify-between pt-5">
          <Select value={from} onChange={handleFrom} available={item.enable}>
            {SCHEDULE_TIMES.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </Select>
          <Typography
            placeholder=""
            className="text-base font-semibold text-lightDark"
          >
            To:
          </Typography>
          <Select value={to} onChange={handleTo} available={item.enable}>
            {SCHEDULE_TIMES.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div className="hidden lg:block p-1">
        <div className="flex justify-between items-center">
          <div className="grid grid-cols-3 w-1/2">
            <div className="col-span-1">
              <Typography
                placeholder=""
                className="text-dark font-bold text-base"
              >
                {item.label}
              </Typography>
            </div>
            <div className="col-span-2 flex items-center">
              <div className="flex gap-4">
                <Switch
                  className="h-full w-full checked:bg-secondary rounded-lg"
                  containerProps={{
                    className: "w-11 h-6",
                  }}
                  circleProps={{
                    className:
                      "before:hidden left-0.5 border-none rounded-md w-5 h-5",
                  }}
                  crossOrigin=""
                  onChange={handleChange}
                  checked={item.enable}
                />
                {item.enable ? (
                  <Typography
                    placeholder=""
                    className="text-secondary font-normal text-base"
                  >
                    Available
                  </Typography>
                ) : (
                  <Typography
                    placeholder=""
                    className="text-lightDark font-normal text-base"
                  >
                    Unavailable
                  </Typography>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Select value={from} onChange={handleFrom} available={item.enable}>
              {SCHEDULE_TIMES.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </Select>
            <Typography
              placeholder=""
              className="text-base font-semibold text-lightDark"
            >
              To:
            </Typography>
            <Select value={to} onChange={handleTo} available={item.enable}>
              {SCHEDULE_TIMES.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </Select>
          </div>
        </div>
      </div>
    </>
  );
}
