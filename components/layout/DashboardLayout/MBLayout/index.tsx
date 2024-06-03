import { ReactNode } from "react";
import Header from "@/components/layout/DashboardLayout/MBLayout/Header";

interface IProps {
  children?: ReactNode;
}

export default function MBLayout({ children }: IProps) {
  return (
    <div className="min-h-screen md:hidden flex flex-col bg-[#FCFCFD]">
      <Header className="sticky top-0 z-10 bg-[#FCFCFD]" />
      <main className="grow p-4 flex">{children}</main>
    </div>
  );
}
