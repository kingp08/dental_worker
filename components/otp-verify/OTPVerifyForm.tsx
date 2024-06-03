"use client";

import { ChangeEvent, FormEvent, FormHTMLAttributes, useState } from "react";
import { Typography } from "@/libraries/material-tailwind";
import Input from "@/components/custom/Input";
import Button from "@/components/custom/buttons/Button";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/utils/api";
import { toast } from "react-toastify";
import { getErrorMessage } from "@/utils/functions";
import { useRouter } from "next/navigation";

const INDEXES = [0, 1, 2, 3, 4, 5];

interface IProps extends FormHTMLAttributes<HTMLFormElement> {
  setLoading: (value: boolean | ((prev: boolean) => boolean)) => void;
}

export default function OTPVerifyForm({ className = "", setLoading }: IProps) {
  const router = useRouter();
  const { emailForOTP, setRefId } = useAuth();

  const [codeNumbers, setCodeNumbers] = useState<Array<string>>([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, i: number) => {
    setCodeNumbers((prev) => {
      const next = [...prev];
      next[i] = e.target.value[e.target.value.length - 1] || "";

      return next;
    });

    if (e.target.value && i < 5) {
      document.getElementById(`otp-${i + 1}`)?.focus();
    } else if (!e.target.value && i > 0) {
      document.getElementById(`otp-${(i - 1) % 6}`)?.focus();
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    api
      .post("/verify/forgot/password", {
        email: emailForOTP,
        code: codeNumbers.join(""),
      })
      .then((res) => {
        const { refId } = res.data;

        setLoading(false);
        if (refId) {
          setRefId(refId);
          router.push("/create-password");
        }
      })
      .catch((err) => {
        setLoading(false);
        toast.error(getErrorMessage(err));
      });
  };

  const resendOTP = () => {
    setLoading(true);
    api
      .post("/send/forgot/password", { email: emailForOTP })
      .then((res) => {
        setLoading(false);
        if (res.data.success) {
          toast.info(
            `A link for resetting password was sent to your mail inbox. ${res.data.code}`
          );
        }
      })
      .catch((err) => {
        setLoading(false);
        toast.error(getErrorMessage(err));
      });
  };

  return (
    <form
      className={`flex flex-col items-center gap-8 w-full ${className}`}
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-2">
        <Typography placeholder="" className="text-lightDark w-full">
          6 Digit OTP sent to{" "}
          <span className="text-primary">{emailForOTP}</span>
        </Typography>

        <div className="grid grid-cols-6 gap-4">
          {INDEXES.map((i) => (
            <Input
              key={i}
              id={`otp-${i}`}
              placeholder="-"
              className="text-2xl text-center"
              value={codeNumbers[i]}
              onChange={(e) => handleInputChange(e, i)}
            />
          ))}
        </div>
        <div className="flex justify-end">
          <button className="text-secondary" onClick={resendOTP}>
            Resend OTP
          </button>
        </div>
      </div>
      <Button
        variant="filled"
        color="secondary"
        type="submit"
        className="w-64 py-1.5"
      >
        Verify
      </Button>
    </form>
  );
}
