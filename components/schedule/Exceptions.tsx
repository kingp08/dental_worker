"use client";

import { useState } from "react";
import { IComponent } from "@/utils/interfaces";
import { Button, Typography } from "@/libraries/material-tailwind";
import { ICON_MAPPER } from "@/utils/constants";
import { SCHEDULE } from "@/utils/tempData";
import { Icon } from "@/libraries/iconify-react";
import DTExceptionItem from "./DTExceptionItem";
import MBExceptionItem from "./MBExceptionItem";
import AddDialog from "./AddDialog";

export default function Exceptions({ className = "" }: IComponent) {
  const [openAdd, setOpenAdd] = useState<boolean>(false);
  const handleAdd = () => setOpenAdd((cur) => !cur);

  return (
    <>
      <div className="p-6">
        <div className="flex justify-between gap-10 ">
          <div className="w-full lg:w-3/4">
            <div className="flex justify-between">
              <Typography
                placeholder=""
                className="text-dark font-bold text-lg"
              >
                Exceptions to availability
              </Typography>
              <div className="block md:hidden">
                <Button
                  placeholder=""
                  variant="filled"
                  className="bg-secondary flex items-center gap-2 p-2"
                  onClick={handleAdd}
                >
                  <Icon
                    icon={ICON_MAPPER.plus}
                    className="text-3xl text-bold"
                  />
                </Button>
              </div>
            </div>
            <Typography
              placeholder=""
              className="text-lightDark text-base pt-4"
            >
              Use this to designate specific times as unavailable. This is
              useful if you are going on vacation or are booked for a work
              assignment not through the platform.
            </Typography>
          </div>
          <div className=" w-full lg:w-1/4 hidden md:flex justify-end">
            <Button
              placeholder=""
              variant="filled"
              className="bg-secondary flex items-center gap-2 p-2 h-[50px]"
              onClick={handleAdd}
            >
              <Icon icon={ICON_MAPPER.plus} className="text-3xl text-bold" />
              <Typography placeholder="" className="text-base normal-case">
                Add Exception
              </Typography>
            </Button>
            <AddDialog openAdd={openAdd} setOpenAdd={setOpenAdd} />
          </div>
        </div>
        <div className="block lg:hidden pt-6">
          {SCHEDULE.map((item, index) => (
            <MBExceptionItem key={item.id} item={item} index={index} />
          ))}
        </div>
        <div className="hidden lg:block pt-6">
          <div className="py-3 px-8 bg-[#F8F4FF] rounded-lg flex items-center">
            <div className="w-full grid grid-cols-8 gap-2">
              <div className="col-span-2">
                <Typography
                  placeholder=""
                  className="text-dark font-bold text-sm"
                >
                  From
                </Typography>
              </div>
              <div className="col-span-2">
                <Typography
                  placeholder=""
                  className="text-dark font-bold text-sm"
                >
                  To
                </Typography>
              </div>
              <div className="col-span-2">
                <Typography
                  placeholder=""
                  className="text-dark font-bold text-sm text-center"
                >
                  Availibility
                </Typography>
              </div>
              <div className="col-span-2">
                <Typography
                  placeholder=""
                  className="text-dark font-bold text-sm text-center"
                >
                  Action
                </Typography>
              </div>
            </div>
          </div>
          {SCHEDULE.map((item, index) => (
            <DTExceptionItem key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </>
  );
}
