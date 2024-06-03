"use client";

import React, { useState, useRef, useEffect } from "react";
import { IComponent, IBooking } from "@/utils/interfaces";
import CardTemplate from "../custom/CardTemplate";
import TabButton from "../custom/buttons/TabButton";
import { IconButton, Tooltip } from "@/libraries/material-tailwind";
import { Icon } from "@/libraries/iconify-react";
import { TEMP_BOOKING } from "@/utils/tempData";
import CalendarCard from "../dashboard/CalendarCard";
import DTBooking from "./DTBooking";
import MBBooking from "./MBBooking";
import api from "@/utils/api";
import { useUser } from "@/contexts/UserContext";

export default function BookingCard({ className = "" }: IComponent) {
  const [activeTab, setActiveTab] = useState<string>("Today");
  const [data, setData] = useState<IBooking[]>([]);
  const [isTooltipOpen, setIsTooltipOpen] = useState<boolean>(false);
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const iconButtonRef = useRef<HTMLButtonElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const pageNo: number = 1;
  const { userData } = useUser();

  const toggleTooltip = () => {
    setIsTooltipOpen(!isTooltipOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        (!tooltipRef.current ||
          !tooltipRef.current.contains(event.target as Node)) &&
        (!iconButtonRef.current ||
          !iconButtonRef.current.contains(event.target as Node)) &&
        (!calendarRef.current ||
          !calendarRef.current.contains(event.target as Node))
      ) {
        setIsTooltipOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 640);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const getData = async () => {
    let res: any = await api.post(`/jobs/professional/bookings/${pageNo}`);
    setData(res?.data);
  };

  useEffect(() => {
    if (!userData || userData?.userType == 1) return;
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function filterBookings() {
    const currentDate = new Date().toDateString();
    switch (activeTab) {
      case "Today":
        return data.filter((booking) => {
          const bookedDate = new Date(booking.bookedDateTime).toDateString();
          return bookedDate === currentDate;
        });
      case "Past":
        return data.filter((booking) => {
          const bookedDate = new Date(booking.bookedDateTime).toDateString();
          return bookedDate < currentDate;
        });
      case "Future":
        return data.filter((booking) => {
          const bookedDate = new Date(booking.bookedDateTime).toDateString();
          return bookedDate >= currentDate;
        });
      default:
        return data;
    }
  }

  return (
    <CardTemplate
      title="Bookings"
      className={`${className} col-span-9`}
      actions={
        <div ref={tooltipRef}>
          <Tooltip
            placement="bottom-start"
            content={
              isTooltipOpen ? (
                <div ref={calendarRef}>
                  <CalendarCard />
                </div>
              ) : null
            }
            className={`bg-white py-3 px-4 ${
              isSmallScreen ? "tooltip-center-small-screen" : ""
            }`}
            animate={{
              mount: { scale: 1, y: 0 },
              unmount: { scale: 0, y: 25 },
            }}
            open={isTooltipOpen}
            dismiss={{
              itemPress: false,
            }}
          >
            <IconButton
              placeholder=""
              variant="text"
              onClick={toggleTooltip}
              ref={iconButtonRef}
            >
              <Icon
                icon="solar:calendar-bold"
                className="text-2xl text-[#FF817B] active:text-[#e76761] hover:text-[#e76761] transition"
              />
            </IconButton>
          </Tooltip>
        </div>
      }
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <TabButton
            className="font-semibold"
            isActive={activeTab === "Today"}
            onClick={() => setActiveTab("Today")}
          >
            Today
          </TabButton>
          <TabButton
            className="font-semibold"
            isActive={activeTab === "Past"}
            onClick={() => setActiveTab("Past")}
          >
            Past
          </TabButton>
          <TabButton
            className="font-semibold"
            isActive={activeTab === "Future"}
            onClick={() => setActiveTab("Future")}
          >
            Future
          </TabButton>
        </div>
        <div className="hidden lg:block">
          <DTBooking filterBookings={filterBookings} />
        </div>
        <div className="block lg:hidden">
          <MBBooking filterBookings={filterBookings} />
        </div>
      </div>
    </CardTemplate>
  );
}
