import type { EventProps } from "@/libraries/react-big-calendar";
import { IEvent } from "@/utils/interfaces";

export default function EventItem({ title }: EventProps<IEvent>) {
  return (
    <div className="rounded-lg bg-gray-100 py-1 border border-gray-200 w-full">
      <p className="text-primary text-center text-sm font-semibold">{title}</p>
    </div>
  );
}
