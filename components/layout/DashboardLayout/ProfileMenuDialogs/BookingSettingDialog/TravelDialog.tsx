import Image from "next/image";
import Button from "@/components/custom/buttons/Button";
import { IComponent, IBookingSetting } from "@/utils/interfaces";
import { Icon } from "@/libraries/iconify-react";
import { ICON_MAPPER } from "@/utils/constants";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  IconButton,
  Typography,
  Slider,
} from "@/libraries/material-tailwind";
import type { DialogProps } from "@/libraries/material-tailwind";
import { useState } from "react";

interface IProps extends IComponent {
  travelDialogOpened: boolean;
  setTravelDialogOpened: Function;
  setBookingSettingsDialogOpened: Function;
  originBookingSetting: IBookingSetting;
  newBookingSetting: IBookingSetting;
  setNewBookingSetting: Function;
  size: DialogProps["size"];
}

export default function TravelDialog({
  travelDialogOpened,
  setTravelDialogOpened,
  setBookingSettingsDialogOpened,
  originBookingSetting,
  newBookingSetting,
  setNewBookingSetting,
  size = "md",
}: IProps) {
  const [tempRadius, setTempRadius] = useState<number>(newBookingSetting.travelRadius);
  const handler = () => {
    setTravelDialogOpened(!travelDialogOpened);
    setBookingSettingsDialogOpened(true);
  };

  const travelRadiusChangeHandler = (v: React.ChangeEvent<HTMLInputElement>) => {
    setTempRadius(parseInt(v.currentTarget.value));
  }

  const handleNewTravelRadius = () => {
    setNewBookingSetting({
      ...newBookingSetting,
      travelRadius: tempRadius
    }); 
    setTravelDialogOpened(!travelDialogOpened);
    setBookingSettingsDialogOpened(true);
  }

  return (
    <Dialog
      placeholder=""
      handler={handler}
      open={travelDialogOpened}
      size={size}
      className="h-[80%] overflow-y-auto"
    >
      <DialogHeader placeholder="" className="flex justify-end pt-4 ">
        <IconButton
          placeholder=""
          className="text-2xl text-lightDark w-8 h-8"
          variant="text"
          onClick={handler}
        >
          <Icon icon={ICON_MAPPER.close} />
        </IconButton>
      </DialogHeader>
      <DialogBody placeholder="" className="px-10 xl:px-20 pb:10 xl:pb-20 pt-0">
        <Typography
          placeholder=""
          variant="h2"
          className="text-3xl font-bold text-dark pb-6 xl:pb-12"
        >
          How far you will go
        </Typography>
        <Typography
          placeholder=""
          className="text-lg font-bold text-lightDark pb-1"
        >
          Travel radius
        </Typography>
        <Typography
          placeholder=""
          className="text-base font-normal text-lightDark pb-1"
        >
          The farther you travel, the more offices that open up to you. More
          offices = more booking opportunities = more money.
        </Typography>
        <Typography placeholder="" className="text-lg font-bold text-dark pb-6">
          How many miles you&apos;ll travel?
        </Typography>
        <div className="flex flex-col justify-center items-center border border-[#F6F4F9] rounded-lg p-3 xl:p-6">
          <Typography
            placeholder=""
            className="text-lg font-bold text-dark pb-6"
          >
            {tempRadius} Miles
          </Typography>
          <div className="w-96">
            <Slider
              placeholder=""
              defaultValue={tempRadius}
              className="text-secondary"
              barClassName="rounded-lg bg-secondary"
              thumbClassName="[&::-moz-range-thumb]:rounded-null [&::-webkit-slider-thumb]:rounded-full [&::-moz-range-thumb]:-mt-[40px] [&::-webkit-slider-thumb]:-mt-[4px]"
              trackClassName="[&::-webkit-slider-runnable-track]:bg-transparent [&::-moz-range-track]:bg-transparent rounded-none !bg-[#2ec946]/10 border border-[#2ec946]/20 "
              onChange={(v) => travelRadiusChangeHandler(v)}
            />
            <Typography
              placeholder=""
              className="text-base font-normal text-lightDark text-center pt-3 xl:pt-6"
            >
              Average in Your Area
            </Typography>
            <Typography
              placeholder=""
              className="text-base font-normal text-dark text-center pt-1"
            >
              {originBookingSetting.travelRadius} Miles
            </Typography>
          </div>
        </div>
        <div className="w-full rounded-lg mt-6">
          <Image
            src="/assets/images/map.png"
            width={300}
            height={250}
            className="w-full h-auto rounded-lg"
            alt=""
            priority={true}
          />
          <div className="flex justify-end pt-6">
            <Button variant="filled" color="secondary" className="py-2 px-8" onClick={() => handleNewTravelRadius()}>
              Done
            </Button>
          </div>
        </div>
      </DialogBody>
    </Dialog>
  );
}
