"use client";
import {
  Dispatch,
  FormEvent,
  FormHTMLAttributes,
  SetStateAction,
  useEffect,
} from "react";
import Button from "@/components/custom/buttons/Button";
import { PhoneInput } from "@/libraries/react-phone-number-input";
import { useUser } from "@/contexts/UserContext";
import api from "@/utils/api";
import { toast } from "@/libraries/react-toastify";
import { getErrorMessage } from "@/utils/functions";

interface IProps extends FormHTMLAttributes<HTMLFormElement> {
  setOtpSent: Dispatch<SetStateAction<boolean>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setPhone: Dispatch<SetStateAction<string>>;
  phone: string;
}

export default function PhoneForm({
  setOtpSent,
  setLoading,
  setPhone,
  phone,
  ...others
}: IProps) {
  const { userData } = useUser();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    api
      .post("/user/send/phone/verification", { phone: phone.slice(2) })
      .then((res) => {
        setLoading(false);
        toast.success(`OTP: ${res.data.code}`);
        setOtpSent(true);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(getErrorMessage(err));
      });
  };

  useEffect(() => {
    if (userData?.phone) {
      const onlyNumbers = userData.phone.replace(/\D/g, "");
      setPhone(`+1${onlyNumbers}`);
    }
  }, [userData?.phone]);

  return (
    <form
      className="flex flex-col gap-4 items-end"
      onSubmit={handleSubmit}
      {...others}
    >
      <div className="flex flex-col items-start gap-1 w-full">
        <label htmlFor="phone">Phone Number</label>
        <PhoneInput
          country="US"
          value={phone}
          onChange={(value) => setPhone(value || "")}
          className="w-full bg-gray-300 px-2 py-2 rounded-md"
        />
      </div>

      <Button color="secondary" variant="filled" type="submit">
        Send The Code
      </Button>
    </form>
  );
}
