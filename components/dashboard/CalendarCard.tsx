"use client";
import { AllHTMLAttributes, useState } from "react";
import { Card, CardBody } from "@/libraries/material-tailwind";
import SCalendar from "@/components/custom/calendars/SCalendar";

export default function CalendarCard({
  className = "",
}: AllHTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = useState<Date>(new Date());

  const gotoNeighborMonth = (toNext: boolean) => {
    const monthOffset = toNext ? 1 : -1;
    setDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + monthOffset, 1),
    );
  };

  return (
    <Card placeholder="" className={className}>
      <CardBody placeholder="">
        <SCalendar
          isAddSchedule={true}
          date={date}
          gotoNeighborMonth={gotoNeighborMonth}
        />
      </CardBody>
    </Card>
  );
}
