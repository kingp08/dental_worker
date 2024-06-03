import { ReactNode } from "react";
import Navbar from "@/components/layout/DashboardLayout/DPLayout/Navbar";
import Header from "@/components/layout/DashboardLayout/DPLayout/Header";
import useLoading from "@/hooks/useLoading";
import Loading from "@/components/custom/Loading";

interface IProps {
  children: ReactNode;
  setNotiDialogOpened: (value: boolean | ((prev: boolean) => boolean)) => void;
}

export default function DPLayout({ children, setNotiDialogOpened }: IProps) {
  const { isLoading } = useLoading();

  return (
    <div className="bg-gray-100 hidden md:block">
      <div className="flex gap-6">
        <div className="p-3 h-screen flex flex-col sticky top-0">
          <Navbar className="flex-1" />
        </div>

        <div className="flex-1 flex flex-col gap-8 py-3 pr-8">
          <Header setNotiDialogOpened={setNotiDialogOpened} />
          {isLoading ? <Loading /> : <main className="flex-1">{children}</main>}
        </div>
      </div>
    </div>
  );
}
