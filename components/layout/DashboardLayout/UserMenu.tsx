import { FC } from "react";
import { useUser } from "@/contexts/UserContext";
import { Avatar, ListItem } from "@/libraries/material-tailwind";
import { Icon } from "@/libraries/iconify-react";
import EmptyAvatar from "@/components/custom/EmptyAvatar";
import { ICON_MAPPER } from "@/utils/constants";
import { USER_ACCOUNT_SETTING } from "@/utils/tempData";

const UserMenu: FC<{
  handleMenuClick: (title: string) => void;
}> = ({ handleMenuClick }) => {
  const { userData } = useUser();

  return (
    <div>
      <div className="flex items-center gap-3 border-b-2 border-[#F8F4FF] pb-2">
        {userData?.avatar ? (
          <Avatar
            variant="circular"
            placeholder=""
            src={userData.avatar}
            alt=""
            className="w-12 h-12"
          />
        ) : (
          <EmptyAvatar className="w-12 h-12" />
        )}

        <div className="flex flex-col">
          <p className="text-dark text-sm xl:text-base font-semibold">
            {userData?.firstName} {userData?.lastName}
          </p>
          <p className="text-lightDark text-xs xl:text-sm underline">
            {userData?.jobRole && userData?.jobRole.replace(/\b\w/g, x => x.toUpperCase())}
          </p>
        </div>
        <div className="flex-1 flex justify-end">
          <Icon icon={ICON_MAPPER.edit} className="w-6 h-6 text-secondary" />
        </div>
      </div>
      {USER_ACCOUNT_SETTING.map((item, i) => (
        <ListItem
          placeholder=""
          key={item.id}
          className={`justify-between items-center ${
            i === USER_ACCOUNT_SETTING.length - 1
              ? ""
              : " border-b-2 border-[#F8F4FF]"
          }`}
          onClick={() => handleMenuClick(item.desc)}
        >
          <div className="flex justify-between w-full">
            <div className="flex gap-3 items-center">
              <Icon icon={item.logo} className="text-primary text-lg" />
              <p className="text-lightDark text-xs xl:text-sm font-semibold">
                {item.desc}
              </p>
            </div>
            {item.isExtendible ? (
              <Icon
                icon="material-symbols:keyboard-arrow-right"
                className="text-primary text-lg"
              />
            ) : (
              ""
            )}
          </div>
        </ListItem>
      ))}
    </div>
  );
};

export default UserMenu;
