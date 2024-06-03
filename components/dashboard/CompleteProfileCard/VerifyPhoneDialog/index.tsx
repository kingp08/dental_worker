"use client";

import React, { useState } from "react";
import { IComponent } from "@/utils/interfaces";
import { Icon } from "@/libraries/iconify-react";
import { ICON_MAPPER } from "@/utils/constants";
import {
  Dialog,
  DialogBody,
  DialogHeader,
  IconButton,
} from "@/libraries/material-tailwind";
import type { DialogProps } from "@/libraries/material-tailwind";
import Loading from "@/components/custom/Loading";
import PhoneForm from "./PhoneForm";
import OTPForm from "./OTPForm";

interface IProps extends IComponent {
  verifyPhone: boolean;
  setVerifyPhone: Function;
  size: DialogProps["size"];
}

export default function VerifyPhoneDialog({
  verifyPhone,
  setVerifyPhone,
  size = "md",
}: IProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [otpSent, setOtpSent] = useState<boolean>(true);
  const [phone, setPhone] = useState<string>("");

  const handler = () => {
    setVerifyPhone(!verifyPhone);
  };

  return (
    <Dialog placeholder="" handler={handler} open={verifyPhone} size={size}>
      <DialogHeader placeholder="" className="justify-end pb-0">
        <IconButton
          variant="text"
          placeholder=""
          onClick={handler}
          className="w-6 h-6 text-2xl"
        >
          <Icon icon={ICON_MAPPER.close} />
        </IconButton>
      </DialogHeader>

      <DialogBody placeholder="" className="px-12 flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          <h4 className="text-3xl font-bold text-gray-800">
            Verify Phone Number
          </h4>
          <p className="text-gray-600">Verify your mobile number</p>
          <p className="text-gray-600">
            Please verify your number to receive alerts regarding your account.
          </p>
          <p className="text-gray-600">
            Enter your phone number below and we’ll send you a confirmation
            code.
          </p>
        </div>

        {loading ? (
          <Loading />
        ) : otpSent ? (
          <OTPForm {...{ setOtpSent, setLoading, handler, phone }} />
        ) : (
          <PhoneForm {...{ phone, setPhone, setOtpSent, setLoading }} />
        )}
      </DialogBody>
    </Dialog>
  );
}
