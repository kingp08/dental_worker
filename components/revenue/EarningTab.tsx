"use client";

import React from "react";
import Image from "next/image";
import { IComponent } from "@/utils/interfaces";
import { Typography } from "@/libraries/material-tailwind";

export default function EarningTab({ className = "" }: IComponent) {
  return (
    <div className="flex flex-col m-auto h-lvh">
      <div className="flex justify-center">
        <Image
          src="/assets/images/revenueTab1.svg"
          width={378}
          height={244}
          alt="earningTab"
        />
      </div>
      <Typography
        placeholder=""
        className="text-dark font-bold text-2xl py-6 text-center"
      >
        Lifetime earnings: $0.00
      </Typography>
      <Typography
        placeholder=""
        className="text-dark font-bold text-xl py-1 px-4 border border-secondary rounded-lg text-center"
      >
        To enable deposits, please{" "}
        <span className="text-secondary underline">
          configure your bank account
        </span>
      </Typography>
    </div>
  );
}
