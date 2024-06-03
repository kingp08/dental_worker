"use client"
import RevenuePage from "@/components/revenue";
import { useUser } from "@/contexts/UserContext";
import { useEffect } from "react";

export default function Revenue() {
  const {userData} = useUser();

  useEffect(() => {
    if(!userData || userData?.userType == 1) return ;
  }, [])

  return (
    <>
      <RevenuePage />
    </>
  );
}
