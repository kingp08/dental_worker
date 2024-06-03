"use client";

import { useCallback, useEffect, useState } from "react";
import { IComponent } from "@/utils/interfaces";
import CardTemplate from "@/components/custom/CardTemplate";
import { Typography } from "@/libraries/material-tailwind";
import { Icon } from "@/libraries/iconify-react";
import { ICON_MAPPER } from "@/utils/constants";
import DentalTrainingDialog from "./DentalTrainingDialog";
import VerifyEmailDialog from "./VerifyEmailDialog";
import VerifyPhoneDialog from "./VerifyPhoneDialog";
import AddLicenseDialog from "./AddLicenseNum";
import ListSkillsDialog from "./ListSkillsDialog";
import BackgroundDescDialog from "./BackgroundDescDialog";
import LanguagesDialog from "./LanguagesDialog";
import UploadProfilePicDialog from "./UploadProfilePicDialog";
import BackgroundCheckDialog from "./BackgroundCheckDialog";
import { useUser } from "@/contexts/UserContext";
import api from "@/utils/api";
import { useAuth } from "@/contexts/AuthContext";
import { LINKS_TO_COMPLETE } from "@/utils/constants";

export default function CompleteProfileCard({ className = "" }: IComponent) {
  const [dentalTraining, setDentalTraining] = useState<boolean>(false);
  const [verifyEmail, setVerifyEmail] = useState<boolean>(false);
  const [verifyPhone, setVerifyPhone] = useState<boolean>(false);
  const [addLicenseNumDialog, setAddLicenseNumDialog] =
    useState<boolean>(false);
  const [listSkillsDialog, setListSkillsDialog] = useState<boolean>(false);
  const [backgroundDesc, setBackgroundDesc] = useState<boolean>(false);
  const [languagesDialog, setLanguagesDialog] = useState<boolean>(false);
  const [uploadProfilePic, setUploadProfilePic] = useState<boolean>(false);
  const [backgroundCheck, setBackgroundCheck] = useState<boolean>(false);
  const { userData, setUserData } = useUser();
  const { authToken } = useAuth();

  const handleLINKS_TO_COMPLETE = useCallback((title: string) => {
    switch (title) {
      case "Dental Training":
        setDentalTraining(true);
        break;
      case "Verify Your Email Address":
        setVerifyEmail(true);
        break;
      case "Verify Your Mobile Phone Number":
        setVerifyPhone(true);
        break;
      case "Add Your License Number":
        setAddLicenseNumDialog(true);
        break;
      case "List Your Skills":
        setListSkillsDialog(true);
        break;
      case "Background Description":
        setBackgroundDesc(true);
        break;
      case "Languages Your Speak":
        setLanguagesDialog(true);
        break;
      case "Upload Your Profile Picture & Photo ID":
        setUploadProfilePic(true);
        break;
      case "Complete A Background Check (Optional)":
        setBackgroundCheck(true);
        break;
      default:
        break;
    }
  }, []);

  useEffect(() => {
    api
      .get("/professional/get/profile/info")
      .then((res) => {
        setUserData({ ...userData, ...res.data });
      })
      .catch(() => {});
  }, [authToken]);

  return (
    <>
      <CardTemplate className={className} title="Complete Your Profile">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-y-4 xl:gap-y-16">
          {LINKS_TO_COMPLETE.map((link) => (
            <div
              key={link.id}
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => handleLINKS_TO_COMPLETE(link.label)}
            >
              <Icon
                icon={ICON_MAPPER.circleCheck}
                className={
                  userData?.verifyData && userData?.verifyData[link.key]
                    ? "text-light-green-700 text-2xl"
                    : "text-secondary text-2xl"
                }
              />
              <Typography
                placeholder=""
                className="text-dark text-sm xl:text-base font-semibold"
              >
                {link.label}
              </Typography>
            </div>
          ))}
        </div>
      </CardTemplate>
      <DentalTrainingDialog
        dentalTraining={dentalTraining}
        setDentalTraining={setDentalTraining}
        size="sm"
      />
      <VerifyEmailDialog
        verifyEmail={verifyEmail}
        setVerifyEmail={setVerifyEmail}
        size="sm"
      />
      <VerifyPhoneDialog
        verifyPhone={verifyPhone}
        setVerifyPhone={setVerifyPhone}
        size="sm"
      />
      <AddLicenseDialog
        addLicenseNumDialog={addLicenseNumDialog}
        setAddLicenseNumDialog={setAddLicenseNumDialog}
        size="md"
      />
      <ListSkillsDialog
        listSkillsDialog={listSkillsDialog}
        setListSkillsDialog={setListSkillsDialog}
        size="md"
      />
      <BackgroundDescDialog
        backgroundDesc={backgroundDesc}
        setBackgroundDesc={setBackgroundDesc}
        size="md"
      />
      <BackgroundCheckDialog
        backgroundCheck={backgroundCheck}
        setBackgroundCheck={setBackgroundCheck}
        size="md"
      />
      {languagesDialog && (
        <LanguagesDialog
          languagesDialog={languagesDialog}
          setLanguagesDialog={setLanguagesDialog}
          size="md"
        />
      )}
      {uploadProfilePic && (
        <UploadProfilePicDialog
          uploadProfilePic={uploadProfilePic}
          setUploadProfilePic={setUploadProfilePic}
          size="lg"
        />
      )}
    </>
  );
}
