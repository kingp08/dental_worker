import UserList from "@/components/messages/UserList";
import Chat from "@/components/messages/Chat";
import { Card, CardBody, Typography } from "@/libraries/material-tailwind";
import type { TUserItem } from "@/app/messages/page";
import { Icon } from "@/libraries/iconify-react";
import { ICON_MAPPER } from "@/utils/constants";

interface IProps {
  selectedUser: TUserItem;
  setSelectedUser: (
    value: TUserItem | ((prev: TUserItem) => TUserItem),
  ) => void;
}

export default function DP({ selectedUser, setSelectedUser }: IProps) {
  return (
    <div className="h-full hidden xl:grid grid-cols-4 gap-8">
      <Card placeholder="" className="hidden md:block">
        <CardBody placeholder="" className="h-full flex flex-col">
          <Typography
            placeholder=""
            variant="h2"
            className="text-xl font-bold text-dark"
          >
            Chat
          </Typography>
          <UserList setSelectedUser={setSelectedUser} />
        </CardBody>
      </Card>

      <Card placeholder="" className="col-span-3">
        <CardBody placeholder="" className="relative h-full">
          {selectedUser ? (
            <Chat
              className="h-full"
              user={selectedUser}
              setSelectedUser={setSelectedUser}
            />
          ) : (
            <div className="h-full flex flex-col justify-center items-center gap-4">
              <Icon
                icon={ICON_MAPPER.chat}
                className="text-8xl text-gray-500"
              />
              <Typography
                placeholder=""
                className="text-gray-500 text-4xl font-extrabold"
              >
              No Message
              </Typography>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
