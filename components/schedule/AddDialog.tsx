"use client";

import { ChangeEvent, useState } from "react";
import { IComponent } from "@/utils/interfaces";
import Select from "@/components/custom/Select";
import { ICON_MAPPER, MONTH_NAMES, SCHEDULE_TIMES } from "@/utils/constants";
import {
  Typography,
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Radio,
} from "@/libraries/material-tailwind";
import { Icon } from "@/libraries/iconify-react";

interface IProps extends IComponent {
  openAdd: boolean;
  setOpenAdd: (open: boolean) => void;
}

const FROM_DATE = [
  { id: 1, date: 14, day: "Fri" },
  { id: 2, date: 15, day: "Sat" },
  { id: 3, date: 16, day: "Sun" },
  { id: 4, date: 17, day: "Mon" },
  { id: 5, date: 18, day: "Tue" },
  { id: 6, date: 19, day: "Wed" },
  { id: 7, date: 20, day: "Thu" },
  { id: 8, date: 21, day: "Fri" },
];

export default function AddDialog({
  className = "",
  openAdd,
  setOpenAdd,
}: IProps) {
  const handleSave = () => {
    setOpenAdd(!openAdd);
  };

  const [from, setFrom] = useState<string>(MONTH_NAMES[11]);
  const [to, setTo] = useState<string>(MONTH_NAMES[11]);

  const handleFrom = (e: ChangeEvent<HTMLSelectElement>) => {
    setFrom(e.target.value);
  };

  const handleTo = (e: ChangeEvent<HTMLSelectElement>) => {
    setTo(e.target.value);
  };

  return (
    <Dialog
      placeholder=""
      size="lg"
      open={openAdd}
      handler={() => setOpenAdd(!openAdd)}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0, y: 25 },
      }}
      className="bg-transparent shadow-none h-[95%] overflow-y-auto"
    >
      <Card placeholder="" className="mx-auto w-full">
        <CardBody placeholder="" className="flex flex-col gap-4 p-5 lg:p-10">
          <div>
            <Typography
              placeholder=""
              className="text-4xl text-dark font-bold py-9"
            >
              New availability exception
            </Typography>
          </div>
          <div>
            <div className="flex justify-between items-center">
              <Typography placeholder="" className="text-base text-lightDark">
                From
              </Typography>
              <div className="flex gap-4">
                <Select value={from} onChange={handleFrom}>
                  {MONTH_NAMES.map((month) => (
                    <option key={month} value={month}>
                      {month} 2023
                    </option>
                  ))}
                </Select>
                <div className="flex gap-2">
                  <div className="flex items-center p-2 border border-[#F3EBFF] rounded-lg">
                    <Icon
                      icon={ICON_MAPPER.leftArrow}
                      className="text-sm text-secondary"
                    />
                  </div>
                  <div className="flex items-center p-2 border border-[#F3EBFF] rounded-lg">
                    <Icon
                      icon={ICON_MAPPER.rightArrow}
                      className="text-sm text-secondary"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-8 gap-2 pt-6">
              {FROM_DATE.map((item) => (
                <div key={item.id} className="col-span-2 lg:col-span-1">
                  <div
                    className={`py-4 px-5 border ${
                      item.day === "Sat" ? "border-primary" : "border-[#F3EBFF]"
                    }  rounded-lg`}
                  >
                    <Typography
                      placeholder=""
                      className={`text-base text-center ${
                        item.day === "Sat" ? "text-primary" : "text-lightDark"
                      }`}
                    >
                      {item.date}
                    </Typography>
                    <Typography
                      placeholder=""
                      className={`text-base text-center ${
                        item.day === "Sat" ? "text-primary" : "text-lightDark"
                      }`}
                    >
                      {item.day}
                    </Typography>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center">
              <Typography placeholder="" className="text-base text-lightDark">
                To
              </Typography>
              <div className="flex gap-4">
                <Select value={to} onChange={handleTo}>
                  {MONTH_NAMES.map((month) => (
                    <option key={month} value={month}>
                      {month} 2023
                    </option>
                  ))}
                </Select>
                <div className="flex gap-2">
                  <div className="flex items-center p-2 border border-[#F3EBFF] rounded-lg">
                    <Icon
                      icon={ICON_MAPPER.leftArrow}
                      className="text-sm text-lightDark"
                    />
                  </div>
                  <div className="flex items-center p-2 border border-[#F3EBFF] rounded-lg">
                    <Icon
                      icon={ICON_MAPPER.rightArrow}
                      className="text-sm text-lightDark"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-8 gap-2 pt-6">
              {FROM_DATE.map((item) => (
                <div key={item.id} className="col-span-2 lg:col-span-1">
                  <div
                    className={`py-4 px-5 border ${
                      item.day === "Sat" ? "border-primary" : "border-[#F3EBFF]"
                    }  rounded-lg`}
                  >
                    <Typography
                      placeholder=""
                      className={`text-base text-center ${
                        item.day === "Sat" ? "text-primary" : "text-lightDark"
                      }`}
                    >
                      {item.date}
                    </Typography>
                    <Typography
                      placeholder=""
                      className={`text-base text-center ${
                        item.day === "Sat" ? "text-primary" : "text-lightDark"
                      }`}
                    >
                      {item.day}
                    </Typography>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <Radio
              crossOrigin=""
              name="type"
              defaultChecked
              label={
                <Typography
                  placeholder=""
                  className="text-sm font-semibold text-lightDark"
                >
                  Set to unavailable
                </Typography>
              }
              className="border-primary before:bg-primary checked:border-primary checked:before:border-primary checked:before:bg-primary text-primary"
              iconProps={{
                className: "text-primary",
              }}
            />
            <hr className="bg-lightDark w-full" />
          </div>
          <div>
            <Radio
              crossOrigin=""
              name="description"
              label={
                <div>
                  <Typography
                    placeholder=""
                    className="text-sm font-semibold text-lightDark"
                  >
                    Set to available at these times
                  </Typography>
                  <div>
                    <div className="flex items-center gap-4">
                      <Select value={from} onChange={handleFrom}>
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
                      <Select value={to} onChange={handleTo}>
                        {SCHEDULE_TIMES.map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </Select>
                    </div>
                  </div>
                </div>
              }
              className="border-primary before:bg-primary checked:border-primary checked:before:border-primary checked:before:bg-primary text-primary"
              iconProps={{
                className: "text-primary",
              }}
            />
            <hr className="bg-lightDark w-full mt-4" />
          </div>
          <div>
            <Radio
              crossOrigin=""
              name="description"
              label={
                <div>
                  <Typography
                    placeholder=""
                    className="text-sm font-semibold text-lightDark"
                  >
                    Use availability as set in{" "}
                    <span className="text-primary underline">
                      Typical Availability
                    </span>
                  </Typography>
                </div>
              }
              className="border-primary before:bg-primary checked:border-primary checked:before:border-primary checked:before:bg-primary text-primary"
              iconProps={{
                className: "text-primary",
              }}
            />
          </div>
        </CardBody>
        <CardFooter placeholder="" className="py-0 p-10">
          <div className="flex gap-3 justify-end">
            <Button
              placeholder=""
              variant="outlined"
              onClick={handleSave}
              className="text-primary border border-primary"
            >
              Cancel
            </Button>
            <Button
              placeholder=""
              variant="filled"
              onClick={handleSave}
              className="bg-secondary"
            >
              Save
            </Button>
          </div>
        </CardFooter>
      </Card>
    </Dialog>
  );
}
