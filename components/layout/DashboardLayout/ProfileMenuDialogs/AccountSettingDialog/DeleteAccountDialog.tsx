import { IComponent } from "@/utils/interfaces";
import { Icon } from "@/libraries/iconify-react";
import { ICON_MAPPER } from "@/utils/constants";
import {
  Dialog,
  DialogBody,
  Typography,
  Button,
} from "@/libraries/material-tailwind";
import type { DialogProps } from "@/libraries/material-tailwind";

interface IProps extends IComponent {
  deleteAccountDialogOpened: boolean;
  setDeleteAccountDialogOpened: Function;
  setAccountSettingDialogOpened: Function;
  size: DialogProps["size"];
}

export default function DeleteAccountDialog({
  deleteAccountDialogOpened,
  setDeleteAccountDialogOpened,
  setAccountSettingDialogOpened,
  size = "lg",
}: IProps) {
  const handler = () => {
    setDeleteAccountDialogOpened(!deleteAccountDialogOpened);
    setAccountSettingDialogOpened(true);
  };

  return (
    <Dialog
      placeholder=""
      handler={handler}
      open={deleteAccountDialogOpened}
      size={size}
    >
      <DialogBody placeholder="" className="px-10 xl:px-20">
        <div className="flex flex-col items-center gap-4 p-10 lg:p-20">
          <div className="p-5">
            <Icon
              icon={ICON_MAPPER.delete}
              className="text-sm text-[#FF3257] w-10 h-10 text-center"
            />
          </div>
          <Typography
            placeholder=""
            className="text-dark text-base text-center"
          >
            Are you sure you want to delete your account?
          </Typography>
          <Typography
            placeholder=""
            className="text-lightDark text-base text-center"
          >
            After you click on the following delete button your account will be
            deleted in 24 hours.
          </Typography>
        </div>
        <div>
          <div className="flex gap-3 justify-center pb-10">
            <Button
              placeholder=""
              variant="outlined"
              onClick={handler}
              className="text-lightDark border border-lightDark"
            >
              Cancel
            </Button>
            <Button
              placeholder=""
              variant="outlined"
              onClick={handler}
              className="text-secondary border border-secondary"
            >
              Delete
            </Button>
          </div>
        </div>
      </DialogBody>
    </Dialog>
  );
}
