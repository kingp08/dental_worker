"use client";

import React from "react";
import { Typography, ListItem } from "@/libraries/material-tailwind";
import { IconButton } from "@/libraries/material-tailwind";
import { Icon } from "@/libraries/iconify-react";
import { ICON_MAPPER } from "@/utils/constants";
import StatusBadge from "../custom/StatusBadge";
import Link from "next/link";

interface IProps {
  filterBookings: Function;
}

export default function MBBooking({ filterBookings }: IProps) {
  return (
    <>
      {filterBookings().map((b: any) => (
        <ListItem placeholder="" key={b.id}>
          <div className="flex flex-col gap-3 w-full rounded-lg shadow-md p-4">
            <div className="flex justify-between items-center">
              <Typography
                placeholder=""
                className="text-dark text-lg font-bold"
              >
                {b.label}
              </Typography>
              <Link href="/messages">
                <IconButton placeholder="" variant="text">
                  <Icon
                    icon={ICON_MAPPER.message}
                    className="text-primary text-2xl transition"
                  />
                </IconButton>
              </Link>
              {/* <StatusBadge status={b.status}>{b.status}</StatusBadge> */}
            </div>
            <div className="flex justify-between items-center pb-2 ">
              <Typography
                placeholder=""
                className="text-dark text-base font-semibold"
              >
                Date and Time
              </Typography>
              <Typography
                placeholder=""
                className="text-lightDark text-base font-normal"
              >
                {b.bookedDateTime.slice(0, 10)}-{b.bookedDateTime.slice(11, 17)}
              </Typography>
            </div>
            <div className="flex justify-between items-center pb-2 ">
              <Typography
                placeholder=""
                className="text-dark text-base font-semibold"
              >
                Hourly Rate
              </Typography>
              <Typography
                placeholder=""
                className="text-lightDark text-base font-normal"
              >
                {b.hourlyRate}
              </Typography>
            </div>
          </div>
        </ListItem>
      ))}
    </>
  );
}
