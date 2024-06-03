"use client";

import React, { useState } from "react";
import { IComponent } from "@/utils/interfaces";
import CardTemplate from "../custom/CardTemplate";
import TabButton from "../custom/buttons/TabButton";
import EarningTab from "./EarningTab";
import DirectDepositTab from "./DirectDepositTab";
import TaxInfo from "./TaxInfoTab";

export default function RevenuePage({ className = "" }: IComponent) {
  const [activeTab, setActiveTab] = useState<string>("Earnings");

  return (
    <CardTemplate title="" className={`${className} w-full`}>
      <div className="flex flex-col gap-4 pb-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            <TabButton
              className="font-semibold"
              isActive={activeTab === "Earnings"}
              onClick={() => setActiveTab("Earnings")}
            >
              Earnings
            </TabButton>
            <TabButton
              className="font-semibold"
              isActive={activeTab === "Direct Deposit"}
              onClick={() => setActiveTab("Direct Deposit")}
            >
              Direct Deposit
            </TabButton>
            <TabButton
              className="font-semibold"
              isActive={activeTab === "Tax Information"}
              onClick={() => setActiveTab("Tax Information")}
            >
              Tax Information
            </TabButton>
          </div>
        </div>
      </div>

      {activeTab === "Earnings" ? (
        <EarningTab />
      ) : activeTab === "Direct Deposit" ? (
        <DirectDepositTab />
      ) : (
        <TaxInfo />
      )}
    </CardTemplate>
  );
}
