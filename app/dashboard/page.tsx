"use client";
import AvatarCard from "@/components/dashboard/AvatarCard";
import BookingsCard from "@/components/dashboard/BookingsCard";
import CalendarCard from "@/components/dashboard/CalendarCard";
import CompleteProfileCard from "@/components/dashboard/CompleteProfileCard";
import JobPostingCard from "@/components/dashboard/JobPostingCard";
import { useUser } from "@/contexts/UserContext";
import { useEffect } from "react";

export default function DashboardPage() {
  const { userData } = useUser();

  useEffect(() => {
    if (!userData || userData?.userType == 1) return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <AvatarCard className="col-span-12 md:col-span-6 xl:col-span-2" />
      <CompleteProfileCard className="col-span-12 md:col-span-6 xl:col-span-4" />
      <BookingsCard className="col-span-12 lg:col-span-6 xl:col-span-3 flex lg:hidden xl:flex" />
      <JobPostingCard className="col-span-12 xl:col-span-7" />
      <BookingsCard className="col-span-12 lg:col-span-6 xl:col-span-3 hidden lg:flex xl:hidden" />
      <CalendarCard className="col-span-12 lg:col-span-6 xl:col-span-2" />
    </>
  );
}
