import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IComponent } from "@/utils/interfaces";
import { NAV_LINKS } from "@/utils/constants";
import { IconButton, Tooltip } from "@/libraries/material-tailwind";
import { Icon } from "@/libraries/iconify-react";
import ReferDialog from "../../ReferDialog";
import NavItem from "@/components/layout/DashboardLayout/DPLayout/Navbar/NavItem";

interface NavbarProps extends IComponent {}

const Navbar: React.FC<NavbarProps> = ({ className = "" }: NavbarProps) => {
  const [referDialogOpen, setReferDialogOpen] = useState<boolean>(false);
  const handleReferDialog = () => {
    setReferDialogOpen((prev) => !prev);
  };

  return (
    <nav
      className={`${className} bg-primary pb-4 px-3 rounded-xl flex flex-col justify-between gap-4 items-center overflow-auto relative`}
    >
      <div className="sticky top-0 bg-primary z-10 pt-4">
        <Link href="/">
          <Image src="/assets/images/logo.png" alt="" width={50} height={50} />
        </Link>
      </div>

      <div className="flex-1 flex flex-col items-center gap-4">
        {NAV_LINKS.primary.map((item) => (
          <NavItem key={item.id} item={item} />
        ))}
      </div>

      <div className="flex flex-col items-center gap-4">
        {/* <Tooltip
          content={NAV_LINKS.secondary[0].name}
          placement="right"
          className="bg-primary py-3 px-4 ml-6"
          animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 0, y: 25 },
          }}
        >
          <IconButton placeholder="" variant="text" onClick={handleReferDialog}>
            <Icon
              icon={NAV_LINKS.secondary[0].icon}
              className="text-3xl text-[#CCADFF] active:text-white hover:text-white transition"
            />
          </IconButton>
        </Tooltip> */}
        <NavItem item={NAV_LINKS.secondary[1]} />
        <ReferDialog
          referDialogOpen={referDialogOpen}
          setReferDialogOpen={setReferDialogOpen}
          size="lg"
        />
      </div>
    </nav>
  );
};

export default Navbar;
