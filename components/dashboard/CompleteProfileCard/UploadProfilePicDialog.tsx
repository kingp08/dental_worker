import { useState, ChangeEvent, useRef } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogBody,
  Avatar,
  IconButton,
  Typography,
} from "@/libraries/material-tailwind";
import type { DialogProps } from "@/libraries/material-tailwind";
import { Icon } from "@/libraries/iconify-react";
import { toast } from "@/libraries/react-toastify";
import api from "@/utils/api";
import { ICON_MAPPER } from "@/utils/constants";
import { getErrorMessage } from "@/utils/functions";
import { IComponent } from "@/utils/interfaces";
import { useUser } from "@/contexts/UserContext";
import Loading from "@/components/custom/Loading";
import Button from "@/components/custom/buttons/Button";

interface IProps extends IComponent {
  uploadProfilePic: boolean;
  setUploadProfilePic: React.Dispatch<React.SetStateAction<boolean>>;
  size: DialogProps["size"];
}

export default function UploadProfilePicDialog({
  uploadProfilePic,
  setUploadProfilePic,
  size = "md",
}: IProps) {
  const handleClose = () => {
    setUploadProfilePic(false);
  };

  const { userData, setUserData } = useUser();
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [profilePhotoSrc, setProfilePhotoSrc] = useState<string>(
    userData?.avatar ? userData.avatar : ""
  );
  const [photoID, setPhotoID] = useState<File | null>(null);
  const [photoIDSrc, setPhotoIDSrc] = useState<string>("");
  const profileInputFile = useRef<HTMLInputElement | null>(null);
  const photoIDInputFile = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const openProfilePhotoWindow = () => {
    profileInputFile.current?.click();
  };

  const openPhotoIDWindow = () => {
    photoIDInputFile.current?.click();
  };

  const selectProfilePhoto = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePhoto(e.target.files[0]);
      setProfilePhotoSrc(URL.createObjectURL(e.target.files[0]));
    }
  };

  const selectPhotoID = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhotoID(e.target.files[0]);
      setPhotoIDSrc(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    profilePhoto && formData.append("avatar", profilePhoto);
    photoID && formData.append("idImg", photoID);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    api
      .post("/user/upload/profile/photos", formData, config)
      .then((res) => {
        setUserData((prev) =>
          prev
            ? {
              ...prev,
              avatar: res.data.profilePhoto,
            }
            : prev
        );
        setLoading(false);
        toast.success("Uploaded.");
      })
      .catch((err) => {
        setLoading(false);
        toast.error(getErrorMessage(err));
      });
  };

  return (
    <Dialog
      placeholder=""
      handler={handleClose}
      open={uploadProfilePic}
      size={size}
      className="h-[80%] overflow-y-auto"
    >
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
                onClick={handleClose}
              >
                <Icon icon={ICON_MAPPER.close} />
              </IconButton>
            </div>
            <div className="p-2 sm:px-10 xl:px-20">
              <div className="flex justify-between items-center">
                <Typography
                  placeholder=""
                  className="text-xl ss:2xl md:text-3xl lg:text-4xl text-dark font-bold"
                >
                  Upload your profile picture and photo ID
                </Typography>
                <Icon
                  icon={ICON_MAPPER.close}
                  className="flex text-dark font-bold text-xl ss:hidden cursor-pointer"
                  onClick={handleClose}
                />
              </div>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-6 pt-6">
                  <div className="flex flex-col gap-2">
                    <Typography
                      placeholder=""
                      className="text-base font-bold text-dark"
                    >
                      Upload your profile photo
                    </Typography>
                    <Typography
                      placeholder=""
                      className="text-base font-normal text-lightDark"
                    >
                      Your profile photo should clearly show your face so that
                      we can compare it to the one in your photo ID. This photo
                      will be shown to offices on your profile.
                    </Typography>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="col-span-1 flex-col gap-2">

                      <div className="grid grid-cols-2">
                        <div className="col-span-2 md:col-span-1">
                          <Typography
                            placeholder=""
                            className="text-xl font-bold text-dark"
                          >
                            Profile Photo
                          </Typography>
                          <Typography
                            placeholder=""
                            className="text-base font-normal text-lightDark"
                          >
                            (Head Shot)
                          </Typography>
                        </div>
                        <div className="col-span-2 pt-3 md:pt-0 md:col-span-1 cursor-pointer">
                          <div
                            className="relative bg-[#FCFAFF] rounded-lg flex justify-center items-center w-[134px] h-[134px] md:w-[180px] md:h-[180px]"
                            onClick={openProfilePhotoWindow}
                          >
                            {!!profilePhotoSrc ? (
                              <Avatar
                                variant="square"
                                placeholder=""
                                src={profilePhotoSrc}
                                alt=""
                                width={148}
                                height={148}
                                className="w-full h-full"
                              />
                            ) : (
                              <>
                                <Avatar
                                  variant="square"
                                  placeholder=""
                                  src={profilePhotoSrc}
                                  alt=""
                                  width={148}
                                  height={148}
                                  className="w-full h-full"
                                />
                                <Icon
                                  icon={ICON_MAPPER.gallery}
                                  className="text-[#EAE7F1] w-[46px] h-[46px] md:[62px] md:h-[62px]"
                                />
                              </>
                            )}
                            <div className="absolute w-10 h-10 rounded-full border-4 border-white right-[-12px] bottom-[-15px] flex justify-center items-center">
                              <IconButton
                                placeholder=""
                                className="w-9 h-9 rounded-full bg-[#FFE6E5] shadow-none"
                              >
                                <Icon
                                  icon={
                                    !!profilePhotoSrc
                                      ? ICON_MAPPER.edit
                                      : ICON_MAPPER.plus
                                  }
                                  className="w-5 h-5 text-[#FF817B]"
                                />
                              </IconButton>
                              <input
                                type="file"
                                accept="image/*"
                                hidden
                                ref={profileInputFile}
                                onChange={selectProfilePhoto}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Typography
                      placeholder=""
                      className="text-base font-bold text-dark"
                    >
                      Upload a picture of your photo ID
                    </Typography>
                    <Typography
                      placeholder=""
                      className="text-base font-normal text-lightDark"
                    >
                      Please take a picture of your photo ID (preferably your
                      driver&apos;s license) that clearly shows your face and
                      your legal name. This photo will NOT be shown to offices.
                    </Typography>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="col-span-1 flex-col gap-2">
                      <div className="grid grid-cols-2">
                        <div className="col-span-2 md:col-span-1">
                          <Typography
                            placeholder=""
                            className="text-xl font-bold text-dark"
                          >
                            Photo ID
                          </Typography>
                          <Typography
                            placeholder=""
                            className="text-base font-normal text-lightDark"
                          >
                            (e.g Driver&apos;s License)
                          </Typography>
                        </div>
                        <div className="col-span-2 pt-3 md:pt-0 md:col-span-1 cursor-pointer">
                          <div
                            className="relative bg-[#FCFAFF] rounded-lg flex justify-center items-center w-[134px] h-[134px] md:w-[180px] md:h-[180px]"
                            onClick={openPhotoIDWindow}
                          >
                            {!!photoIDSrc ? (
                              <Image
                                src={photoIDSrc}
                                alt="avatar"
                                width={148}
                                height={148}
                                className="w-full h-full"
                              />
                            ) : (
                              <Icon
                                icon={ICON_MAPPER.gallery}
                                className="text-[#EAE7F1] w-[46px] h-[46px] md:[62px] md:h-[62px]"
                              />
                            )}
                            <div className="absolute w-10 h-10 rounded-full border-4 border-white right-[-12px] bottom-[-15px] flex justify-center items-center">
                              <IconButton
                                placeholder=""
                                className="w-9 h-9 rounded-full bg-[#FFE6E5] shadow-none"
                              >
                                <Icon
                                  icon={
                                    !!photoIDSrc
                                      ? ICON_MAPPER.edit
                                      : ICON_MAPPER.plus
                                  }
                                  className="w-5 h-5 text-[#FF817B]"
                                />
                              </IconButton>
                              <input
                                type="file"
                                accept="image/*"
                                hidden
                                ref={photoIDInputFile}
                                onChange={selectPhotoID}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full rounded-lg mt-3">
                  <div className="flex justify-end pt-2">
                    <Button
                      type="submit"
                      variant="filled"
                      color="secondary"
                      className="py-2 px-8 text-sm"
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </>
        )}
      </DialogBody>
    </Dialog>
  );
}
