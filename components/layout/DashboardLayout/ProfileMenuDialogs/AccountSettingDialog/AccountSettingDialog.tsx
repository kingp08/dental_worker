import { useState } from "react";
import { IComponent } from "@/utils/interfaces";
import { Icon } from "@/libraries/iconify-react";
import { ICON_MAPPER } from "@/utils/constants";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  IconButton,
  Typography,
  MTInput,
} from "@/libraries/material-tailwind";
import type { DialogProps } from "@/libraries/material-tailwind";
import ChangePasswordDialog from "./ChangePasswordDialog";
import DeleteAccountDialog from "./DeleteAccountDialog";

interface IProps extends IComponent {
  accountSettingDialogOpened: boolean;
  setAccountSettingDialogOpened: Function;
  size: DialogProps["size"];
}

export default function AccountSettingDialog({
  accountSettingDialogOpened,
  setAccountSettingDialogOpened,
  size = "lg",
}: IProps) {
  const handler = () => {
    setAccountSettingDialogOpened(!accountSettingDialogOpened);
  };

  const [email, setEmail] = useState<string>("jamesmann7778@hotmail.com");
  const [phone, setPhone] = useState<string>("9372256346");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const [passwordDialogOpened, setPasswordDialogOpened] =
    useState<boolean>(false);
  const [deleteAccountDialogOpened, setDeleteAccountDialogOpened] =
    useState<boolean>(false);

  const handleChangePassDialog = () => {
    setPasswordDialogOpened(true);
    setAccountSettingDialogOpened(false);
  };

  const handleDeleteAccountDialog = () => {
    setDeleteAccountDialogOpened(true);
    setAccountSettingDialogOpened(false);
  };

  return (
    <>
      <Dialog
        placeholder=""
        handler={handler}
        open={accountSettingDialogOpened}
        size={size}
        className="h-[500px] overflow-y-auto pb-10 xl:pb-20 px-10 xl:px-20"
      >
        <DialogHeader placeholder="" className="flex justify-end">
          <IconButton
            placeholder=""
            className="text-2xl text-lightDark w-8 h-8"
            variant="text"
            onClick={handler}
          >
            <Icon icon={ICON_MAPPER.close} />
          </IconButton>
        </DialogHeader>
        <DialogBody placeholder="" className="px-10 xl:px-20">
          <Typography
            placeholder=""
            className="text-3xl text-dark font-bold  pb-8"
          >
            Account Settings
          </Typography>
          <Typography
            placeholder=""
            className="text-xl text-dark font-bold  pb-4"
          >
            Change Details
          </Typography>
          <div>
            <Typography
              placeholder=""
              className="text-base text-lightDark pb-2"
            >
              Email
            </Typography>
            <MTInput
              id="email"
              value={email}
              className="!border-none !border-b-[#EAE7F1]  !bg-[#FCFAFF]  placeholder:text-dark pl-3"
              labelProps={{
                className: "hidden",
              }}
              crossOrigin={undefined}
              onChange={handleEmailChange}
            />
          </div>
          <div className="pt-4">
            <Typography
              placeholder=""
              className="text-base text-lightDark pb-2"
            >
              Phone Number
            </Typography>
            <MTInput
              id="phone"
              value={phone}
              className="!border-none !border-b-[#EAE7F1]  !bg-[#FCFAFF]  placeholder:text-dark pl-3"
              labelProps={{
                className: "hidden",
              }}
              crossOrigin={undefined}
              onChange={handlePhoneChange}
            />
          </div>
          <div className="flex justify-between pt-6">
            <Typography
              placeholder=""
              className="text-base text-secondary hover:text-error underline cursor-pointer"
              onClick={handleChangePassDialog}
            >
              Change Password?
            </Typography>
            <Typography
              placeholder=""
              className="text-base text-error hover:text-red-500 underline cursor-pointer"
              onClick={handleDeleteAccountDialog}
            >
              Delete Account?
            </Typography>
          </div>
        </DialogBody>
      </Dialog>
      <ChangePasswordDialog
        passwordDialogOpened={passwordDialogOpened}
        setPasswordDialogOpened={setPasswordDialogOpened}
        setAccountSettingDialogOpened={setAccountSettingDialogOpened}
        size="lg"
      />
      <DeleteAccountDialog
        deleteAccountDialogOpened={deleteAccountDialogOpened}
        setDeleteAccountDialogOpened={setDeleteAccountDialogOpened}
        setAccountSettingDialogOpened={setAccountSettingDialogOpened}
        size="lg"
      />
    </>
  );
}
