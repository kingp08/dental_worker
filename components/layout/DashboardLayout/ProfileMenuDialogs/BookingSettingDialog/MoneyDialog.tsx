import { useState, useEffect} from "react";
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
  MTInput,
} from "@/libraries/material-tailwind";
import type { DialogProps } from "@/libraries/material-tailwind";

interface IProps extends IComponent {
  moneyDialogOpened: boolean;
  setMoneyDialogOpened: Function;
  setBookingSettingsDialogOpened: Function;
  originBookingSetting: IBookingSetting;
  newBookingSetting: IBookingSetting;
  setNewBookingSetting: Function;
  size: DialogProps["size"];
}

export default function MoneyDialog({
  moneyDialogOpened,
  setMoneyDialogOpened,
  setBookingSettingsDialogOpened,
  originBookingSetting,
  newBookingSetting,
  setNewBookingSetting,
  size = "md",
}: IProps) {
  const handler = () => {
    setMoneyDialogOpened(!moneyDialogOpened);
    setBookingSettingsDialogOpened(true);
  };

  const [value, setValue] = useState<number>(0);

  const handleChange = (e: any) => {
    setValue(e.target.value);
  };

  const handleHourlyRate = () => {
    setNewBookingSetting({
      ...newBookingSetting,
      hourlyRate: value
    }); 
    setMoneyDialogOpened(!moneyDialogOpened);
    setBookingSettingsDialogOpened(true);
  }

  useEffect(() => {
    setValue(originBookingSetting.hourlyRate);
  }, [])

  return (
    <Dialog
      placeholder=""
      handler={handler}
      open={moneyDialogOpened}
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
          Money, money
        </Typography>
        <Typography
          placeholder=""
          className="text-lg font-bold text-lightDark pb-1"
        >
          Set your hourly rate
        </Typography>
        <Typography
          placeholder=""
          className="text-base font-normal text-lightDark pb-4"
        >
          If you are new to the site and don’t have many positive reviews yet,
          you may want to set your rate below the average until you gain some
          experience and positive reviews.
        </Typography>
        <Typography
          placeholder=""
          className="text-base font-normal text-lightDark pb-4"
        >
          The average hourly rate paid by offices for your role and location is:{" "}
          <span className="text-base font-bold text-dark">$57/hr</span>
        </Typography>
        <Typography
          placeholder=""
          className="text-base font-normal text-lightDark pb-4"
        >
          What rate would you like to list on your profile?
        </Typography>
        <div className="flex justify-center items-center pt-6">
          <Typography
            placeholder=""
            className="text-xl font-bold text-dark pr-2 xl:pt-4"
          >
            $
          </Typography>
          <div>
            {/* <MTInput
              value={value}
              className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
              labelProps={{
                className: "hidden",
              }}
              containerProps={{ className: "w-[50px]" }}
              crossOrigin={undefined}
              onChange={handleChange}
            /> */}
            <input
              type="number"
              defaultValue={value}
              className="border border-[#F3EBFF] focus:!border-gray-500 focus:outline-none focus-visible:!border-gray-500 text-dark font-bold"
              onChange={e => handleChange(e)}
            />
          </div>
          <Typography
            placeholder=""
            className="text-xl font-bold text-dark pl-2"
          >
            /hr
          </Typography>
        </div>
        <div className="pt-6">
          <Typography
            placeholder=""
            className="text-base font-normal text-lightDark pb-4"
          >
            <span className="text-base font-bold text-dark pr-1">NOTE:</span>
            Your hourly rate must be in whole dollars.
            <span className="text-secondary font-normal pl-2">Read More</span>
          </Typography>
        </div>
        <div className="w-full rounded-lg mt-4">
          <div className="flex justify-end pt-6">
            <Button variant="filled" color="secondary" className="py-2 px-8" onClick={() => handleHourlyRate()}>
              Done
            </Button>
          </div>
        </div>
      </DialogBody>
    </Dialog>
  );
}
