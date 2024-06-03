"use client";
import { useEffect } from "react";
import { Card, CardBody } from "@/libraries/material-tailwind";
import { toast } from "@/libraries/react-toastify";
import api from "@/utils/api";
import { getErrorMessage } from "@/utils/functions";
import useLoading from "@/hooks/useLoading";
import { useCalendar } from "@/contexts/CalendarContext";
import BCalendar from "@/components/custom/calendars/BCalendar";
import { IEvent } from "@/utils/interfaces";
import { useUser } from "@/contexts/UserContext";

let isFirstLoad = true;

export default function CalendarPage() {
  const { setIsLoading } = useLoading();
  const { setEvents } = useCalendar();
  const {userData} = useUser();

  useEffect(() => {
    if(!userData || userData?.userType == 1) return ;
    if (isFirstLoad) {
      setIsLoading(true);
      api
        .post("/calendar/events/list")
        .then((res) => {
          const processedData: Array<IEvent> = res.data.map(
            (dataItem: {
              id: string;
              title: string;
              doubleBooked: boolean;
              date: string;
            }) => ({
              id: dataItem.id,
              title: dataItem.title,
              doubleBooked: dataItem.doubleBooked,
              start: new Date(`${dataItem.date}T00:00:00.00Z`),
              end: new Date(`${dataItem.date}T23:59:59.00Z`),
            })
          );
          setEvents(processedData);
          setIsLoading(false);
        })
        .catch((err) => {
          toast.error(getErrorMessage(err));
          setIsLoading(false);
        });
    }
    isFirstLoad = false;
  }, []);

  return (
    <Card placeholder="" className="h-full">
      <CardBody placeholder="" className="h-full">
        <BCalendar />
      </CardBody>
    </Card>
  );
}
