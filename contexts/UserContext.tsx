import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { IUserData } from "@/utils/interfaces";
import api from "@/utils/api";
import { useAuth } from "./AuthContext";

type TUserData = IUserData | null;

export const UserContext = createContext<{
  userData: TUserData;
  setUserData: (value: TUserData | ((prev: TUserData) => TUserData)) => void;
}>({
  userData: null,
  setUserData: () => { },
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { authToken } = useAuth();
  const [userData, setUserData] = useState<TUserData>(null);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
