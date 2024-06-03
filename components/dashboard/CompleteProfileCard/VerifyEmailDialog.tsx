import React, { useState } from "react";
import Button from "@/components/custom/buttons/Button";
import { IComponent } from "@/utils/interfaces";
import { Icon } from "@/libraries/iconify-react";
import { ICON_MAPPER } from "@/utils/constants";
import {
  Dialog,
  DialogBody,
  IconButton,
  Typography,
} from "@/libraries/material-tailwind";
import type { DialogProps } from "@/libraries/material-tailwind";
import api from "@/utils/api";
import { useUser } from "@/contexts/UserContext";
import { toast } from "react-toastify";
import { getErrorMessage } from "@/utils/functions";
import Loading from "@/components/custom/Loading";

interface IProps extends IComponent {
  verifyEmail: boolean;
  setVerifyEmail: Function;
  size: DialogProps["size"];
}

export default function VerifyEmailDialog({
  verifyEmail,
  setVerifyEmail,
  size = "md",
}: IProps) {
  const handler = () => {
    setVerifyEmail(!verifyEmail);
  };

  const { userData, setUserData } = useUser();
  const [loading, setLoading] = useState<boolean>(false);
  const resendConfirmationMail = () => {
    setLoading(true);
    api
      .get("/user/send/email/verification")
      .then((res) => {
        setLoading(false);
        let tempUserData = userData;
        Object(tempUserData?.verifyData).emailConfirmed = true;
        setUserData(tempUserData);
        toast.success("Confirmation Mail was successfully sent to your email");
      })
      .catch((err) => {
        setLoading(false);
        toast.error(getErrorMessage(err));
      });
    setVerifyEmail(!verifyEmail);
  };

  return (
    <Dialog
      placeholder=""
      handler={handler}
      open={verifyEmail}
      size={size}
      className="h-[35%] overflow-y-auto"
    >
      <DialogBody placeholder="">
        {loading ? (
          <Loading />
        ) : (
          <>
            <div className="hidden ss:flex justify-end">
              <IconButton
                placeholder=""
                className="text-2xl text-lightDark w-8 h-8"
                variant="text"
                onClick={handler}
              >
                <Icon icon={ICON_MAPPER.close} />
              </IconButton>
            </div>
            <div className="p-2 sm:px-10 xl:px-20">
              <div className="flex justify-between items-center">
                <Typography
                  placeholder=""
                  className="text-xl ss:2xl md:text-3xl lg:text-4xl text-dark font-bold"
                >
                  Verify Email Address
                </Typography>
                <Icon
                  icon={ICON_MAPPER.close}
                  className="flex text-dark font-bold text-xl ss:hidden cursor-pointer"
                  onClick={handler}
                />
              </div>
              <div className="flex flex-col gap-4 pt-4">
                <Typography
                  placeholder=""
                  className="text-xs md:text-sm font-normal text-lightDark"
                >
                  Click the link below if you want to receive the confirmation
                  email again.
                </Typography>
                <Typography
                  placeholder=""
                  className="text-xs md:text-sm font-bold text-secondary"
                >
                  {userData?.email}
                </Typography>
                <Typography
                  placeholder=""
                  className="text-xs md:text-sm font-normal text-lightDark"
                >
                  We&apos;ve sent you an email confirmation to verify this is
                  your correct email addres. If you didn&apos;t receive the
                  confirmation, click the link below.
                </Typography>
              </div>

              <div className="w-full rounded-lg mt-6">
                <div className="flex justify-end pt-2">
                  <Button
                    variant="filled"
                    color="secondary"
                    className="py-2 px-8 text-sm"
                    onClick={resendConfirmationMail}
                  >
                    Resend Confirmation Mail
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </DialogBody>
    </Dialog>
  );
}
