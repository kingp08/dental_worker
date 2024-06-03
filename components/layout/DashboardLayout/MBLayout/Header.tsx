"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IComponent } from "@/utils/interfaces";
import {
  Avatar,
  Badge,
  IconButton,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@/libraries/material-tailwind";
import { Icon } from "@/libraries/iconify-react";
import RecommendAlert from "@/components/layout/DashboardLayout/RecommendAlert";
import Navbar from "@/components/layout/DashboardLayout/MBLayout/Navbar";
import { ICON_MAPPER, PATH_MAPPER } from "@/utils/constants";
import { TEMP_MESSAGES, TEMP_NOTIFICATIONS } from "@/utils/tempData";
import { ellipsisString } from "@/utils/functions";
import NotiDialog from "@/components/layout/DashboardLayout/NotiDialog";

export default function Header({ className = "" }: IComponent) {
  const [navbarOpened, setNavbarOpened] = useState<boolean>(false);
  const [messagesMenuOpened, setMessagesMenuOpened] = useState<boolean>(false);
  const [notisMenuOpened, setNotisMenuOpened] = useState<boolean>(false);
  const [notiDialogOpened, setNotiDialogOpened] = useState<boolean>(false);

  const handleMessagesMenuOpened = () => {
    setMessagesMenuOpened((prev) => !prev);
  };

  const handleNotisMenuOpened = () => {
    setNotisMenuOpened((prev) => !prev);
  };

  return (
    <>
      <header className={`px-4 py-4 flex flex-col gap-4 ${className}`}>
        <div className="flex items-center justify-between">
          <Link href="/">
            <Image
              src="/assets/images/logo_mb.png"
              alt=""
              width={133}
              height={24}
              className="h-auto"
            />
          </Link>

          <div className="flex items-center gap-2">
            <Menu open={messagesMenuOpened} handler={handleMessagesMenuOpened}>
              <MenuHandler>
                <Badge color="red">
                  <IconButton
                    placeholder=""
                    variant="text"
                    className="text-2xl text-primary w-8 h-8"
                    onClick={handleMessagesMenuOpened}
                  >
                    <Icon icon={ICON_MAPPER.message} />
                  </IconButton>
                </Badge>
              </MenuHandler>
              <MenuList placeholder="" className="mt-7 w-full">
                <div className="flex items-center justify-between mt-3 mb-4">
                  <Typography
                    placeholder=""
                    variant="h2"
                    className="text-xl font-bold text-dark"
                  >
                    Messages
                  </Typography>
                  <Link
                    href={PATH_MAPPER.messages}
                    className="underline text-lightDark"
                  >
                    See All
                  </Link>
                </div>
                {TEMP_MESSAGES.map((message, i) => (
                  <MenuItem
                    placeholder=""
                    key={message.id}
                    className={`flex items-start gap-2${
                      i !== TEMP_MESSAGES.length - 1
                        ? " border-b-2 border-[#F8F4FF]"
                        : ""
                    }`}
                  >
                    <Avatar
                      variant="circular"
                      placeholder=""
                      src={message.imgSrc}
                      alt=""
                      className="w-12 h-12"
                    />

                    <div className="flex flex-col">
                      <Typography
                        placeholder=""
                        className="text-dark text-base xl:text-lg font-semibold"
                      >
                        {message.sender}
                      </Typography>
                      <Typography
                        placeholder=""
                        className="text-lightDark text-sm xl:text-base"
                      >
                        {ellipsisString(message.message, 80)}
                      </Typography>
                    </div>
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>

            <Menu open={notisMenuOpened} handler={handleNotisMenuOpened}>
              <MenuHandler>
                <Badge color="red">
                  <IconButton
                    placeholder=""
                    variant="text"
                    className="text-2xl text-primary w-8 h-8"
                    onClick={handleNotisMenuOpened}
                  >
                    <Icon icon={ICON_MAPPER.notification} />
                  </IconButton>
                </Badge>
              </MenuHandler>
              <MenuList placeholder="" className="mt-7 w-full">
                <div className="flex items-center justify-between mt-3 mb-4">
                  <Typography
                    placeholder=""
                    variant="h2"
                    className="text-xl font-bold text-dark"
                  >
                    Notifications
                  </Typography>
                  <button
                    className="underline text-lightDark"
                    onClick={() => setNotiDialogOpened(true)}
                  >
                    See All
                  </button>
                </div>
                {TEMP_NOTIFICATIONS.map((noti, i) => (
                  <MenuItem
                    placeholder=""
                    key={noti.id}
                    className={`flex items-center gap-2${
                      i !== TEMP_NOTIFICATIONS.length - 1
                        ? " border-b-2 border-[#F8F4FF]"
                        : ""
                    }`}
                  >
                    <div className="flex-1 flex items-start gap-2">
                      {noti.avatar.isImage ? (
                        <Avatar
                          variant="circular"
                          placeholder=""
                          src={noti.avatar.src}
                          alt=""
                          className="w-12 h-12"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-primary bg-opacity-10 flex flex-col items-center justify-center">
                          <Icon
                            icon={noti.avatar.src}
                            className="text-primary text-2xl"
                          />
                        </div>
                      )}
                      <div className="flex-1 flex flex-col">
                        <Typography
                          placeholder=""
                          className="text-dark text-base xl:text-lg font-semibold"
                        >
                          {noti.title}
                        </Typography>
                        <Typography
                          placeholder=""
                          className="text-lightDark text-sm xl:text-base"
                        >
                          {ellipsisString(noti.content, 60)}
                        </Typography>
                      </div>
                    </div>

                    <Typography
                      placeholder=""
                      className="text-lightDark text-sm xl:text-base"
                    >
                      {noti.notifiedAt}
                    </Typography>
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>

            <IconButton
              placeholder=""
              variant="text"
              className="text-2xl text-primary w-8 h-8"
              onClick={() => setNavbarOpened(true)}
            >
              <Icon icon={ICON_MAPPER.menu} />
            </IconButton>
          </div>
        </div>

        <RecommendAlert />
      </header>
      <Navbar opened={navbarOpened} setOpened={setNavbarOpened} />
      <NotiDialog
        notiDialogOpened={notiDialogOpened}
        setNotiDialogOpened={setNotiDialogOpened}
        size="xxl"
      />
    </>
  );
}
