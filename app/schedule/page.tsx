"use client";
import { useEffect } from "react";
import { toast } from "@/libraries/react-toastify";
import api from "@/utils/api";
import { getErrorMessage } from "@/utils/functions";
import { useSchedule } from "@/contexts/ScheduleContext";
import Schedule from "@/components/schedule";
import useLoading from "@/hooks/useLoading";
import { useUser } from "@/contexts/UserContext";

let isFirstLoad = true;

export default function SchedulePage() {
  const { setWeekAvailabilities } = useSchedule();
  const { setIsLoading } = useLoading();
  const { userData } = useUser();

  useEffect(() => {
    if (!userData || userData?.userType == 1) return;
    if (isFirstLoad) {
      (async () => {
        setIsLoading(true);
        await api
          .get("/schedule/get/availability")
          .then((res) => {
            const { data } = res.data;
            setWeekAvailabilities(data?.daysAvailable || []);
          })
          .catch((err) => {
            toast.error(getErrorMessage(err));
          });

        await api.get("/schedule/get/blocked/dates").then((res) => {
          const { data } = res.data;
          if (data) {
          }
        });
        setIsLoading(false);
      })();
    }
    isFirstLoad = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Schedule />;
}
