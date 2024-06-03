import { Dispatch, FormEvent, FormHTMLAttributes, SetStateAction } from "react";
import Input from "@/components/custom/Input";
import { useFormik } from "@/libraries/formik";
import yup from "@/libraries/yup";
import { VALIDATION_REQUIRED_FIELD } from "@/utils/constants";
import Button from "@/components/custom/buttons/Button";
import api from "@/utils/api";
import { toast } from "react-toastify";
import { getErrorMessage } from "@/utils/functions";
import { useUser } from "@/contexts/UserContext";

interface IProps extends FormHTMLAttributes<HTMLFormElement> {
  setOtpSent: Dispatch<SetStateAction<boolean>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  handler: () => void;
  phone: string;
}

export default function OTPForm({
  setOtpSent,
  setLoading,
  handler,
  phone,
  ...others
}: IProps) {
  const { userData, setUserData } = useUser();
  const formik = useFormik({
    initialValues: {
      otp: "",
    },
    validationSchema: yup.object().shape({
      otp: yup.string().required(VALIDATION_REQUIRED_FIELD),
    }),
    onSubmit: ({ otp }) => {
      setLoading(true);
      api
        .post("/user/verify/phone/number", {
          phone: phone.slice(2),
          code: otp,
        })
        .then(() => {
          setLoading(false);
          setOtpSent(true);
          let tempUserData = userData;
          Object(tempUserData?.verifyData).phoneConfirmed = true;
          setUserData(tempUserData);
          handler();
          toast.success("You phone has been verified.");
        })
        .catch((err) => {
          setLoading(false);
          toast.error(getErrorMessage(err));
        });
    },
  });

  const resendCode = () => {
    setOtpSent(false);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formik.handleSubmit();
  };

  return (
    <form
      className="flex flex-col items-end gap-4"
      onSubmit={handleSubmit}
      {...others}
    >
      <Input
        id="otp"
        name="otp"
        label="OTP"
        onChange={formik.handleChange}
        value={formik.values.otp}
        error={formik.touched.otp && formik.errors.otp}
      />
      <button className="text-red-500" onClick={resendCode}>
        Resend Code
      </button>
      <Button type="submit" color="secondary" variant="filled">
        Send The Code
      </Button>
    </form>
  );
}
