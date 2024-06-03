import { ReactNode } from "react";

export default function JobPostingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <section className="flex">{children}</section>;
}
