import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <section className="grid grid-cols-12 xl:grid-cols-9 gap-4">
      {children}
    </section>
  );
}
