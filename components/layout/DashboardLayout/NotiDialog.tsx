import { ICON_MAPPER } from "@/utils/constants";
import { TEMP_NOTIFICATIONS } from "@/utils/tempData";
import { IComponent, INotification } from "@/utils/interfaces";
import { Icon } from "@/libraries/iconify-react";
import {
  Avatar,
  Dialog,
  DialogBody,
  DialogHeader,
  IconButton,
  List,
  ListItem,
  Typography,
} from "@/libraries/material-tailwind";
import type { DialogProps } from "@/libraries/material-tailwind";
import { ellipsisString, getErrorMessage } from "@/utils/functions";
import { useEffect, useState } from "react";
import api from "@/utils/api";
import { toast } from "@/libraries/react-toastify";
import Loading from "@/components/custom/Loading";

interface IProps extends IComponent {
  notiDialogOpened: boolean;
  setNotiDialogOpened: React.Dispatch<React.SetStateAction<boolean>>;
  size: DialogProps["size"];
}

const NotiDialog: React.FC<IProps> = ({
  notiDialogOpened,
  setNotiDialogOpened,
  size,
}: IProps) => {
  const handler = () => {
    setNotiDialogOpened(!notiDialogOpened);
  };

  const [notify, setNotify] = useState<[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getNotification = async() => {
      await api
        .get("/user/get/all/notifications/1")
          .then((res) => {
            setLoading(false);
            setNotify(res.data.notifications);
          })
          .catch((err) => {
            toast.error(getErrorMessage(err));
          });
    }
    getNotification();
  }, [])

  return (
    <Dialog
      placeholder=""
      handler={handler}
      open={notiDialogOpened}
      size={size}
    >
      <DialogHeader
        placeholder=""
        className="flex items-center justify-between pt-4 pb-0"
      >
        <Typography
          placeholder=""
          variant="h2"
          className="text-2xl font-bold text-dark"
        >
          Notifications
        </Typography>
        <IconButton
          placeholder=""
          className="text-2xl w-8 h-8"
          variant="text"
          onClick={handler}
        >
          <Icon icon={ICON_MAPPER.close} />
        </IconButton>
      </DialogHeader>

      <DialogBody placeholder="">
        <List placeholder="">
          { loading ? (
              <Loading />
            ) : (
          notify?.map((noti: INotification, i) => (
            <ListItem
              placeholder=""
              key={noti.id}
              className={`justify-between items-center${
                i === notify.length - 1
                  ? ""
                  : " border-b-2 border-[#F8F4FF]"
              }`}
            >
              <div className="flex-1 flex items-start gap-2">
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
                {noti.receivedAt}
              </Typography>
            </ListItem>
          )))}
        </List>
      </DialogBody>
    </Dialog>
  );
};

export default NotiDialog;
