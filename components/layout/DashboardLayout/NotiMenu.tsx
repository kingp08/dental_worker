import { useEffect, useState } from "react";
import {
  Avatar,
  List,
  ListItem,
  Typography,
} from "@/libraries/material-tailwind";
import { Icon } from "@/libraries/iconify-react";
import { TEMP_NOTIFICATIONS } from "@/utils/tempData";
import { ellipsisString, getErrorMessage } from "@/utils/functions";
import api from "@/utils/api";
import { toast } from "@/libraries/react-toastify";
import { INotification } from "@/utils/interfaces";
import Loading from "@/components/custom/Loading";

const NotiMenu = ({
  setNotiDialogOpened,
}: {
  setNotiDialogOpened: (value: boolean | ((prev: boolean) => boolean)) => void;
}) => {

  const [notify, setNotify] = useState<[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getNotification = async() => {
      await api
        .get("/user/get/top/notifications")
          .then((res) => {
            setLoading(false);
            setNotify(res.data);
          })
          .catch((err) => {
            toast.error(getErrorMessage(err));
          });
    }
    getNotification();
  })

  function timeconvert(timestamp : any){
    const formattedTime = new Date(timestamp).toLocaleTimeString([], { hour12: false });
    return formattedTime;
  }

  return (
    <List placeholder="">
      <div className="flex justify-between items-center">
        <Typography
          placeholder=""
          className="text-dark text-xl xl:text-lg font-bold"
        >
          Notification
        </Typography>
      </div>
      { loading ? (
          <Loading />
        ) : (
       notify.map((noti : INotification, i) => (
        <ListItem
          placeholder=""
          key={noti.id}
          className={`justify-between items-center${
            i === notify.length - 1
              ? ""
              : " border-b-2 border-[#F8F4FF]"
          }`}
        >
          <div className="flex-1 flex items-center gap-2">
            {noti.imgSrc ? (
              <Avatar
                variant="circular"
                placeholder=""
                src={noti.imgSrc}
                alt=""
                className="w-12 h-12"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-primary bg-opacity-10 flex flex-col items-center justify-center">
                <Icon
                  icon={noti.imgSrc}
                  className="text-primary text-2xl"
                />
              </div>
            )}
            <div className="flex-1 flex flex-col">
              <Typography
                placeholder=""
                className="text-dark text-sm font-semibold"
              >
                {noti.title}
              </Typography>
              <div className="flex justify-between">
                <Typography placeholder="" className="text-lightDark text-xs">
                  {ellipsisString(noti.content, 25)}
                </Typography>
                <Typography placeholder="" className="text-lightDark text-xs">
                  {
                    timeconvert(noti.receivedAt)
                  }
                </Typography>
              </div>
            </div>
          </div>
        </ListItem>
      )))}

      <Typography
        placeholder=""
        className="text-lightDark text-sm font-semibold text-center underline cursor-pointer pt-3"
        onClick={() => setNotiDialogOpened(true)}
      >
        See All
      </Typography>
    </List>
  );
};

export default NotiMenu;
