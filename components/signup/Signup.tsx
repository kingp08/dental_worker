import { useEffect, useState } from "react";
import { Stepper, Step, Typography } from "@material-tailwind/react";
import FirstStepSignup from "./FirstStepSignup";
import SecondStepSignup from "./SecondStepSignup";
import ThirdStepSignUp from "./ThirdStepSignUp";
import api from "@/utils/api";
import { IJobRole, IUserDataForSignup } from "@/utils/interfaces";

export default function Signup() {
  const [activeStep, setActiveStep] = useState(0);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarSrc, setAvatarSrc] = useState<string>("");
  const [userData, setUserData] = useState<IUserDataForSignup>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    zipCode: "",
    jobRole: 1,
    hourlyRate: 0,
  });

  const [jobRoles, setJobRoles] = useState<Array<IJobRole>>([]);

  const handleSignUpData = (value: IUserDataForSignup) => {
    setUserData(value);
  };

  const goToNextStep = () => setActiveStep((cur) => cur + 1);

  useEffect(() => {
    api.get("/get/categories").then((res) => setJobRoles(res.data));
  }, []);

  return (
    <div className="w-full pb-16">
      <Stepper
        placeholder=""
        className="my-4"
        activeStep={activeStep}
        lineClassName="bg-[#B6AACA]"
        activeLineClassName="bg-primary"
      >
        <Step
          placeholder=""
          className={`cursor-pointer ${
            activeStep === 0
              ? "!bg-primary"
              : "!bg-white border-2 border-[#B6AACA]"
          }`}
          onClick={() => setActiveStep(0)}
        >
          <Typography
            placeholder=""
            className={`text-lg font-bold ${
              activeStep === 0 ? "!text-white" : "!text-[#B6AACA]"
            }`}
          >
            1
          </Typography>
          <div className="absolute -bottom-[2.5rem] w-max text-center">
            <Typography
              placeholder=""
              className={`text-sm font-bold ${
                activeStep === 0 ? "!text-primary" : "!text-[#B6AACA]"
              }`}
            >
              Dental Training
            </Typography>
          </div>
        </Step>
        <Step
          placeholder=""
          className={`cursor-pointer ${
            activeStep === 1
              ? "!bg-primary"
              : "!bg-white border-2 border-[#B6AACA]"
          }`}
          onClick={() => setActiveStep(1)}
        >
          <Typography
            placeholder=""
            className={`text-lg font-bold ${
              activeStep === 1 ? "!text-white" : "!text-[#B6AACA]"
            }`}
          >
            2
          </Typography>
          <div className="absolute -bottom-[2.5rem] w-max text-center">
            <Typography
              placeholder=""
              className={`text-sm font-bold ${
                activeStep === 1 ? "!text-primary" : "!text-[#B6AACA]"
              }`}
            >
              Information
            </Typography>
          </div>
        </Step>
        <Step
          placeholder=""
          className={`cursor-pointer ${
            activeStep === 2
              ? "!bg-primary"
              : "!bg-white border-2 border-[#B6AACA]"
          }`}
          onClick={() => setActiveStep(2)}
        >
          <Typography
            placeholder=""
            className={`text-lg font-bold ${
              activeStep === 2 ? "!text-white" : "!text-[#B6AACA]"
            }`}
          >
            3
          </Typography>
          <div className="absolute -bottom-[2.5rem] w-max text-center">
            <Typography
              placeholder=""
              className={`text-sm font-bold ${
                activeStep === 3 ? "!text-primary" : "!text-[#B6AACA]"
              }`}
            >
              Password
            </Typography>
          </div>
        </Step>
      </Stepper>

      <div className="pt-12">
        {activeStep === 0 ? (
          <FirstStepSignup
            setAvatar={setAvatar}
            goToNextStep={goToNextStep}
            setAvatarSrc={setAvatarSrc}
            avatarSrc={avatarSrc}
          />
        ) : activeStep === 1 ? (
          <SecondStepSignup
            goToNextStep={goToNextStep}
            jobRoles={jobRoles}
            setUserData={setUserData}
            userData={userData}
          />
        ) : (
          <ThirdStepSignUp
            avatar={avatar}
            userData={userData}
            // setUserData={handleSignUpData}
          />
        )}
      </div>
    </div>
  );
}
