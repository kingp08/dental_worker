"use client";

import { FormHTMLAttributes, useState } from "react";
import * as yup from "yup";
import Input from "@/components/custom/Input";
import { IconButton } from "@/libraries/material-tailwind";
import { Icon } from "@/libraries/iconify-react";
import {
  ICON_MAPPER,
  VALIDATION_DISMATCH_PASSWORDS,
  VALIDATION_REQUIRED_FIELD,
} from "@/utils/constants";
import { useFormik } from "formik";
import Button from "@/components/custom/buttons/Button";
import api from "@/utils/api";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { getErrorMessage } from "@/utils/functions";

type TPasswordType = "text" | "password";

const validationSchema = yup.object().shape({
  password: yup.string().required(VALIDATION_REQUIRED_FIELD),
  confPassword: yup
    .string()
    .oneOf([yup.ref("password", undefined)], VALIDATION_DISMATCH_PASSWORDS)
    .required(VALIDATION_REQUIRED_FIELD),
});

interface IProps extends FormHTMLAttributes<HTMLFormElement> {
  setLoading: (value: boolean | ((prev: boolean) => boolean)) => void;
}

export default function CreatePasswordForm({
  className = "",
  setLoading,
}: IProps) {
  const router = useRouter();
  const { refId } = useAuth();

  const [passwordType, setPasswordType] = useState<TPasswordType>("password");
  const [confPasswordType, setConfPasswordType] =
    useState<TPasswordType>("password");

  const formik = useFormik({
    initialValues: {
      password: "",
      confPassword: "",
    },
    validationSchema,
    onSubmit: ({ password }) => {
      setLoading(true);

      api
        .post("/update/forgot/password", {
          password,
          refId,
        })
        .then((res) => {
          const { success } = res.data;
          setLoading(false);
          if (success) {
            toast.success("The password has been updated.");
            router.push("/signin");
          }
        })
        .catch((err) => {
          setLoading(false);
          toast.error(getErrorMessage(err));
        });
    },
  });

  return (
    <form
      className={`flex flex-col items-center gap-12 w-full ${className}`}
      onSubmit={formik.handleSubmit}
    >
      <div className="flex flex-col gap-8 w-full">
        <Input
          id="password"
          type={passwordType}
          name="password"
          label="Password"
          placeholder="Password"
          endAdornment={
            <IconButton
              placeholder=""
              className="w-4 h-4 text-lightDark text-lg"
              onClick={() =>
                setPasswordType((prev) =>
                  prev === "text" ? "password" : "text"
                )
              }
              variant="text"
            >
              <Icon
                icon={
                  passwordType === "text" ? ICON_MAPPER.eyeOff : ICON_MAPPER.eye
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
          label="Password confirmation"
          placeholder="Confirm your password"
          endAdornment={
            <IconButton
              placeholder=""
              className="w-4 h-4 text-lightDark text-lg"
              onClick={() =>
                setConfPasswordType((prev) =>
                  prev === "text" ? "password" : "text"
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

      <Button
        variant="filled"
        color="secondary"
        className="w-64 py-1.5"
        type="submit"
      >
        Save
      </Button>
    </form>
  );
}
