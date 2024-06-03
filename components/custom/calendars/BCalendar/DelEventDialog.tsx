import { AllHTMLAttributes } from "react";
import type { DialogProps } from "@/libraries/material-tailwind";
import { Dialog, DialogBody, Typography } from "@/libraries/material-tailwind";
import { Icon } from "@/libraries/iconify-react";
import moment from "@/libraries/moment";
import { ICON_MAPPER } from "@/utils/constants";
import { IEvent } from "@/utils/interfaces";
import Button from "@/components/custom/buttons/Button";
import api from "@/utils/api";
import { toast } from "react-toastify";
import { getErrorMessage } from "@/utils/functions";
import { useCalendar } from "@/contexts/CalendarContext";

interface IProps extends AllHTMLAttributes<HTMLDivElement> {
  opened: boolean;
  setOpened: (value: boolean | ((prev: boolean) => boolean)) => void;
  dialogSize: DialogProps["size"];
  event: IEvent;
}

export default function DelEventDialog({
  opened,
  setOpened,
  dialogSize,
  event,
}: IProps) {
  const { setEvents } = useCalendar();

  const handleDelete = () => {
    api
      .get(`/calendar/unset/dates/block/${event.id}`)
      .then((res) => {
        setEvents((prev) => {
          const newEvents = [...prev];
          newEvents.splice(
            newEvents.findIndex((item) => item.id === event.id),
            1
          );
          return newEvents;
        });
        toast.success("Success. The event has been deleted.");
        setOpened(false);
      })
      .catch((err) => {
        toast.error(getErrorMessage(err));
      });
  };

  return (
    <Dialog placeholder="" open={opened} handler={setOpened} size={dialogSize}>
      <DialogBody placeholder="" className="flex flex-col items-center gap-8">
        <div className="w-1/3 flex justify-center py-8 bg-secondary/5 rounded-lg">
          <Icon icon={ICON_MAPPER.trash} className="text-secondary text-5xl" />
        </div>

        <Typography placeholder="" className="text-lightDark text-center">
          Are you sure want to delete?
          <br /> This exception from{" "}
          <span className="font-bold text-dark">
            {" "}
            {moment(event.start).format("MM/DD/YYYY hh:mm a")} to{" "}
            {moment(event.end).format("MM/DD/YYYY hh:mm a")}
          </span>
          .
        </Typography>

        <div className="flex items-center gap-4">
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setOpened(false)}
          >
            Cancel
          </Button>
          <Button variant="outlined" color="lightDark" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </DialogBody>
    </Dialog>
  );
}
