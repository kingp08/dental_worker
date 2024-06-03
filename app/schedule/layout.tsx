import { ReactNode } from "react";

export default function ScheduleLayout({ children }: { children: ReactNode }) {
  return (
    <section className="grid grid-cols-12 gap-2 w-full">{children}</section>
  );
}
