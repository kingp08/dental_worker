import { ReactNode, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useLocalStorage } from "@/libraries/usehooks-ts";
// import {
//   L_STORAGE_AUTH_TOKEN,
//   L_STORAGE_REFRESH_TOKEN,
//   PATH_MAPPER,
// } from "@/utils/constants";
// import api from "@/utils/api";
// import { useAuth } from "@/contexts/AuthContext";

export default function AuthLayout({ children }: { children: ReactNode }) {
  // const router = useRouter();
  // const [, setAuthTokenInStore] = useLocalStorage(L_STORAGE_AUTH_TOKEN, "");
  // const [, setRefreshTokenInStore] = useLocalStorage(
  //   L_STORAGE_REFRESH_TOKEN,
  //   ""
  // );
  // const { authToken, setAuthToken, setRefreshToken } = useAuth();

  // useEffect(() => {
  //   if (authToken) {
  //     api.post("/validate/token", { token: authToken }).then((res) => {
  //       const { valid } = res.data;

  //       if (valid) {
  //         router.push(PATH_MAPPER.dashboard);
  //       } else {
  //         setAuthToken("");
  //         setAuthTokenInStore("");
  //         setRefreshToken("");
  //         setRefreshTokenInStore("");
  //       }
  //     });
  //   }
  // }, [authToken]);

  // if (authToken) {
  //   return <></>;
  // }

  return (
    <main className="bg-[#F5F7F9] min-h-screen overflow-hidden">
      <div className="grid grid-cols-2">{children}</div>
    </main>
  );
}
