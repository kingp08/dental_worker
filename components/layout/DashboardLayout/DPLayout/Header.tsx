"use client";

import { AllHTMLAttributes, useCallback, useState } from "react";
import { usePathname } from "next/navigation";
import { ICON_MAPPER, PATHNAME_MAPPER } from "@/utils/constants";
import {
  Avatar,
  Badge,
  IconButton,
  Typography,
  Menu,
  MenuHandler,
  MenuList,
} from "@/libraries/material-tailwind";
import { Icon } from "@/libraries/iconify-react";
import RecommendAlert from "@/components/layout/DashboardLayout/RecommendAlert";
import Msgmenu from "../MsgMenu";
import NotiMenu from "@/components/layout/DashboardLayout/NotiMenu";
import ProfileDialog from "../ProfileMenuDialogs/ProfileDialog";
import BookingSettingsDialogue from "../ProfileMenuDialogs/BookingSettingDialog";
import OfficesDialog from "../ProfileMenuDialogs/OfficeDialog";
import EventsDialog from "../ProfileMenuDialogs/EventsDialg";
import BillingInfoDialog from "../ProfileMenuDialogs/BillingInfoDialog";
import NotificationDialog from "../ProfileMenuDialogs/NotificationDialog";
import AccountSettingDialog from "../ProfileMenuDialogs/AccountSettingDialog/AccountSettingDialog";
import LogOutDialogue from "../ProfileMenuDialogs/LogoutDialog/LogOutDialogue";
import { useUser } from "@/contexts/UserContext";
import EmptyAvatar from "@/components/custom/EmptyAvatar";
import UserMenu from "../UserMenu";

interface IProps extends AllHTMLAttributes<HTMLDivElement> {
  setNotiDialogOpened: (value: boolean | ((prev: boolean) => boolean)) => void;
}

export default function Header({
  className = "",
  setNotiDialogOpened,
}: IProps) {
  const pathname = usePathname();
  const { userData } = useUser();

  //Menu//
  const [msgMenuOpened, setMsgMenuOpened] = useState<boolean>(false);
  const [NotiMenuOpened, setNotiMenuOpened] = useState<boolean>(false);

  const handleMsgMenuOpened = () => {
    setMsgMenuOpened((prev) => !prev);
  };
  const handleNotiMenuOpened = () => {
    setNotiMenuOpened((prev) => !prev);
  };

  //Dialogs//
  const [accountMenuOpened, setAccountMenuOpened] = useState<boolean>(false);
  const [profileDialogOpened, setProfileDialogOpened] =
    useState<boolean>(false);
  const [bookingSettingsDialogOpened, setBookingSettingsDialogOpened] =
    useState<boolean>(false);
  const [officesDialogOpened, setOfficesDialogOpened] =
    useState<boolean>(false);
  const [eventsDialogOpened, setEventsDialogOpened] = useState<boolean>(false);
  const [billingInfoDialogOpened, setBillingInfoDialogOpened] =
    useState<boolean>(false);
  const [notificationDialogOpened, setNotificationDialogOpened] =
    useState<boolean>(false);
  const [accountSettingDialogOpened, setAccountSettingDialogOpened] =
    useState<boolean>(false);
  const [logOutDialogOpened, setLogOutDialogOpened] = useState<boolean>(false);

  const handleAccountMenuOpened = () => {
    setAccountMenuOpened((prev) => !prev);
  };

  const handleMenuClick = useCallback((title: string) => {
    switch (title) {
      case "My Public Profile":
        setProfileDialogOpened(true);
        break;
      case "Booking Settings":
        setBookingSettingsDialogOpened(true);
        break;
      case "Offices":
        setOfficesDialogOpened(true);
        break;
      // case "Events":
      //   setEventsDialogOpened(true);
      //   break;
      case "Billing Info":
        setBillingInfoDialogOpened(true);
        break;
      case "Notifications":
        setNotificationDialogOpened(true);
        break;
      case "Account Settings":
        setAccountSettingDialogOpened(true);
        break;
      case "Log out":
        setLogOutDialogOpened(true);
        break;
      default:
        break;
    }
  }, []);

  return (
    <>
      <header className={`${className} flex justify-between items-center mt-3`}>
        <Typography
          placeholder=""
          variant="h1"
          className="text-3xl font-bold text-dark"
        >
          {PATHNAME_MAPPER[pathname || ""] || ""}
        </Typography>

        <div className="flex items-center gap-4">
          <RecommendAlert />

          <Menu
            open={msgMenuOpened}
            handler={handleMsgMenuOpened}
            placement="bottom"
            animate={{
              mount: { y: 0 },
              unmount: { y: 25 },
            }}
          >
            <MenuHandler>
              <Badge color="red">
                <IconButton
                  placeholder=""
                  variant="text"
                  className="text-3xl text-primary w-8 h-8"
                  onClick={handleMsgMenuOpened}
                >
                  <Icon icon={ICON_MAPPER.message} />
                </IconButton>
              </Badge>
            </MenuHandler>
            <MenuList
              placeholder=""
              className="mt-7 rounded-lg bg-white shadow-custom"
            >
              <Msgmenu />
            </MenuList>
          </Menu>

          <Menu
            open={NotiMenuOpened}
            handler={handleNotiMenuOpened}
            placement="bottom"
          >
            <MenuHandler>
              <Badge color="red">
                <IconButton
                  placeholder=""
                  variant="text"
                  className="text-3xl text-primary w-8 h-8"
                  onClick={handleNotiMenuOpened}
                >
                  <Icon icon={ICON_MAPPER.notification} />
                </IconButton>
              </Badge>
            </MenuHandler>
            <MenuList
              placeholder=""
              className="mt-7 rounded-lg bg-white shadow-custom"
            >
              <NotiMenu setNotiDialogOpened={setNotiDialogOpened} />
            </MenuList>
          </Menu>

          <Menu
            open={accountMenuOpened}
            handler={handleAccountMenuOpened}
            placement="bottom"
          >
            <MenuHandler>
              {userData?.avatar ? (
                <Avatar
                  src={userData.avatar}
                  alt="Avatar"
                  placeholder="Avatar"
                  variant="circular"
                  size="md"
                  onClick={handleAccountMenuOpened}
                />
              ) : (
                <EmptyAvatar
                  className="w-12 h-12"
                  onClick={handleAccountMenuOpened}
                />
              )}
            </MenuHandler>
            <MenuList
              placeholder=""
              className="mt-7 rounded-lg bg-white shadow-custom w-[20%]"
            >
              <UserMenu handleMenuClick={handleMenuClick} />
            </MenuList>
          </Menu>
        </div>
      </header>
      <ProfileDialog
        profileDialogOpened={profileDialogOpened}
        setProfileDialogOpened={setProfileDialogOpened}
        size="xl"
      />
      <BookingSettingsDialogue
        bookingSettingsDialogOpened={bookingSettingsDialogOpened}
        setBookingSettingsDialogOpened={setBookingSettingsDialogOpened}
        size="lg"
      />
      <OfficesDialog
        officesDialogOpened={officesDialogOpened}
        setOfficesDialogOpened={setOfficesDialogOpened}
        size="lg"
      />
      {/* <EventsDialog
        eventsDialogOpened={eventsDialogOpened}
        setEventsDialogOpened={setEventsDialogOpened}
        size="lg"
      /> */}
      <BillingInfoDialog
        billingInfoDialogOpened={billingInfoDialogOpened}
        setBillingInfoDialogOpened={setBillingInfoDialogOpened}
        size="lg"
      />
      <NotificationDialog
        notificationDialog={notificationDialogOpened}
        setNotificationDialog={setNotificationDialogOpened}
        size="md"
      />
      <AccountSettingDialog
        accountSettingDialogOpened={accountSettingDialogOpened}
        setAccountSettingDialogOpened={setAccountSettingDialogOpened}
        size="lg"
      />
      <LogOutDialogue
        opened={logOutDialogOpened}
        setOpened={setLogOutDialogOpened}
        size="xs"
      />
    </>
  );
}
