"use client"

import HelpPage from "@/components/help";
import { useUser } from "@/contexts/UserContext";
import { useEffect } from "react";

export default function Dashboard() {
  const {userData} = useUser();

  useEffect(() => {
    if(!userData || userData?.userType == 1) return ;
  }, [])
  return (
    <>
      <HelpPage />
    </>
  );
}
