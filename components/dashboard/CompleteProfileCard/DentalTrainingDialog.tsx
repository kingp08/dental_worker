"use client";

import React, { FormEvent, useEffect, useState } from "react";
import Button from "@/components/custom/buttons/Button";
import Input from "@/components/custom/Input";
import Select from "@/components/custom/Select";
import Checkbox from "@/components/custom/Checkbox";
import { IComponent, ITraining } from "@/utils/interfaces";
import { Icon } from "@/libraries/iconify-react";
import { ICON_MAPPER, VALIDATION_REQUIRED_FIELD } from "@/utils/constants";

import {
  Dialog,
  DialogBody,
  IconButton,
  Typography,
} from "@/libraries/material-tailwind";
import type { DialogProps } from "@/libraries/material-tailwind";
import api from "@/utils/api";
import yup from "@/libraries/yup";
import { useFormik } from "@/libraries/formik";
import { toast } from "react-toastify";
import { getErrorMessage } from "@/utils/functions";
import Loading from "@/components/custom/Loading";
import { useUser } from "@/contexts/UserContext";

interface IProps extends IComponent {
  dentalTraining: boolean;
  setDentalTraining: Function;
  size: DialogProps["size"];
}

let gradYears: number[] = [];
let currentYear = new Date().getFullYear();
for (let index = currentYear - 100; index <= currentYear + 10; index++) {
  gradYears.push(index);
}

const validationSchema = yup.object().shape({
  school: yup.string().required(VALIDATION_REQUIRED_FIELD),
  gradYear: yup.string().required(VALIDATION_REQUIRED_FIELD),
});

const initValues: ITraining = {
  school: "",
  gradYear: `${currentYear - 10}`,
  graduated: false,
};

export default function DentalTrainingDialog({
  dentalTraining,
  setDentalTraining,
  size = "md",
}: IProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const { userData, setUserData } = useUser();

  const formik = useFormik({
    initialValues: initValues,
    validationSchema,
    onSubmit: (values) => {
      setLoading(true);
      api
        .post("/user/save/profile/training", values)
        .then((res) => {
          setLoading(false);
          if (res.data.success) {
            toast.success("Saved.");
            let tempUserData = userData;
            Object(tempUserData?.verifyData).trainingAdded = true;
            setUserData(tempUserData);
            handler();
          }
        })
        .catch((err) => {
          setLoading(false);
          toast.error(getErrorMessage(err));
        });
    },
  });

  const handler = () => {
    setDentalTraining(!dentalTraining);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formik.handleSubmit();
  };

  useEffect(() => {
    api
      .get("/user/get/profile/training")
      .then((res) => {
        formik.setValues(res.data);
      })
      .catch((err) => {});
  }, []);

  return (
    <Dialog placeholder="" handler={handler} open={dentalTraining} size={size}>
      <DialogBody placeholder="">
        {loading ? (
          <Loading />
        ) : (
          <>
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
            <div className="py-2 sm:px-10 xl:px-20">
              <div className="flex flex-col items-start gap-4">
                <div className="flex justify-between items-center">
                  <Typography
                    placeholder=""
                    className="text-xl ss:2xl md:text-3xl lg:text-4xl text-dark font-bold"
                  >
                    Dental Training
                  </Typography>
                  <Icon
                    icon={ICON_MAPPER.close}
                    className="flex text-dark font-bold text-xl ss:hidden cursor-pointer"
                    onClick={handler}
                  />
                </div>
                <Typography
                  placeholder=""
                  className="text-xs md:text-sm font-normal text-lightDark"
                >
                  Please only list schools which have a dental program
                </Typography>
              </div>

              <form
                className="flex flex-col items-stretch gap-4 mt-8"
                onSubmit={handleSubmit}
              >
                <Input
                  id="school"
                  name="school"
                  label="Dental School Name"
                  placeholder="Dental school name"
                  onChange={formik.handleChange}
                  value={formik.values.school}
                  error={formik.touched.school && formik.errors.school}
                />
                <Select
                  id="gradYear"
                  name="gradYear"
                  label="Graduation Year"
                  className="w-full bg-gray-200"
                  value={formik.values.gradYear}
                  onChange={formik.handleChange}
                >
                  {gradYears.map((gy) => (
                    <option key={gy} value={gy}>
                      {gy}
                    </option>
                  ))}
                </Select>
                <Checkbox
                  name="graduated"
                  color="secondary"
                  label="I am currently a student in a dental program for General Dentist"
                  checked={formik.values.graduated}
                  onChange={formik.handleChange}
                />
                <div className="flex justify-end">
                  <Button
                    variant="filled"
                    color="secondary"
                    className="py-2 px-8 text-sm"
                    type="submit"
                  >
                    Save
                  </Button>
                </div>
              </form>
            </div>
          </>
        )}
      </DialogBody>
    </Dialog>
  );
}
