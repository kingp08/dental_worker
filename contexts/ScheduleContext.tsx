import { ReactNode, createContext, useContext, useState } from "react";
import { IWeekAvailability } from "@/utils/interfaces";

export const ScheduleContext = createContext<{
  weekAvailabilities: Array<IWeekAvailability>;
  setWeekAvailabilities: (
    value:
      | Array<IWeekAvailability>
      | ((prev: Array<IWeekAvailability>) => Array<IWeekAvailability>)
  ) => void;
}>({
  weekAvailabilities: [],
  setWeekAvailabilities: () => {},
});

export const ScheduleProvider = ({ children }: { children: ReactNode }) => {
  const [weekAvailabilities, setWeekAvailabilities] = useState<
    Array<IWeekAvailability>
  >([]);

  return (
    <ScheduleContext.Provider
      value={{ weekAvailabilities, setWeekAvailabilities }}
    >
      {children}
    </ScheduleContext.Provider>
  );
};

export const useSchedule = () => useContext(ScheduleContext);
