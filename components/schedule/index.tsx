"use client";
import React, { useState } from "react";
import { IComponent } from "@/utils/interfaces";
import { Card, CardBody } from "@/libraries/material-tailwind";
import BCalendar from "@/components/custom/calendars/BCalendar";
import CardTemplate from "../custom/CardTemplate";
import TabButton from "../custom/buttons/TabButton";
import TypicalWeek from "./TypicalWeek";
import Exceptions from "./Exceptions";
import CalendarCard from "../dashboard/CalendarCard";

export default function Schedule({ className = "" }: IComponent) {
  const [activeTab, setActiveTab] = useState<string>("Typical Week");

  return (
    <>
      <div className="block xl:hidden col-span-12">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 pb-4">
              <TabButton
                className="font-semibold"
                isActive={activeTab === "Typical Week"}
                onClick={() => setActiveTab("Typical Week")}
              >
                Typical Week
              </TabButton>
              <TabButton
                className="font-semibold"
                isActive={activeTab === "Exceptions"}
                onClick={() => setActiveTab("Exceptions")}
              >
                Exceptions
              </TabButton>
            </div>
          </div>
        </div>
        {activeTab === "Typical Week" ? <TypicalWeek /> : <Exceptions />}
      </div>
      <CardTemplate
        title=""
        className={`${className} col-span-12 xl:col-span-8 hidden xl:block`}
      >
        <div className="flex flex-col gap-4 pb-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <TabButton
                className="font-semibold"
                isActive={activeTab === "Typical Week"}
                onClick={() => setActiveTab("Typical Week")}
              >
                Typical Week
              </TabButton>
              <TabButton
                className="font-semibold"
                isActive={activeTab === "Exceptions"}
                onClick={() => setActiveTab("Exceptions")}
              >
                Exceptions
              </TabButton>
            </div>
          </div>
        </div>
        {activeTab === "Typical Week" ? <TypicalWeek /> : <Exceptions />}
      </CardTemplate>
      <div className="col-span-12 xl:col-span-4">
        <div className="block xl:hidden">
          <CalendarCard />
        </div>
        <Card placeholder="" className="hidden xl:block h-full">
          <CardBody placeholder="" className="h-full">
            <BCalendar />
          </CardBody>
        </Card>
      </div>
    </>
  );
}
