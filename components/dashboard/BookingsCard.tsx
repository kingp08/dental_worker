"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { IBooking, IComponent } from "@/utils/interfaces";
import { PATH_MAPPER } from "@/utils/constants";
import CardTemplate from "@/components/custom/CardTemplate";
import TabButton from "@/components/custom/buttons/TabButton";
import { List, ListItem, Typography } from "@/libraries/material-tailwind";
import StatusBadge from "@/components/custom/StatusBadge";
import moment from "@/libraries/moment";
import api from "@/utils/api";
import { toast } from "@/libraries/react-toastify";
import { getErrorMessage } from "@/utils/functions";


interface IBookings {
  id: number;
  title: string;
  bookedAt: string;
  status: string;
}

export default function BookingsCard({ className = "" }: IComponent) {
  const [activeTab, setActiveTab] = useState<string>("Today");
  const [bookings, setBookings] = useState<IBookings[]>();

  function filterBookings() {
    switch (activeTab) {
      case "Today":
        return bookings;
      case "Past":
        return bookings?.filter((booking) => booking.status === "Completed");
      case "Future":
        return bookings?.filter((booking) => booking.status === "Pending");
      default:
        return bookings;
    }
  }


  useEffect(() => {
    api
      .post("/jobs/professional/dashboard/bookings")
      .then((res) => {
        setBookings(res.data);
      })
      .catch((err) => {
        toast.error(getErrorMessage(err));
      });
  }, []);

  return (
    <CardTemplate
      title="Bookings"
      className={className}
      actions={
        <Link href={PATH_MAPPER.bookings} className="underline text-lightDark">
          See All
        </Link>
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
            isActive={activeTab === "Future"}
            onClick={() => setActiveTab("Future")}
          >
            Future
          </TabButton>
          <TabButton
            className="font-semibold"
            isActive={activeTab === "Past"}
            onClick={() => setActiveTab("Past")}
          >
            Past
          </TabButton>
        </div>

        <List placeholder="">
          {filterBookings()?.map((b, i) => (
            <ListItem
              placeholder=""
              key={b.id}
              className={`flex items-center justify-between${
                i !== filterBookings.length - 1 ? " border-b-2 border-[#F8F4FF]" : ""
              }`}
            >
              <div className="flex flex-col">
                <Typography
                  placeholder=""
                  className="text-dark text-base xl:text-lg font-semibold"
                >
                  {b.title}
                </Typography>
                <Typography
                  placeholder=""
                  className="text-lightDark text-sm xl:text-base"
                >
                  {moment(b.bookedAt).format("llll")}
                </Typography>
              </div>

              <StatusBadge status={b.status.toLowerCase()}>{b.status}</StatusBadge>
            </ListItem>
          ))}
        </List>
      </div>
    </CardTemplate>
  );
}
