import { useState, useEffect } from "react";
import TravelDialog from "./TravelDialog";
import TimeDialog from "./TimeDialog";
import MoneyDialog from "./MoneyDialog";
import { IComponent, IBookingSetting } from "@/utils/interfaces";
import { Icon } from "@/libraries/iconify-react";
import { ICON_MAPPER } from "@/utils/constants";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  IconButton,
  Typography,
} from "@/libraries/material-tailwind";
import api from "@/utils/api";
import { toast } from "react-toastify";
import type { DialogProps } from "@/libraries/material-tailwind";
import { getErrorMessage } from "@/utils/functions";

interface IProps extends IComponent {
  bookingSettingsDialogOpened: boolean;
  setBookingSettingsDialogOpened: (value: boolean) => void;
  size: DialogProps["size"];
}

export default function BookingSettingsDialogue({
  bookingSettingsDialogOpened,
  setBookingSettingsDialogOpened,
  size = "lg",
}: IProps) {
  const handler = () => {
    setBookingSettingsDialogOpened(!bookingSettingsDialogOpened);
  };

  const [travelDialogOpened, setTravelDialogOpened] = useState<boolean>(false);
  const [timeDialogOpened, setTimeDialogOpened] = useState<boolean>(false);
  const [moneyDialogOpened, setMoneyDialogOpened] = useState<boolean>(false);
  const [originBookingSetting, setOriginBookingSetting] =
    useState<IBookingSetting>({
      travelRadius: 0,
      minHours: 0,
      hourlyRate: 0,
    });
  const [newBookingSetting, setNewBookingSetting] = useState<IBookingSetting>({
    travelRadius: 30,
    minHours: 3,
    hourlyRate: 10,
  });

  const travelDialogHandler = () => {
    setTravelDialogOpened(true);
    setBookingSettingsDialogOpened(false);
  };

  const timeDialogHandler = () => {
    setTimeDialogOpened(true);
    setBookingSettingsDialogOpened(false);
  };

  const moneyDialogHandler = () => {
    setMoneyDialogOpened(true);
    setBookingSettingsDialogOpened(false);
  };

  useEffect(() => {
    api
      .get("/user/get/business/settings")
      .then((res) => {
        const oBookingSetting = res.data;
        if (!oBookingSetting) {
          toast.error(
            "Error! Something happened in getting origin booking setting from server."
          );
          return;
        }
        setOriginBookingSetting(oBookingSetting);
      })
      .catch((err) => {
        toast.error(getErrorMessage(err));
      });
  }, []);

  const setNewBookingSettingHandler = (value: IBookingSetting) => {
    setNewBookingSetting(value);
    api
      .post("/user/save/business/settings", value)
      .then((res) => {
        const isSuccess = res.data;

        if (isSuccess) {
          toast.success("Success! Booking settings are changed.");
        } else {
          toast.warn("Booking settings change failed.");
        }
      })
      .catch((err) => {
        toast.error(getErrorMessage(err));
      });
  };

  return (
    <>
      <Dialog
        placeholder=""
        handler={handler}
        open={bookingSettingsDialogOpened}
        size={size}
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
        <DialogBody
          placeholder=""
          className="px-10 xl:px-20 pb:10 xl:pb-20 pt-0"
        >
          <div className="pb-6 xl:pb-12">
            <Typography
              placeholder=""
              variant="h2"
              className="text-3xl font-bold text-dark pb-6 xl:pb-12"
            >
              Booking Settings
            </Typography>
            <Typography
              placeholder=""
              className="text-sm font-normal text-lightDark pb-4"
            >
              When offices search for professionals, these settings will be used
              to determine which professionals are willing to travel to their
              office, to work the number of hours in the shift, and what that
              will cost them.
            </Typography>
            <Typography
              placeholder=""
              className="text-sm font-normal text-lightDark"
            >
              Enter the values that work for you. You can change them at
              anytime, but once you agree to a booking, they will remain part of
              that agreement.
            </Typography>
          </div>
          <div className="grid grid-cols-3 gap-3 xl:gap-6">
            <div className="col-span-1 border border-[#F6F4F9] rounded-lg p-6">
              <div className="flex justify-between items-center pb-1">
                <Typography
                  placeholder=""
                  variant="h4"
                  className="text-base font-bold text-dark"
                >
                  Travel Radius
                </Typography>
                <Icon
                  icon={ICON_MAPPER.edit}
                  className="w-4 h-4 text-secondary cursor-pointer"
                  onClick={travelDialogHandler}
                />
              </div>
              <Typography
                placeholder=""
                variant="h4"
                className="text-sm font-semibold text-dark pb-4"
              >
                {newBookingSetting.travelRadius
                  ? `${newBookingSetting.travelRadius} miles`
                  : `None set`}
              </Typography>
              <Typography
                placeholder=""
                className="text-sm font-bold text-lightDark"
              >
                Average for your area
              </Typography>
              <Typography
                placeholder=""
                className="text-sm font-semibold text-lightDark"
              >
                {originBookingSetting.travelRadius} miles
              </Typography>
            </div>
            <div className="col-span-1 border border-[#F6F4F9] rounded-lg p-6">
              <div className="flex justify-between items-center pb-1">
                <Typography
                  placeholder=""
                  variant="h4"
                  className="text-base font-bold text-dark"
                >
                  Minimum hours
                </Typography>
                <Icon
                  icon={ICON_MAPPER.edit}
                  className="w-4 h-4 text-secondary cursor-pointer"
                  onClick={timeDialogHandler}
                />
              </div>
              <Typography
                placeholder=""
                variant="h4"
                className="text-sm font-semibold text-dark pb-4"
              >
                {newBookingSetting.minHours} hours
              </Typography>
              <Typography
                placeholder=""
                className="text-sm font-bold text-lightDark"
              >
                Average for your area
              </Typography>
              <Typography
                placeholder=""
                className="text-sm font-semibold text-lightDark"
              >
                {originBookingSetting.minHours} hours
              </Typography>
            </div>
            <div className="col-span-1 border border-[#F6F4F9] rounded-lg p-6">
              <div className="flex justify-between items-center pb-1">
                <Typography
                  placeholder=""
                  variant="h4"
                  className="text-base font-bold text-dark"
                >
                  Hourly rate
                </Typography>
                <Icon
                  icon={ICON_MAPPER.edit}
                  className="w-4 h-4 text-secondary cursor-pointer"
                  onClick={moneyDialogHandler}
                />
              </div>
              <Typography
                placeholder=""
                variant="h4"
                className="text-sm font-semibold text-dark pb-4"
              >
                ${newBookingSetting.hourlyRate} / hr
              </Typography>
              <Typography
                placeholder=""
                className="text-sm font-bold text-lightDark"
              >
                Average for your area
              </Typography>
              <Typography
                placeholder=""
                className="text-sm font-semibold text-lightDark"
              >
                ${originBookingSetting.hourlyRate} / hr
              </Typography>
            </div>
          </div>
        </DialogBody>
      </Dialog>
      <TravelDialog
        travelDialogOpened={travelDialogOpened}
        setTravelDialogOpened={setTravelDialogOpened}
        setBookingSettingsDialogOpened={setBookingSettingsDialogOpened}
        originBookingSetting={originBookingSetting}
        newBookingSetting={newBookingSetting}
        setNewBookingSetting={setNewBookingSettingHandler}
        size="md"
      />
      <TimeDialog
        timeDialogOpened={timeDialogOpened}
        setTimeDialogOpened={setTimeDialogOpened}
        setBookingSettingsDialogOpened={setBookingSettingsDialogOpened}
        originBookingSetting={originBookingSetting}
        newBookingSetting={newBookingSetting}
        setNewBookingSetting={setNewBookingSettingHandler}
        size="md"
      />
      <MoneyDialog
        moneyDialogOpened={moneyDialogOpened}
        setMoneyDialogOpened={setMoneyDialogOpened}
        setBookingSettingsDialogOpened={setBookingSettingsDialogOpened}
        originBookingSetting={originBookingSetting}
        newBookingSetting={newBookingSetting}
        setNewBookingSetting={setNewBookingSettingHandler}
        size="md"
      />
    </>
  );
}
