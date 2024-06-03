"use client";

import React from "react";
import { IComponent, IBank, PaymentAccount } from "@/utils/interfaces";
import { Typography, Avatar } from "@/libraries/material-tailwind";
import StatusBadge from "../custom/StatusBadge";

interface IBankItem extends IComponent {
  bank: PaymentAccount;
  key: number;
}

const additionalImages = [
  "/assets/images/bank1.png",
  "/assets/images/bank2.png",
  "/assets/images/bank3.png",
];

export default function BankItem({ className = "", bank, key }: IBankItem) {
  return (
    <div className="flex flex-col bg-[#FFF] border border-[#F6F4F9] py-6 px-8">
      <div className="flex justify-center">
        <Avatar
          placeholder=""
          className="w-20 h-20"
          src={
            key % 2 === 0
              ? additionalImages[1]
              : key % 3 === 0
              ? additionalImages[0]
              : additionalImages[2]
          }
        />
      </div>
      <Typography
        placeholder=""
        className="text-dark font-bold text-sm pt-2 text-center"
      >
        {bank.bankName}
      </Typography>
      <Typography
        placeholder=""
        className="text-lightDark font-normal text-sm pt-2 text-center"
      >
        {bank.accountNumber}
      </Typography>
      <div className="flex justify-center gap-6 pt-3">
        <StatusBadge status={bank.verifiedAccount ? "eligible" : "notVerified"}>
          Instant {bank.verifiedAccount}
        </StatusBadge>
        {bank.defaultAccount ? (
          <StatusBadge
            status={bank.defaultAccount ? "eligible" : "notVerified"}
            isDefault={bank.defaultAccount}
          >
            Default
          </StatusBadge>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
