"use client";
import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import yup from "@/libraries/yup";
import { useLocalStorage } from "@/libraries/usehooks-ts";
import { useFormik } from "@/libraries/formik";
import { Icon } from "@/libraries/iconify-react";
import { toast } from "@/libraries/react-toastify";
import {
  ICON_MAPPER,
  L_STORAGE_AUTH_TOKEN,
  L_STORAGE_REFRESH_TOKEN,
  PATH_MAPPER,
  VALIDATION_INVALID_EMAIL,
  VALIDATION_REQUIRED_FIELD,
} from "@/utils/constants";
import api from "@/utils/api";
import { getErrorMessage } from "@/utils/functions";
import Checkbox from "@/components/custom/Checkbox";
import Button from "@/components/custom/buttons/Button";
import Input from "@/components/custom/Input";
import { useUser } from "@/contexts/UserContext";
import { useAuth } from "@/contexts/AuthContext";
import { useSessionStorage } from "usehooks-ts";
import { decode } from "jsonwebtoken";


const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email(VALIDATION_INVALID_EMAIL)
    .required(VALIDATION_REQUIRED_FIELD),
  password: yup.string().required(VALIDATION_REQUIRED_FIELD),
});

export default function SigninForm({
  setLoading,
}: {
  setLoading: (value: boolean | ((prev: boolean) => boolean)) => void;
}) {
  const { setUserData } = useUser();
  const { setAuthToken, setRefreshToken } = useAuth();
  const [, setAuthTokenInStore] = useLocalStorage(L_STORAGE_AUTH_TOKEN, "");
  const [, setRefreshTokenInStore] = useLocalStorage(
    L_STORAGE_REFRESH_TOKEN,
    ""
  );
  const [, setAuthTokenInSession] = useSessionStorage(L_STORAGE_AUTH_TOKEN, '');
  const [, setRefreshTokenInSession] = useSessionStorage(L_STORAGE_REFRESH_TOKEN, '');
  const router = useRouter();

  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const formik = useFormik({
    validationSchema,
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      setLoading(true);
      api
        .post("/login", values)
        .then((res) => {
          const { userData, token, refreshToken } = res.data;
          let addTime: number = 0;
          
          if (rememberMe) {
            addTime = (decode(token) as { exp: number })?.exp; // 20days
            setAuthToken(token);
            setAuthTokenInStore(token);
            setRefreshTokenInStore(refreshToken);
          } else {
            addTime = 7200000; // 2hours
            sessionStorage.setItem(L_STORAGE_AUTH_TOKEN, token);
            setAuthTokenInSession(token);
            setRefreshTokenInSession(refreshToken);
          }

          localStorage.setItem("expireTime", String(Date.now() + addTime));
          setUserData(userData);
          setLoading(false);
          router.push(PATH_MAPPER.dashboard);
        })
        .catch((err) => {
          setLoading(false);
          toast.error(getErrorMessage(err));
        });
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formik.handleSubmit();
  };

  return (
    <form
      className="flex flex-col items-center gap-8 w-full"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col items-center gap-4 w-full">
        <Input
          type="email"
          id="email"
          label="Email"
          placeholder="Email address"
          onChange={formik.handleChange}
          value={formik.values.email}
          error={formik.touched.email && formik.errors.email}
        />
        <Input
          type="password"
          id="password"
          label="Password"
          placeholder="Password"
          endAdornment={<Icon icon={ICON_MAPPER.eye} />}
          onChange={formik.handleChange}
          value={formik.values.password}
          error={formik.touched.password && formik.errors.password}
        />
        <div className="flex items-center justify-between w-full">
          <Checkbox
            label="Remember me"
            color="secondary"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <Link href={PATH_MAPPER.forgotPassword} className="text-secondary">
            Forgot Password?
          </Link>
        </div>
      </div>
      <Button
        variant="filled"
        color="secondary"
        type="submit"
        className="w-64 py-1.5"
      >
        Login
      </Button>
    </form>
  );
}
