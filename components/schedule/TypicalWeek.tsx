"use client";
import { Fragment, useState } from "react";
import Image from "next/image";
import { Button, Typography } from "@/libraries/material-tailwind";
import { ICON_MAPPER } from "@/utils/constants";
import { Icon } from "@/libraries/iconify-react";
import { toast } from "@/libraries/react-toastify";
import TypicalItem from "./TypicalItem";
import CardTemplate from "../custom/CardTemplate";
import api from "@/utils/api";
import { getErrorMessage } from "@/utils/functions";
import { IWeekAvailability } from "@/utils/interfaces";

export default function TypicalWeek() {
  const [weekAvailabilities, setWeekAvailabilities] = useState<
    Array<IWeekAvailability>
  >([
    {
      id: "1",
      enable: true,
      label: "Mondays",
      days: [
        {
          isAvailable: true,
          from: "",
          to: "",
        },
      ],
    },
    {
      id: "2",
      enable: true,
      label: "Tuesdays",
      days: [
        {
          isAvailable: true,
          from: "",
          to: "",
        },
      ],
    },
    {
      id: "3",
      enable: true,
      label: "Wednesdays",
      days: [
        {
          isAvailable: true,
          from: "",
          to: "",
        },
      ],
    },
    {
      id: "4",
      enable: true,
      label: "Thursdays",
      days: [
        {
          isAvailable: true,
          from: "",
          to: "",
        },
      ],
    },
    {
      id: "5",
      enable: true,
      label: "Fridays",
      days: [
        {
          isAvailable: true,
          from: "",
          to: "",
        },
      ],
    },
    {
      id: "6",
      enable: true,
      label: "Saturdays",
      days: [
        {
          isAvailable: true,
          from: "",
          to: "",
        },
      ],
    },
    {
      id: "7",
      enable: true,
      label: "Sundays",
      days: [
        {
          isAvailable: true,
          from: "",
          to: "",
        },
      ],
    },
  ]);

  const saveWeekAvailabilities = () => {
    api
      .post("/schedule/save/weekly/availability", {
        days: weekAvailabilities,
      })
      .then((res) => {
        if (res.data.success) {
          toast.success("Saved Sucessfully");
        }
      })
      .catch((err) => {
        toast.error(getErrorMessage(err));
      });
  };

  return (
    <>
      <div className="bg-[#FFE6E5] grid grid-cols-12 gap-2 rounded-lg items-center p-6 pb-0 mb-6">
        <div className="col-span-12 lg:col-span-3 hidden lg:block">
          <Image
            src="/assets/images/scheduleImg.png"
            width={200}
            height={200}
            className="w-full h-full"
            alt=""
          />
        </div>
        <div className="col-span-12 lg:col-span-6 flex flex-col justify-center">
          <Typography placeholder="" className="text-dark font-bold text-lg">
            Is your schedule up to date?
          </Typography>
          <Typography placeholder="" className="text-lightDark text-base">
            Expires in 6 days,{" "}
            <span className="text-dark font-bold">23:00:45 hrs </span>
            Not yet live, and is pending admin review
          </Typography>
        </div>
        <div className="col-span-12 lg:col-span-3 hidden lg:block">
          <div className="flex justify-center gap-2">
            <Button
              placeholder=""
              variant="filled"
              className="bg-[#FFF] flex items-center gap-2 py-1 xl:py-2 px-3 xl:px-3"
            >
              <Icon
                icon={ICON_MAPPER.edit}
                className="text-md text-secondary w-6 h-6"
              />
              <Typography placeholder="" className="text-lightDark text-sm">
                Edit
              </Typography>
            </Button>
            <Button
              placeholder=""
              variant="filled"
              className="bg-[#FFF] flex items-center gap-2 py-1 xl:py-2 px-3 xl:px-3"
              onClick={saveWeekAvailabilities}
            >
              <Icon
                icon={ICON_MAPPER.check}
                className="text-md text-success w-6 h-6"
              />
              <Typography placeholder="" className="text-lightDark text-sm">
                Yes
              </Typography>
            </Button>
          </div>
        </div>
        <div className="col-span-12 flex lg:hidden items-center gap-5 w-full h-[70px]">
          <Image
            src="/assets/images/scheduleImg.png"
            width={100}
            height={50}
            className=""
            alt=""
          />
          <div className="flex gap-2 justify-center items-center">
            <Button
              placeholder=""
              variant="filled"
              className="bg-[#FFF] flex items-center gap-2 py-1 xl:py-2 px-2 xl:px-3 normal-case"
            >
              <Icon
                icon={ICON_MAPPER.edit}
                className="text-md text-secondary w-4 h-4"
              />
              <Typography placeholder="" className="text-lightDark text-sm">
                Edit
              </Typography>
            </Button>
            <Button
              placeholder=""
              variant="filled"
              className="bg-[#FFF] flex items-center gap-2 py-1 xl:py-2 px-2 xl:px-3 normal-case"
              onClick={saveWeekAvailabilities}
            >
              <Icon
                icon={ICON_MAPPER.check}
                className="text-md text-success w-4 h-4"
              />
              <Typography placeholder="" className="text-lightDark text-sm">
                Yes
              </Typography>
            </Button>
          </div>
        </div>
      </div>
      <CardTemplate title="" className="block xl:hidden">
        <Typography placeholder="" className="text-dark font-bold text-lg pb-6">
          Weekly Schedule
        </Typography>
        <div className="flex flex-col items-stretch gap-2">
          {weekAvailabilities.map((item, index) => (
            <Fragment key={item.id}>
              <TypicalItem
                item={item}
                weekAvailabilities={weekAvailabilities}
                setWeekAvailabilities={setWeekAvailabilities}
              />
              {index + 1 !== weekAvailabilities.length && <hr />}
            </Fragment>
          ))}
        </div>
      </CardTemplate>
      <div className="hidden xl:block">
        <Typography placeholder="" className="text-dark font-bold text-lg pb-6">
          Weekly Schedule
        </Typography>
        <div className="flex flex-col items-stretch gap-4">
          {weekAvailabilities.map((item, index) => (
            <Fragment key={item.id}>
              <TypicalItem
                item={item}
                weekAvailabilities={weekAvailabilities}
                setWeekAvailabilities={setWeekAvailabilities}
              />
              {index + 1 !== weekAvailabilities.length && <hr />}
            </Fragment>
          ))}
        </div>
      </div>
    </>
  );
}
