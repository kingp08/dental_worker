import { AllHTMLAttributes, Fragment, useEffect, useState } from "react";
import TabButton from "@/components/custom/buttons/TabButton";
import { TEMP_USERS } from "@/components/messages/tempData";
import Item from "@/components/messages/UserList/Item";
import type { TUserItem } from "@/app/messages/page";
import api from "@/utils/api";
import { IUserItem } from "@/utils/interfaces";

type TTab = "inbox" | "archive";

interface IProps extends AllHTMLAttributes<HTMLDivElement> {
  setSelectedUser: (
    value: TUserItem | ((prev: TUserItem) => TUserItem)
  ) => void;
}

export default function UserList({ setSelectedUser }: IProps) {
  const [currentTab, setCurrentTab] = useState<TTab>("inbox");
  const [data, setDataSet] = useState<IUserItem[]>([]);

  const getData = async () => {
    let res = await api.post("/user/get/conversations/1", {
      isArchived: currentTab === "inbox" ? false : true,
    });
    setDataSet(res.data);
  };

  useEffect(() => {
    getData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTab]);

  return (
    <div className="h-full flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <TabButton
          className="font-semibold"
          isActive={currentTab === "inbox"}
          onClick={() => setCurrentTab("inbox")}
        >
          Inbox
        </TabButton>
        {/* <TabButton
          className="font-semibold"
          isActive={currentTab === "archive"}
          onClick={() => setCurrentTab("archive")}
        >
          Archive
        </TabButton> */}
      </div>

      <div className="grow flex flex-col gap-2 h-[100px] overflow-auto pr-4">
          {data?.map((user, index) => (
            <Fragment key={user.id}>
              <Item itemData={user} total={data?.filter((user:any) => !user?.isRead).length} onClick={() => setSelectedUser(user)} />
              {index < data?.length - 1 && <hr className="bg-gray-100" />}
            </Fragment>
          ))}
      </div>
    </div>
  );
}
