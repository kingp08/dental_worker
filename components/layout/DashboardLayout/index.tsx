import { ReactNode, useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { useLocalStorage } from "@/libraries/usehooks-ts";
// import {
//   L_STORAGE_AUTH_TOKEN,
//   L_STORAGE_REFRESH_TOKEN,
//   PATH_MAPPER,
// } from "@/utils/constants";
// import api from "@/utils/api";
import DPLayout from "@/components/layout/DashboardLayout/DPLayout";
import MBLayout from "@/components/layout/DashboardLayout/MBLayout";
import NotiDialog from "./NotiDialog";
// import { useAuth } from "@/contexts/AuthContext";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  // const router = useRouter();
  // const [, setAuthTokenInStore] = useLocalStorage(L_STORAGE_AUTH_TOKEN, "");
  // const [, setRefreshTokenInStore] = useLocalStorage(
  //   L_STORAGE_REFRESH_TOKEN,
  //   ""
  // );
  // const { authToken, setAuthToken, setRefreshToken } = useAuth();

  const [notiDialogOpened, setNotiDialogOpened] = useState<boolean>(false);

  // useEffect(() => {
  //   if (authToken) {
  //     api.post("/validate/token", { token: authToken }).then((res) => {
  //       const { valid } = res.data;
  //       if (!valid) {
  //         setAuthToken("");
  //         setAuthTokenInStore("");
  //         setRefreshToken("");
  //         setRefreshTokenInStore("");
  //         router.push(PATH_MAPPER.signin);
  //       }
  //     });
  //   } else {
  //     router.push(PATH_MAPPER.signin);
  //   }
  // }, []);

  // if (!authToken) {
  //   return <></>;
  // }

  return (
    <>
      <DPLayout setNotiDialogOpened={setNotiDialogOpened}>{children}</DPLayout>
      <MBLayout>{children}</MBLayout>
      <NotiDialog
        notiDialogOpened={notiDialogOpened}
        setNotiDialogOpened={setNotiDialogOpened}
        size="lg"
      />
    </>
  );
}
