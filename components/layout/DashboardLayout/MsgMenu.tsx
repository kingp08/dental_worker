import {
  Avatar,
  List,
  ListItem,
  Typography,
} from "@/libraries/material-tailwind";
import { TEMP_MESSAGES } from "@/utils/tempData";
import { IMsg } from "@/utils/interfaces";
import { ellipsisString } from "@/utils/functions";
import { useEffect, useState } from "react";
import api from "@/utils/api";

const MsgMenu: React.FC = () => {
  const [messages, setMessages] = useState([]);

  const setData = async () => {
    const res = await api.get("/user/get/latest/messages");
    setMessages(res?.data);
  };

  useEffect(() => {
    setData();
  }, []);

  return (
    <List placeholder="">
      <div className="flex justify-between items-center">
        <Typography
          placeholder=""
          className="text-dark text-xl xl:text-lg font-bold"
        >
          Messages
        </Typography>
        <Typography
          placeholder=""
          className="text-lightDark text-sm font-semibold underline cursor-pointer"
        >
          See All
        </Typography>
      </div>
      {messages?.slice(0, 5).map((message: IMsg, i: number) => (
        <ListItem
          placeholder=""
          key={message.id}
          className={`gap-4 items-center${
            i === TEMP_MESSAGES.length - 1 ? "" : " border-b-2 border-[#F8F4FF]"
          }`}
        >
          <Avatar
            variant="circular"
            placeholder=""
            src={message?.senderData?.avatar}
            alt=""
            className="w-12 h-12"
          />

          <div className="flex flex-col">
            <Typography
              placeholder=""
              className="text-dark text-base font-semibold"
            >
              {message?.senderData?.name}
            </Typography>
            <Typography placeholder="" className="text-lightDark text-sm">
              {ellipsisString(message.message, 55)}
            </Typography>
          </div>
        </ListItem>
      ))}
    </List>
  );
};

export default MsgMenu;
