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
  MTInput,
} from "@/libraries/material-tailwind";
import type { DialogProps } from "@/libraries/material-tailwind";
import api from "@/utils/api";
import { toast } from "react-toastify";
import { getErrorMessage } from "@/utils/functions";
import { useUser } from "@/contexts/UserContext";

interface IProps extends IComponent {
  addLicenseNumDialog: boolean;
  setAddLicenseNumDialog: Function;
  size: DialogProps["size"];
}

export default function AddLicenseDialog({
  addLicenseNumDialog,
  setAddLicenseNumDialog,
  size = "md",
}: IProps) {
  const handler = () => {
    setAddLicenseNumDialog(!addLicenseNum);
  };

  const [loading, setLoading] = useState<boolean>(false);
  const [licenseNum, setLicenseNum] = useState<number>();
  const { userData, setUserData } = useUser();

  const handleChange = (e: any) => {
    setLicenseNum(e.target.value);
  };

  const addLicenseNum = (result: boolean) => {
    setLoading(true);
    api
      .post("/user/save/profile/license", { result, licenseNum })
      .then((res) => {
        setLoading(false);
        let tempUserData = userData;
        Object(tempUserData?.verifyData).licenseAdded = true;
        setUserData(tempUserData);
        toast.success("Successfully added");
      })
      .catch((err) => {
        setLoading(false);
        toast.error(getErrorMessage(err));
      });
    setAddLicenseNumDialog(!addLicenseNum);
  };

  return (
    <Dialog
      placeholder=""
      handler={handler}
      open={addLicenseNumDialog}
      size={size}
      className="h-[45%] overflow-y-auto"
    >
      <DialogBody placeholder="">
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
              Add Your License Number
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
              License/Certification
            </Typography>
            <Typography
              placeholder=""
              className="text-xs md:text-sm font-normal text-lightDark"
            >
              Our promise to dental jobs is presenting verified professionals.
              (To be equal, we verify dental offices, too).
            </Typography>
            <Typography
              placeholder=""
              className="text-2xl font-normal text-dark"
            >
              Are you licensed or certified?
            </Typography>
            <Typography
              placeholder=""
              className="text-xs md:text-sm font-normal text-lightDark"
            >
              If licensed, give me your license number.
            </Typography>
            <MTInput
              placeholder="Your license number here"
              id="licenseNum"
              value={licenseNum}
              className="!border-l-0 !border-r-0 !border-t-0 !border-b-[#EAE7F1]  !bg-[#FCFAFF]  placeholder:text-[#B6AACA]"
              labelProps={{
                className: "hidden",
              }}
              crossOrigin={undefined}
              onChange={handleChange}
            />
          </div>

          <div className="w-full rounded-lg mt-6">
            <div className="flex justify-between gap-5 pt-2">
              <Button
                variant="filled"
                color="secondary"
                className="py-2 px-8 text-sm w-full"
                onClick={handler}
              >
                No
              </Button>
              <Button
                variant="filled"
                color="secondary"
                className="py-2 px-8 text-sm w-full"
                onClick={() => addLicenseNum(true)}
              >
                Yes
              </Button>
            </div>
          </div>
        </div>
      </DialogBody>
    </Dialog>
  );
}
