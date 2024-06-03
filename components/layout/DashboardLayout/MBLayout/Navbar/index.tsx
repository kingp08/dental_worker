import Link from "next/link";
import Image from "next/image";
import { IComponent } from "@/utils/interfaces";
import { ICON_MAPPER, NAV_LINKS } from "@/utils/constants";
import { Drawer, IconButton, List } from "@/libraries/material-tailwind";
import { Icon } from "@/libraries/iconify-react";
import NavItem from "@/components/layout/DashboardLayout/MBLayout/Navbar/NavItem";

interface IProps extends IComponent {
  opened: boolean;
  setOpened: Function;
}

export default function Navbar({ opened, setOpened }: IProps) {
  const handleClose = () => {
    setOpened(false);
  };

  return (
    <Drawer placeholder="" open={opened} onClose={handleClose}>
      <div className="h-full flex flex-col gap-4 py-3 bg-primary border-r-2 border-white">
        <div className="flex items-center justify-between px-3">
          <Link href="/">
            <Image
              src="/assets/images/logo.png"
              alt=""
              width={50}
              height={50}
            />
          </Link>

          <IconButton
            placeholder=""
            className="text-2xl text-white w-6 h-6"
            variant="text"
            onClick={handleClose}
          >
            <Icon icon={ICON_MAPPER.close} />
          </IconButton>
        </div>

        <List placeholder="" className="flex-1">
          {NAV_LINKS.primary.map((item) => (
            <NavItem key={item.id} item={item} />
          ))}
        </List>

        <List placeholder="">
          {NAV_LINKS.secondary.map((item) => (
            <NavItem key={item.id} item={item} />
          ))}
        </List>
      </div>
    </Drawer>
  );
}
