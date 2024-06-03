import { ReactNode } from "react";

export default function BookingLayout({ children }: { children: ReactNode }) {
  return (
    <section className="grid grid-cols-9 gap-4 w-full">{children}</section>
  );
}
