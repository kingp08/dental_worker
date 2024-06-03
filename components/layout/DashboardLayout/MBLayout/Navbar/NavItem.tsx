import { IComponent, INavItem } from "@/utils/interfaces";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ListItem,
  ListItemPrefix,
  Typography,
} from "@/libraries/material-tailwind";
import { Icon } from "@/libraries/iconify-react";

interface IProps extends IComponent {
  item: INavItem;
}

export default function NavItem({ item }: IProps) {
  const pathname = usePathname();
  return (
    <Link key={item.id} href={item.path}>
      <ListItem
        placeholder=""
        className={`text-2xl ${
          pathname === item.path ? "text-primary bg-white" : "text-[#CCADFF]"
        }`}
      >
        <ListItemPrefix placeholder="">
          <Icon icon={item.icon} />
        </ListItemPrefix>
        <Typography placeholder="" className="font-semibold">
          {item.name}
        </Typography>
      </ListItem>
    </Link>
  );
}
