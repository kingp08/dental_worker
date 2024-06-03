"use client";
import { AllHTMLAttributes, FormEvent } from "react";
import Input from "@/components/custom/Input";
import IMask from "imask";
import {
  VALIDATION_INVALID_EMAIL,
  VALIDATION_REQUIRED_FIELD,
  VALIDATION_INVALID_PHONE,
} from "@/utils/constants";
import yup from "@/libraries/yup";
import { useFormik, FormikProvider } from "@/libraries/formik";
import Button from "@/components/custom/buttons/Button";
import { IJobRole, IUserDataForSignup } from "@/utils/interfaces";
import Select from "../custom/Select";

interface IProps extends AllHTMLAttributes<HTMLDivElement> {
  goToNextStep: () => void;
  jobRoles: Array<IJobRole>;
  setUserData: (
    value:
      | IUserDataForSignup
      | ((prev: IUserDataForSignup) => IUserDataForSignup)
  ) => void;
  userData: IUserDataForSignup;
}

const regCheck = new RegExp(/\([2-9][0-9]{2}\) ?[2-9][0-9]{2}-[0-9]{4}\b/);

const validationSchema = yup.object().shape({
  firstName: yup.string().required(VALIDATION_REQUIRED_FIELD),
  lastName: yup.string().required(VALIDATION_REQUIRED_FIELD),
  email: yup
    .string()
    .email(VALIDATION_INVALID_EMAIL)
    .required(VALIDATION_REQUIRED_FIELD),
  phone: yup.string()
  .required(VALIDATION_REQUIRED_FIELD)
  .matches(regCheck,VALIDATION_INVALID_PHONE),
  zipCode: yup.string().required(VALIDATION_REQUIRED_FIELD),
});

export default function SecondStepSignup({
  className = "",
  goToNextStep,
  jobRoles,
  setUserData,
  userData,
}: IProps) {

  const handlePhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    const input: any = event.target;
    const mask = IMask(input , {
      mask: '(000) 000-0000',
    });

    formik.setFieldValue("phone", event.target.value);
  }; 

  const formik = useFormik({
    initialValues: {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      phone: userData.phone,
      zipCode: userData.zipCode,
      jobRole: userData.jobRole,
      hourlyRate: userData.hourlyRate,
    },
    validationSchema,
    onSubmit: (values) => {
      const newUserData = {
        ...values,
        jobRole: Number(values.jobRole),
        hourlyRate: Number(values.hourlyRate),
        password: "",
      };
      setUserData(newUserData);
      goToNextStep();
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formik.handleSubmit();
  };

  return (
    <form
      className={`flex flex-col items-center gap-8 ${className}`}
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-2 gap-4 w-full">
        <div className="col-span-2 xl:col-span-1">
          <Input
            id="first-name"
            name="firstName"
            label="First Name"
            placeholder="First Name"
            onChange={formik.handleChange}
            value={formik.values.firstName}
            error={formik.touched.firstName && formik.errors.firstName}
          />
        </div>
        <div className="col-span-2 xl:col-span-1">
          <Input
            id="last-name"
            name="lastName"
            label="Last Name"
            placeholder="Last Name"
            onChange={formik.handleChange}
            value={formik.values.lastName}
            error={formik.touched.lastName && formik.errors.lastName}
          />
        </div>
        <div className="col-span-2">
          <Input
            id="email"
            name="email"
            label="Email"
            placeholder="Email address"
            onChange={formik.handleChange}
            value={formik.values.email}
            error={formik.touched.email && formik.errors.email}
          />
        </div>
        <div className="col-span-2 xl:col-span-1">
          <FormikProvider value={formik}>
            <Input
              id="phone"
              name="phone"
              label="Phone Number"
              placeholder="(XXX) XXX-XXXX"
              onChange={handlePhoneNumberChange}
              value={formik.values.phone}
              error={formik.touched.phone && formik.errors.phone}
            />
          </FormikProvider>
        </div>
        <div className="col-span-2 xl:col-span-1">
          <Input
            id="zip-code"
            name="zipCode"
            label="Zip Code"
            placeholder="123456"
            onChange={formik.handleChange}
            value={formik.values.zipCode}
            error={formik.touched.zipCode && formik.errors.zipCode}
          />
        </div>
        <div className="col-span-2 xl:col-span-1">
          <Select
            id="job-role"
            name="jobRole"
            label="Job Role"
            onChange={formik.handleChange}
            value={formik.values.jobRole}
            error={formik.touched.jobRole && formik.errors.jobRole}
            className="bg-gray-200 border-none rounded-sm py-3 pl-3"
          >
            {jobRoles.map((jobRole) => (
              <>
                <option key={jobRole.id} value={jobRole.id}>
                  {jobRole.label}
                </option>
              </>
            ))}
          </Select>
        </div>
        <div className="col-span-2 xl:col-span-1">
          <Input
            id="hourlyRate"
            type="number"
            name="hourlyRate"
            label="Hourly Rate"
            startAdornment="$"
            onChange={formik.handleChange}
            value={formik.values.hourlyRate}
            error={formik.touched.hourlyRate && formik.errors.hourlyRate}
            endAdornment="/hr"
          />
        </div>
      </div>

      <Button variant="filled" color="secondary" className="w-48" type="submit">
        Next
      </Button>
    </form>
  );
}
