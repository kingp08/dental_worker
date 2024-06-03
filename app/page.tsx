"use client";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { LoadingProvider } from "@/contexts/LoadingContext";
import { CalendarProvider } from "@/contexts/CalendarContext";
import { ScheduleProvider } from "@/contexts/ScheduleContext";
import { isAuthLayout } from "@/utils/functions";
import AuthLayout from "@/components/layout/AuthLayout";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { UserProvider } from "@/contexts/UserContext";
import { AuthProvider } from "@/contexts/AuthContext";

interface IProps {
  children: ReactNode;
}

export default function Home({ children }: IProps) {
  const pathname = usePathname();

  return (
    <LoadingProvider>
      <AuthProvider>
        <CalendarProvider>
          <ScheduleProvider>
            <UserProvider>
              {isAuthLayout(pathname) ? (
                <AuthLayout>{children}</AuthLayout>
              ) : (
                <DashboardLayout>{children}</DashboardLayout>
              )}
            </UserProvider>
          </ScheduleProvider>
        </CalendarProvider>
      </AuthProvider>
    </LoadingProvider>
  );
}
