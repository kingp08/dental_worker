"use client";

import { FormHTMLAttributes } from "react";
import * as yup from "yup";
import Input from "@/components/custom/Input";
import {
  VALIDATION_INVALID_EMAIL,
  VALIDATION_REQUIRED_FIELD,
} from "@/utils/constants";
import { useFormik } from "@/libraries/formik";
import Button from "@/components/custom/buttons/Button";
import api from "@/utils/api";
import { toast } from "react-toastify";
import { getErrorMessage } from "@/utils/functions";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

interface IProps extends FormHTMLAttributes<HTMLFormElement> {
  setLoading: (value: boolean | ((prev: boolean) => boolean)) => void;
}

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email(VALIDATION_INVALID_EMAIL)
    .required(VALIDATION_REQUIRED_FIELD),
});

export default function ForgotPasswordForm({
  className = "",
  setLoading,
}: IProps) {
  const router = useRouter();
  const { setEmailForOTP } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: (values) => {
      setLoading(true);
      api
        .post("/send/forgot/password", values)
        .then((res) => {
          setLoading(false);
          if (res.data.success) {
            toast.info(
              `A link for resetting password was sent to your mail inbox. ${res.data.code}`
            );
            setEmailForOTP(values.email);
            router.push("/otp-verify");
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
          id="email"
          type="email"
          name="email"
          label="Registered Email"
          placeholder="Email Address"
          onChange={formik.handleChange}
          value={formik.values.email}
          error={formik.touched.email && formik.errors.email}
        />
      </div>

      <Button
        variant="filled"
        color="secondary"
        className="w-64 py-1.5"
        type="submit"
      >
        Reset Password
      </Button>
    </form>
  );
}
