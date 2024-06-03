import { IEvent } from "@/utils/interfaces";
import { ReactNode, createContext, useContext, useState } from "react";

export const CalendarContext = createContext<{
  events: Array<IEvent>;
  setEvents: (
    value: Array<IEvent> | ((prev: Array<IEvent>) => Array<IEvent>)
  ) => void;
}>({
  events: [],
  setEvents: () => {},
});

export const CalendarProvider = ({ children }: { children: ReactNode }) => {
  const [events, setEvents] = useState<Array<IEvent>>([]);

  return (
    <CalendarContext.Provider value={{ events, setEvents }}>
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendar = () => useContext(CalendarContext);
