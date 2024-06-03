"use client";

import Link from "next/link";
import { IUserDataForSignup } from "@/utils/interfaces";
import Input from "@/components/custom/Input";
import Checkbox from "@/components/custom/Checkbox";
import { Icon } from "@/libraries/iconify-react";
import {
  ICON_MAPPER,
  PATH_MAPPER,
  VALIDATION_DISMATCH_PASSWORDS,
  VALIDATION_REQUIRED_FIELD,
  L_STORAGE_REFRESH_TOKEN,
  L_STORAGE_AUTH_TOKEN,
} from "@/utils/constants";
import yup from "@/libraries/yup";
import { useFormik } from "@/libraries/formik";
import { FormEvent, FormHTMLAttributes, useContext, useState } from "react";
import Button from "../custom/buttons/Button";
import { toast } from "react-toastify";
import api from "@/utils/api";
import { useRouter } from "next/navigation";
import { getErrorMessage } from "@/utils/functions";
import { isValidPassword, inValidPasswordString } from "@/utils/validation";
import { useLocalStorage } from "@/libraries/usehooks-ts";
import { useAuth } from "@/contexts/AuthContext";
import Loading from "@/components/custom/Loading";
import { UserContext, useUser } from "@/contexts/UserContext";

interface IProps extends FormHTMLAttributes<HTMLFormElement> {
  // setUserData: (value: IUserDataForSignup) => void;
  userData: IUserDataForSignup;
  avatar: File | null;
}

const validationSchema = yup.object().shape({
  password: yup.string().required(VALIDATION_REQUIRED_FIELD),
  confPassword: yup
    .string()
    .oneOf([yup.ref("password", undefined)], VALIDATION_DISMATCH_PASSWORDS)
    .required(VALIDATION_REQUIRED_FIELD),
});

export default function ThirdStepSignUp({
  className = "",
  // setUserData,
  userData,
  avatar,
}: IProps) {
  const router = useRouter();
  const [isReadPolicy, setIsReadPolicy] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<
    string | boolean | undefined
  >(false);
  const [confPasswordError, setConfPasswordError] = useState<
    string | boolean | undefined
  >(false);
  const { setAuthToken, setRefreshToken, setAuthTokenInSessionStorage } = useAuth();
  const [, setAuthTokenInStore] = useLocalStorage(L_STORAGE_AUTH_TOKEN, "");
  const [, setRefreshTokenInStore] = useLocalStorage(
    L_STORAGE_REFRESH_TOKEN,
    ""
  );
  const [loading, setLoading] = useState<boolean>(false);
  const {setUserData} = useUser();

  const formik = useFormik({
    initialValues: {
      password: userData.password,
      confPassword: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const newUserData: IUserDataForSignup = {
        ...userData,
        password: values.password,
      };

      if (!avatar) {
        toast.warn("Please insert your avatar.");
        return;
      }
      // setUserData(newUserData);

      const formData = new FormData();
      formData.append("avatar", avatar);

      for (let key in newUserData) {
        formData.append(key, `${newUserData[key]}`);
      }

      setLoading(true);
      api
        .post("/create/professional", formData)
        .then((res) => {
          const { registered, token, refreshToken } = res.data;

          setLoading(false);
          if (registered) {
            api
              .post("/login", {email: userData.email, password: values.password})
              .then((res) => {
                const { userData, token, refreshToken } = res.data;
                let addTime: number = 7200000;
                sessionStorage.setItem(L_STORAGE_AUTH_TOKEN, token);
                setAuthTokenInSessionStorage(token);
                setRefreshToken(refreshToken);

                localStorage.setItem("expireTime", String(Date.now() + addTime));
                setUserData(userData);
                setLoading(false);
                router.push(PATH_MAPPER.dashboard);
              })
              .catch((err) => {
                setLoading(false);
                toast.error(getErrorMessage(err));
              });
          } else {
            toast.warn("Signing up was failed.");
          }
        })
        .catch((err) => {
          setLoading(false);
          toast.error(getErrorMessage(err));
        });
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValidPassword(formik.values.password)) {
      setPasswordError(inValidPasswordString);
      return;
    } else {
      setPasswordError(false);
    }

    if (!isValidPassword(formik.values.confPassword)) {
      setConfPasswordError(inValidPasswordString);
      return;
    } else if (formik.values.password !== formik.values.confPassword) {
      setConfPasswordError("Password confirmation mismatched.");
      return;
    } else {
      setConfPasswordError(false);
    }
    formik.handleSubmit();
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <form
          className={`flex flex-col items-center gap-8 ${className}`}
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="col-span-2 xl:col-span-1">
              <Input
                id="password"
                type="password"
                name="password"
                label="Password"
                placeholder="Password"
                endAdornment={<Icon icon={ICON_MAPPER.eye} />}
                onChange={formik.handleChange}
                value={formik.values.password}
                error={passwordError}
              />
            </div>
            <div className="col-span-2 xl:col-span-1">
              <Input
                id="conf-password"
                type="password"
                name="confPassword"
                label="Password confirmation"
                placeholder="Confirm your password"
                endAdornment={<Icon icon={ICON_MAPPER.eye} />}
                onChange={formik.handleChange}
                value={formik.values.confPassword}
                error={confPasswordError}
              />
            </div>
            <div className="col-span-2 s-checkbox-parent">
              <Checkbox
                name="isReadPolicy"
                color="secondary"
                label={
                  <>
                    I have read, understand and agree to the Dental Jobs Terms
                    of Service, including the{" "}
                    <Link href="#" className="text-secondary">
                      User Agreement
                    </Link>{" "}
                    and{" "}
                    <Link href="#" className="text-secondary">
                      Privacy Policy
                    </Link>
                    .
                  </>
                }
                onChange={(e) => setIsReadPolicy(e.target.checked)}
                checked={isReadPolicy}
              />
            </div>
          </div>

          <Button
            variant="filled"
            color="secondary"
            className="w-48"
            type="submit"
            disabled={!isReadPolicy}
          >
            Sign up
          </Button>
        </form>
      )}
    </>
  );
}
