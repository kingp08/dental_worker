import { AllHTMLAttributes, useEffect, useState } from "react";
import Image from "next/image";
import {
  IconButton,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@/libraries/material-tailwind";
import { Icon } from "@/libraries/iconify-react";
import { IMessage, IUserItem } from "@/utils/interfaces";
import { ICON_MAPPER } from "@/utils/constants";
import Button from "@/components/custom/buttons/Button";
import { TEMP_CHAT_HISTORIES } from "@/components/messages/tempData";
import ReceivedMessage from "@/components/messages/Chat/ReceivedMessage";
import SentMessage from "@/components/messages/Chat/SentMessage";
import type { TUserItem } from "@/app/messages/page";
import api from "@/utils/api";

interface IProps extends AllHTMLAttributes<HTMLDivElement> {
  user: IUserItem;
  setSelectedUser: (
    value: TUserItem | ((prev: TUserItem) => TUserItem)
  ) => void;
}

const MENU_DATA = [
  // {
  //   icon: ICON_MAPPER.search,
  //   label: "Search",
  // },
  // {
  //   icon: ICON_MAPPER.mute,
  //   label: "Mute",
  // },
  {
    icon: ICON_MAPPER.userBlock,
    label: "Block",
  },
  // {
  //   icon: ICON_MAPPER.userReport,
  //   label: "Report",
  // },
  {
    icon: ICON_MAPPER.trash,
    label: "Delete Chat",
  },
];

export default function Chat({
  className = "",
  user,
  setSelectedUser,
}: IProps) {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<any>([]);
  // const [messages, setMessages] =
  //   useState<Array<IMessage>>(TEMP_CHAT_HISTORIES);
  const [menuOpened, setMenuOpened] = useState<boolean>(false);

  const handleMessage = async () => {
    let res = await api.post("/user/send/message", {
      receiverId: user.id,
      message,
    });
    if (res.status === 200) {
      setMessages((prev: any) => [
        {
          id: prev.length,
          message,
          isReceived: false,
          sentAt: "now",
        },
        ...prev,
      ]);
      setMessage("");
    }
  };

  const getData = async () => {
    let res = await api.post("/user/get/messages", {
      chatterId: user.id,
    });
    setMessages(res.data);
    console.log(res.data.sort((a: any, b: any) => a.sentAt - b.sentAt));
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <IconButton
            placeholder=""
            className="w-8 h-8 text-lg block xl:hidden"
            variant="text"
            onClick={() => setSelectedUser(null)}
          >
            <Icon icon={ICON_MAPPER.leftLongArrow} />
          </IconButton>
          <Image
            alt=""
            src={user?.chatterData?.avatar || ""}
            width={54}
            height={54}
            className="h-auto"
          />
          <div className="flex flex-col items-start justify-between">
            <Typography placeholder="" className="text-lg font-bold text-dark">
              {user?.chatterData?.name}
            </Typography>
            <span className="text-success text-sm">Available</span>
          </div>
        </div>
        <Menu open={menuOpened} handler={setMenuOpened}>
          <MenuHandler>
            <IconButton
              variant="text"
              placeholder=""
              className="text-xl"
              onClick={() => setMenuOpened((prev) => !prev)}
            >
              <Icon icon={ICON_MAPPER.vEllipsis} />
            </IconButton>
          </MenuHandler>
          <MenuList placeholder="">
            {MENU_DATA.map((item) => (
              <MenuItem
                placeholder=""
                key={item.label}
                className="flex items-center gap-2 text-lightDark"
              >
                <Icon icon={item.icon} className="text-2xl" />
                <span className="text-base">{item.label}</span>
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </div>

      <hr />

      <div className="grow h-[100px] overflow-auto pr-4 flex flex-col-reverse gap-4">
        {messages
          ?.sort(
            (a: any, b: any) =>
              new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime()
          )
          ?.map((msg: any) =>
            msg.isReceived ? (
              <ReceivedMessage key={msg.id} user={user} message={msg} />
            ) : (
              <SentMessage key={msg.id} message={msg} />
            )
          )}
      </div>

      <form
        className="flex items-start gap-2 md:gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleMessage();
        }}
      >
        <textarea
          name="message"
          className="w-full border border-gray-200 rounded-md px-3 py-1"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (!e.ctrlKey && !e.shiftKey) {
                e.preventDefault();
                return handleMessage();
              }
            }
          }}
        />
        <Button
          type="submit"
          variant="filled"
          color="secondary"
          className="text-white text-sm py-2 hidden md:block"
        >
          Send
        </Button>
        <IconButton
          type="submit"
          placeholder=""
          variant="filled"
          className="bg-secondary text-2xl w-32 h-32 rounded-base block md:hidden"
        >
          <Icon icon={ICON_MAPPER.send} />
        </IconButton>
      </form>
    </div>
  );
}
