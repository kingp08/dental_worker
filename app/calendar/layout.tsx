import { ILayoutProps } from "@/utils/interfaces";

export default function CalendarLayout({ children }: ILayoutProps) {
  return <section className="grow h-auto lg:h-full w-full">{children}</section>;
}
