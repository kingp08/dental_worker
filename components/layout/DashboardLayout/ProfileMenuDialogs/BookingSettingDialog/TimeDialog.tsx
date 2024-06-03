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
  timeDialogOpened: boolean;
  setTimeDialogOpened: Function;
  setBookingSettingsDialogOpened: Function;
  originBookingSetting: IBookingSetting;
  newBookingSetting: IBookingSetting;
  setNewBookingSetting: Function;
  size: DialogProps["size"];
}

export default function TimeDialog({
  timeDialogOpened,
  setTimeDialogOpened,
  setBookingSettingsDialogOpened,
  originBookingSetting,
  newBookingSetting,
  setNewBookingSetting,
  size = "md",
}: IProps) {
  const [tempMinimumHours, setTempMinimumHours] = useState<number>(newBookingSetting.minHours);

  const handler = () => {
    setTimeDialogOpened(!timeDialogOpened);
    setBookingSettingsDialogOpened(true);
  };

  const travelRadiusChangeHandler = (v: React.ChangeEvent<HTMLInputElement>) => {
    setTempMinimumHours(parseInt(v.currentTarget.value));
  }

  const handleTimeRadius = () => {
    setNewBookingSetting({
      ...newBookingSetting,
      minHours: tempMinimumHours
    }); 
    setTimeDialogOpened(!timeDialogOpened);
    setBookingSettingsDialogOpened(true);
  }

  return (
    <Dialog
      placeholder=""
      handler={handler}
      open={timeDialogOpened}
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
          Worth my time
        </Typography>
        <Typography
          placeholder=""
          className="text-lg font-bold text-lightDark pb-1"
        >
          Minimum bookable hours
        </Typography>
        <Typography
          placeholder=""
          className="text-base font-normal text-lightDark pb-1"
        >
          What is the minimum number of hours you would accept in a booking
          request from an office?
        </Typography>
        <Typography placeholder="" className="text-lg font-bold text-dark pb-6">
          Your minimum hours accepted
        </Typography>
        <div className="flex flex-col justify-center items-center border border-[#F6F4F9] p-3 xl:p-6">
          <Typography
            placeholder=""
            className="text-lg font-bold text-dark pb-6"
          >
            {tempMinimumHours} Hours
          </Typography>
          <div className="w-full">
            <Slider
              placeholder=""
              defaultValue={tempMinimumHours * 100 / 8}
              min={1}
              max={8}
              className="text-secondary"
              barClassName="rounded-lg bg-secondary"
              thumbClassName="[&::-moz-range-thumb]:rounded-null [&::-webkit-slider-thumb]:rounded-full [&::-moz-range-thumb]:-mt-[40px] [&::-webkit-slider-thumb]:-mt-[4px]"
              trackClassName="bg-[#F6F4F9] rounded-lg "
              onChange={(v) => travelRadiusChangeHandler(v)}
            />
            <div className="grid grid-cols-3 pt-6">
              <div className="col-span-1">
                <Typography
                  placeholder=""
                  className="text-base font-normal text-lightDark pt-3 xl:pt-6"
                >
                  Min
                </Typography>
                <Typography
                  placeholder=""
                  className="text-base font-normal text-dark pt-1"
                >
                  1 Hour
                </Typography>
              </div>
              <div className="col-span-1">
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
                  {originBookingSetting.minHours} hours
                </Typography>
              </div>
              <div className="col-span-1">
                <Typography
                  placeholder=""
                  className="text-base font-normal text-lightDark text-end pt-3 xl:pt-6"
                >
                  Max
                </Typography>
                <Typography
                  placeholder=""
                  className="text-base font-normal text-dark text-end pt-1"
                >
                  8 hours
                </Typography>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full rounded-lg mt-6">
          <div className="flex justify-end pt-6">
            <Button variant="filled" color="secondary" className="py-2 px-8" onClick={() => handleTimeRadius()}>
              Done
            </Button>
          </div>
        </div>
      </DialogBody>
    </Dialog>
  );
}
