import Button from "@/components/custom/buttons/Button";
import { IComponent } from "@/utils/interfaces";
import { Icon } from "@/libraries/iconify-react";
import { Dialog, DialogBody, Typography } from "@/libraries/material-tailwind";
import type { DialogProps } from "@/libraries/material-tailwind";
import {
  L_STORAGE_AUTH_TOKEN,
  L_STORAGE_REFRESH_TOKEN,
  PATH_MAPPER,
} from "@/utils/constants";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

interface IProps extends IComponent {
  opened: boolean;
  setOpened: Function;
  size: DialogProps["size"];
}

export default function LogOutDialogue({
  opened,
  setOpened,
  size = "xs",
}: IProps) {
  const router = useRouter();
  const { setAuthToken, setRefreshToken } = useAuth();

  const handler = () => {
    setOpened(!opened);
  };

  const handleLogout = () => {
    localStorage.removeItem(L_STORAGE_AUTH_TOKEN);
    localStorage.removeItem(L_STORAGE_REFRESH_TOKEN);
    sessionStorage.removeItem(L_STORAGE_AUTH_TOKEN);
    sessionStorage.removeItem(L_STORAGE_REFRESH_TOKEN);
    setAuthToken("");
    setRefreshToken("");
    router.push(PATH_MAPPER.signin);
  };

  return (
    <Dialog placeholder="" handler={handler} open={opened} size={size}>
      <DialogBody placeholder="">
        <div className="flex flex-col p-10">
          <Icon
            icon="streamline:logout-1-solid"
            className="text-primary text-3xl text-center m-auto"
          />
          <Typography
            placeholder=""
            className="text-lightDark text-xs xl:text-sm font-semibold py-6 m-auto"
          >
            Are you sure you want to logout?
          </Typography>
          <div className="flex justify-center gap-3">
            <Button
              variant="outlined"
              color="lightDark"
              onClick={handler}
              className="py-2 px-4"
            >
              Cancel
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              className="py-2 px-4"
              onClick={handleLogout}
            >
              Yes
            </Button>
          </div>
        </div>
      </DialogBody>
    </Dialog>
  );
}
