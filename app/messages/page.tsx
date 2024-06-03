"use client";

import { useEffect, useState } from "react";
import { TEMP_USERS } from "@/components/messages/tempData";
import { IUserItem } from "@/utils/interfaces";
import DP from "@/components/messages/DP";
import MB from "@/components/messages/MB";
import { useUser } from "@/contexts/UserContext";

export type TUserItem = IUserItem | null;

export default function MessagesPage() {
  const [selectedUser, setSelectedUser] = useState<TUserItem>(null);
  const {userData} = useUser();

  useEffect(() => {
    if(!userData || userData?.userType == 1) return ;
  }, [])

  return (
    <>
      <DP {...{ selectedUser, setSelectedUser }} />
      <MB {...{ selectedUser, setSelectedUser }} />
    </>
  );
}
