"use client";

import React, { useState, useEffect } from "react";
import StatusBadge from "@/components/custom/StatusBadge";
import { IComponent } from "@/utils/interfaces";
import { Icon } from "@/libraries/iconify-react";
import { ICON_MAPPER, STATUS_MAPPER } from "@/utils/constants";
import {
  Dialog,
  DialogBody,
  Typography,
  IconButton,
  DialogProps,
  Switch,
} from "@/libraries/material-tailwind";
import { FastField } from "formik";
import api from "@/utils/api";
import { toast } from "react-toastify";
import { getErrorMessage } from "@/utils/functions";

interface IProps extends IComponent {
  notificationDialog: boolean;
  setNotificationDialog: React.Dispatch<React.SetStateAction<boolean>>;
  size: DialogProps["size"];
}

interface INotiCategories {
  id: string;
  label: string;
}

interface INotiSettings {
  job: boolean;
  booking: boolean;
  message: boolean;
  review: boolean;
  scheduleReminder: boolean;
}

const NOTI_CATEGORIES: INotiCategories[] = [
  {
    id: "job",
    label: "Job Applicants",
  },
  {
    id: "booking",
    label: "Bookings",
  },
  {
    id: "message",
    label: "Messages",
  },
  {
    id: "review",
    label: "Reviews",
  },
  {
    id: "scheduleReminder",
    label: "New talent",
  },
];

const NotificationsDialog: React.FC<IProps> = ({
  notificationDialog,
  setNotificationDialog,
  size,
}: IProps) => {
  const [notificationSettings, setNotificationSettings] = useState<
    INotiSettings | any
  >({
    job: false,
    booking: false,
    message: false,
    review: false,
    scheduleReminder: false,
  });

  const handler = () => {
    setNotificationDialog(!notificationDialog);
  };

  const handleChange = (id: string) => {
    const tempSettings: INotiSettings | any = notificationSettings;
    tempSettings[id] = !notificationSettings[id];
    setNotificationSettings(tempSettings);
    api
      .post("user/notification/settings", notificationSettings)
      .then((res) => {
        toast.success("Notification setting changed!");
      })
      .catch((err) => {
        toast.error(getErrorMessage(err));
      });
  };

  useEffect(() => {
    api
      .get("user/notification/settings")
      .then((res) => {
        const notiSettings: INotiSettings = res.data;
        if (notiSettings) {
          setNotificationSettings(notiSettings);
        }
      })
      .catch((err) => {
        toast.error(getErrorMessage(err));
      });
  }, []);

  return (
    <>
      <Dialog
        placeholder=""
        handler={handler}
        open={notificationDialog}
        size={size}
        className="h-[80%] overflow-y-auto"
      >
        <DialogBody placeholder="">
          <div className="hidden ss:flex justify-end">
            <IconButton
              placeholder=""
              className="text-2xl text-lightDark w-8 h-8"
              variant="text"
              onClick={handler}
            >
              <Icon icon={ICON_MAPPER.close} />
            </IconButton>
          </div>
          <div className="p-6 sm:px-10 xl:px-20">
            <div className="flex justify-between items-center">
              <Typography
                placeholder=""
                className="text-xl md:2xl lg:text-3xl xl:text-4xl text-dark font-bold"
              >
                Notification
              </Typography>
              <Icon
                icon={ICON_MAPPER.close}
                className="flex text-dark font-bold text-xl ss:hidden cursor-pointer"
                onClick={handler}
              />
            </div>
            <div className="py-6">
              <Typography
                placeholder=""
                className="text-sm md:text-base lg:text-lg xl:text-xl text-dark font-bold"
              >
                Contact Info:
              </Typography>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <Icon
                  icon={ICON_MAPPER.mail}
                  className="text-primary w-4 h-4"
                />
                <Typography
                  placeholder=""
                  className="text-xs lg:text-sm text-lightDark font-normal"
                >
                  yehonatan.delonte@deecie.com
                </Typography>
                <StatusBadge status={STATUS_MAPPER.notVerified}>
                  {STATUS_MAPPER.notVerified}
                </StatusBadge>
              </div>
              <div className="flex items-center gap-3">
                <Icon
                  icon={ICON_MAPPER.phone}
                  className="text-primary w-4 h-4"
                />
                <Typography
                  placeholder=""
                  className="text-xs lg:text-sm text-lightDark font-normal"
                >
                  Verify Mobile Number
                </Typography>
              </div>
              <div className="flex items-center gap-3">
                <Icon
                  icon={ICON_MAPPER.notification}
                  className="text-primary w-4 h-4"
                />
                <Typography
                  placeholder=""
                  className="text-xs lg:text-sm text-lightDark font-normal"
                >
                  In app notifications
                </Typography>
              </div>
            </div>
            <div className="pt-6">
              <div className="px-6 py-3 bg-[#FCFAFF] rounded-lg">
                <Typography
                  placeholder=""
                  className="text-base text-dark font-semibold"
                >
                  Notification Categories:
                </Typography>
                {NOTI_CATEGORIES.map((item: INotiCategories, index: number) => (
                  <div
                    key={item.id}
                    className={`flex items-center justify-between px-6 py-5${
                      index !== NOTI_CATEGORIES.length - 1
                        ? " border-b-2 border-[#F8F4FF]"
                        : ""
                    }`}
                  >
                    <Typography
                      placeholder=""
                      className="text-sm text-dark font-semibold"
                    >
                      {item.label}
                    </Typography>
                    <Switch
                      defaultChecked={notificationSettings[item.id]}
                      className="h-full w-full checked:bg-secondary rounded-md"
                      containerProps={{
                        className: "w-11 h-6",
                      }}
                      circleProps={{
                        className:
                          "before:hidden left-0.5 border-none rounded-md w-5 h-5",
                      }}
                      crossOrigin={undefined}
                      onChange={() => handleChange(item.id)}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="pt-6">
              <div className="flex flex-col gap-2">
                <Typography
                  placeholder=""
                  className="text-xs text-lightDark font-semibold"
                >
                  For each enabled category, you agree to receive text messages
                  from Dental Jobs. Message and data rates may apply. Message
                  frequency varies.
                </Typography>
                <Typography
                  placeholder=""
                  className="text-xs text-lightDark font-semibold"
                >
                  For more information, visit our{" "}
                  <span className="text-secondary underline">
                    Terms of Service
                  </span>{" "}
                  and{" "}
                  <span className="text-secondary underline">
                    Privacy Policy
                  </span>
                  . For help, email{" "}
                  <span className="text-secondary underline">
                    serviceadentaljobs.com
                  </span>{" "}
                  or call{" "}
                  <span className="text-secondary underline">
                    (844) 643-3128
                  </span>
                  . You may also text HELP in response to any text message from
                  us. To opt-out of texts, reply STOP or visit this page and
                  opt-out of the category of text that you would like to stop.
                </Typography>
              </div>
            </div>
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
};

export default NotificationsDialog;
