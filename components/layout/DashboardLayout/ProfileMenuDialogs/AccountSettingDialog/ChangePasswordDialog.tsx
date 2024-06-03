import { useState } from "react";
import Button from "@/components/custom/buttons/Button";
import { IComponent } from "@/utils/interfaces";
import { Icon } from "@/libraries/iconify-react";
import {
  ICON_MAPPER,
  VALIDATION_DISMATCH_PASSWORDS,
  VALIDATION_REQUIRED_FIELD,
} from "@/utils/constants";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  IconButton,
  Typography,
} from "@/libraries/material-tailwind";
import type { DialogProps } from "@/libraries/material-tailwind";
import * as yup from "yup";
import { useFormik } from "formik";
import Input from "@/components/custom/Input";

type TPasswordType = "text" | "password";

const validationSchema = yup.object().shape({
  password: yup.string().required(VALIDATION_REQUIRED_FIELD),
  confPassword: yup
    .string()
    .oneOf([yup.ref("password", undefined)], VALIDATION_DISMATCH_PASSWORDS)
    .required(VALIDATION_REQUIRED_FIELD),
});

interface IProps extends IComponent {
  passwordDialogOpened: boolean;
  setPasswordDialogOpened: Function;
  setAccountSettingDialogOpened: Function;
  size: DialogProps["size"];
}

export default function ChangePasswordDialog({
  passwordDialogOpened,
  setPasswordDialogOpened,
  setAccountSettingDialogOpened,
  size = "lg",
}: IProps) {
  const handler = () => {
    setPasswordDialogOpened(!passwordDialogOpened);
    setAccountSettingDialogOpened(true);
  };

  const formik = useFormik({
    initialValues: {
      currentPass: "",
      password: "",
      confPassword: "",
    },
    validationSchema,
    onSubmit: () => {},
  });

  const [currentPassType, setCurrentPassType] =
    useState<TPasswordType>("password");
  const [passwordType, setPasswordType] = useState<TPasswordType>("password");
  const [confPasswordType, setConfPasswordType] =
    useState<TPasswordType>("password");

  return (
    <Dialog
      placeholder=""
      handler={handler}
      open={passwordDialogOpened}
      size={size}
      className="h-[95%] overflow-y-auto pb-10 xl:pb-20 px-10 xl:px-20"
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
          Change Password
        </Typography>
        <form
          className="flex flex-col gap-12 w-full"
          onSubmit={formik.handleSubmit}
        >
          <div className="flex flex-col gap-8 w-full">
            <Input
              id="password"
              type={currentPassType}
              name="currentPass"
              label="Current Password"
              placeholder="Current Password"
              endAdornment={
                <IconButton
                  placeholder=""
                  className="w-4 h-4 text-lightDark text-lg"
                  onClick={() =>
                    setCurrentPassType((prev) =>
                      prev === "text" ? "password" : "text",
                    )
                  }
                  variant="text"
                >
                  <Icon
                    icon={
                      passwordType === "text"
                        ? ICON_MAPPER.eyeOff
                        : ICON_MAPPER.eye
                    }
                  />
                </IconButton>
              }
              onChange={formik.handleChange}
              value={formik.values.currentPass}
              error={formik.touched.currentPass && formik.errors.currentPass}
            />
            <Input
              id="password"
              type={passwordType}
              name="password"
              label="New Password"
              placeholder="Password"
              endAdornment={
                <IconButton
                  placeholder=""
                  className="w-4 h-4 text-lightDark text-lg"
                  onClick={() =>
                    setPasswordType((prev) =>
                      prev === "text" ? "password" : "text",
                    )
                  }
                  variant="text"
                >
                  <Icon
                    icon={
                      passwordType === "text"
                        ? ICON_MAPPER.eyeOff
                        : ICON_MAPPER.eye
                    }
                  />
                </IconButton>
              }
              onChange={formik.handleChange}
              value={formik.values.password}
              error={formik.touched.password && formik.errors.password}
            />
            <Input
              id="conf-password"
              type={confPasswordType}
              name="confPassword"
              label="Confirm Password"
              placeholder="Confirm your password"
              endAdornment={
                <IconButton
                  placeholder=""
                  className="w-4 h-4 text-lightDark text-lg"
                  onClick={() =>
                    setConfPasswordType((prev) =>
                      prev === "text" ? "password" : "text",
                    )
                  }
                  variant="text"
                >
                  <Icon
                    icon={
                      confPasswordType === "text"
                        ? ICON_MAPPER.eyeOff
                        : ICON_MAPPER.eye
                    }
                  />
                </IconButton>
              }
              onChange={formik.handleChange}
              value={formik.values.confPassword}
              error={formik.touched.confPassword && formik.errors.confPassword}
            />
          </div>
          <div className="flex justify-end">
            <Button
              variant="filled"
              color="secondary"
              className=""
              type="submit"
            >
              Save
            </Button>
          </div>
        </form>
      </DialogBody>
    </Dialog>
  );
}
