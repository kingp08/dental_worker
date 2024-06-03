import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useReadLocalStorage } from "@/libraries/usehooks-ts";
import {
  L_STORAGE_AUTH_TOKEN,
  L_STORAGE_REFRESH_TOKEN,
} from "@/utils/constants";

export const AuthContext = createContext<{
  authToken: string;
  setAuthToken: (value: string | ((prev: string) => string)) => void;
  refreshToken: string;
  setRefreshToken: (value: string | ((prev: string) => string)) => void;
  authTokenInSessionStorage: string;
  setAuthTokenInSessionStorage: (
    value: string | ((prev: string) => string)
  ) => void;
  emailForOTP: string;
  setEmailForOTP: (value: string | ((prev: string) => string)) => void;
  refId: string;
  setRefId: (value: string | ((prev: string) => string)) => void;
}>({
  authToken: "",
  setAuthToken: () => {},
  refreshToken: "",
  setRefreshToken: () => {},
  authTokenInSessionStorage: "",
  setAuthTokenInSessionStorage: () => {},
  emailForOTP: "",
  setEmailForOTP: () => {},
  refId: "",
  setRefId: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const authTokenInStore = useReadLocalStorage<string>(L_STORAGE_AUTH_TOKEN);
  const refreshTokenInStore = useReadLocalStorage<string>(
    L_STORAGE_REFRESH_TOKEN
  );
  const tokenInSession =
    typeof window !== "undefined"
      ? sessionStorage.getItem(L_STORAGE_AUTH_TOKEN)
      : null;

  const [authToken, setAuthToken] = useState<string>("");
  const [refreshToken, setRefreshToken] = useState<string>("");
  const [emailForOTP, setEmailForOTP] = useState<string>("");
  const [refId, setRefId] = useState<string>("");

  const [authTokenInSessionStorage, setAuthTokenInSessionStorage] =
    useState<string>("");

  useEffect(() => {
    setAuthToken(
      authTokenInStore || window?.sessionStorage.getItem(L_STORAGE_AUTH_TOKEN) || ""
    );
    setRefreshToken(
      refreshTokenInStore ||
        window?.sessionStorage.getItem(L_STORAGE_REFRESH_TOKEN) ||
        ""
    );
    setAuthTokenInSessionStorage(tokenInSession || "");
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authToken,
        refreshToken,
        setAuthToken,
        setRefreshToken,
        authTokenInSessionStorage,
        setAuthTokenInSessionStorage,
        emailForOTP,
        setEmailForOTP,
        refId,
        setRefId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
