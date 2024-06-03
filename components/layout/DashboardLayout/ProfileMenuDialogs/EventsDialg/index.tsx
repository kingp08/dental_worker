import React, { useEffect, useState } from "react";
import TabButton from "../../../../custom/buttons/TabButton";
import { IComponent, IEvent } from "@/utils/interfaces";
import { Icon } from "@/libraries/iconify-react";
import { ICON_MAPPER } from "@/utils/constants";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  IconButton,
  ListItem,
  Avatar,
  Typography,
} from "@/libraries/material-tailwind";
import type { DialogProps } from "@/libraries/material-tailwind";
import api from "@/utils/api";
import { toast } from "react-toastify";
import { getErrorMessage } from "@/utils/functions";
import moment from "moment";

interface IProps extends IComponent {
  eventsDialogOpened: boolean;
  setEventsDialogOpened: Function;
  size: DialogProps["size"];
}

export default function EventsDialog({
  eventsDialogOpened,
  setEventsDialogOpened,
  size = "lg",
}: IProps) {
  const handler = () => {
    setEventsDialogOpened(!eventsDialogOpened);
  };

  const [activeTab, setActiveTab] = useState<string>("New");
  const [eventList, setEventList] = useState<IEvent[]>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    api.post("/calendar/events/list")
    .then(res => {
      setLoading(false);
      setEventList(res.data);
    })
    .catch((err) => {
      toast.error(getErrorMessage(err));
    })
  }, [])

  return (
    <Dialog
      placeholder=""
      handler={handler}
      open={eventsDialogOpened}
      size={size}
    >
      <DialogHeader placeholder="" className="flex justify-end">
        <IconButton
          placeholder=""
          className="text-2xl text-lightDark w-8 h-8"
          variant="text"
          onClick={handler}
        >
          <Icon icon={ICON_MAPPER.close} />
        </IconButton>
      </DialogHeader>
      <DialogBody placeholder="" className="px-10 xl:px-20">
        <Typography
          placeholder=""
          className="text-3xl text-dark font-bold  pb-8"
        >
          Events
        </Typography>
        <TabButton
          className="font-bold"
          isActive={activeTab === "New"}
          onClick={() => setActiveTab("New")}
        >
          New
        </TabButton>
        <div>
          {eventList?.map((event : IEvent) => (
            <ListItem
              placeholder=""
              key={event.id}
              className={`justify-between items-center${
                eventList?.length - 1
                  ? ""
                  : " border-b-2 border-[#F8F4FF]"
              }`}
            >
              <div className="flex items-center gap-3">
                <div>
                  <Typography
                    placeholder=""
                    className="text-base text-dark font-bold"
                  >
                    {event.title}
                  </Typography>
                  {event?.date ? 
                    <Typography
                    placeholder=""
                    className="text-base text-lightDark font-normal"
                  >
                    Date : {moment(event.date).format("MMM Do YY")}
                  </Typography>
                   :
                  <>
                   <Typography
                    placeholder=""
                    className="text-base text-lightDark font-normal"
                  >
                    Start : {moment(event.end).format("MMM Do YY")}
                  </Typography>
                  <Typography
                    placeholder=""
                    className="text-base text-lightDark font-normal"
                  >
                    End : {moment(event.start).format("MMM Do YY")}
                  </Typography>
                  </>
                  }
                </div>
              </div>
            </ListItem>
          ))}
        </div>
      </DialogBody>
    </Dialog>
  );
}
