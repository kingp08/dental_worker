"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconButton, Tooltip } from "@/libraries/material-tailwind";
import { Icon } from "@/libraries/iconify-react";
import { IComponent, INavItem } from "@/utils/interfaces";

interface IProps extends IComponent {
  item: INavItem;
}

export default function NavItem({ item }: IProps) {
  const pathname = usePathname();
  return (
    <Tooltip
      content={item.name}
      placement="right"
      className="bg-primary py-3 px-4 ml-6"
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0, y: 25 },
      }}
    >
      <Link href={item.path}>
        <IconButton placeholder="" variant="text">
          <Icon
            icon={item.icon}
            className={`text-3xl active:text-white hover:text-white transition ${
              pathname === item.path ? "text-white" : "text-[#CCADFF]"
            }`}
          />
        </IconButton>
      </Link>
    </Tooltip>
  );
}
