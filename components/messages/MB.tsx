import Chat from "@/components/messages/Chat";
import UserList from "@/components/messages/UserList";
import type { TUserItem } from "@/app/messages/page";

interface IProps {
  selectedUser: TUserItem;
  setSelectedUser: (
    value: TUserItem | ((prev: TUserItem) => TUserItem),
  ) => void;
}

export default function MB({ selectedUser, setSelectedUser }: IProps) {
  return (
    <div className="block xl:hidden w-full h-auto sm:h-full">
      {selectedUser ? (
        <Chat
          className="h-full"
          user={selectedUser}
          setSelectedUser={setSelectedUser}
        />
      ) : (
        <UserList setSelectedUser={setSelectedUser} />
      )}
    </div>
  );
}
