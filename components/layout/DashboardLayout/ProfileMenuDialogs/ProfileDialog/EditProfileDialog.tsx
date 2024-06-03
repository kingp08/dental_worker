import React, { useState } from "react";
import { DialogHeader, DialogProps } from "@/libraries/material-tailwind";
import { IComponent } from "@/utils/interfaces";
import {
  Dialog,
  DialogBody,
  IconButton,
  Typography,
  MTInput,
} from "@/libraries/material-tailwind";
import { Icon } from "@/libraries/iconify-react";
import { ICON_MAPPER } from "@/utils/constants";
import Button from "@/components/custom/buttons/Button";
import api from "@/utils/api";
import { toast } from "@/libraries/react-toastify";
import { getErrorMessage } from "@/utils/functions";
import { Input } from "@material-tailwind/react";
import Image from "next/image";

interface IProps extends IComponent {
  addEditProfileDialog: boolean;
  setAddEditProfileDialog: Function;
  handleSave: any;
  size: DialogProps["size"];
}

export default function EditProfileDialog({
  addEditProfileDialog,
  setAddEditProfileDialog,
  handleSave,
  size = "lg",
}: IProps) {
  const [fname, setFname] = useState<string>("");
  const [lname, setLname] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [zipcode, setZipcode] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [selectPermanentJob, setSelectPermanentJob] = useState<boolean>(false);
  const [selectTempJob, setSelectTempJob] = useState<boolean>(false);
  const [photoID, setPhotoID] = useState<any>();
  const [profilePhoto, setProfilePhoto] = useState<any>();

  const handler = () => {
    setAddEditProfileDialog(!addEditProfileDialog);
  };

  const handleUpdate = () => {
    api
      .post("/user/update/professional/profile/info", {
        firstName: fname,
        lastName: lname,
        address: address,
        city: city,
        zipCode: zipcode,
        phone: phone,
        jobMode: selectTempJob ? selectTempJob : selectPermanentJob,
        avtar: File,
        idImage: File,
      })
      .then((res) => {
        toast.success("Saved successfully.");
      })
      .catch((err) => {
        toast.error(getErrorMessage(err));
      });

    setFname("");
    setLname("");
    setAddress("");
    setCity("");
    setZipcode("");
    setPhone("");
    setSelectPermanentJob(false);
    setSelectTempJob(false);
    setPhotoID(undefined);
    setProfilePhoto(undefined);
  };

  const handleChange = (e: any) => {
    const { id, value } = e.target;

    if (id === "fname") {
      setFname(value);
    } else if (id === "lname") {
      setLname(value);
    } else if (id === "address") {
      setAddress(value);
    } else if (id === "city") {
      setCity(value);
    } else if (id === "zipcode") {
      setZipcode(value);
    } else if (id === "phone") {
      setPhone(value);
    } else if (id === "profilephoto") {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result);
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    } else if (id === "photoid") {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoID(reader.result);
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    }
  };

  const handlePermanentJobClick = () => {
    if (!selectPermanentJob) {
      setSelectPermanentJob(true);
      setSelectTempJob(false);
    }
  };

  const handleTempJobClick = () => {
    if (!selectTempJob) {
      setSelectTempJob(true);
      setSelectPermanentJob(false);
    }
  };

  return (
    <>
      <Dialog
        placeholder=""
        handler={handler}
        open={addEditProfileDialog}
        size={size}
        className="h-[80%] overflow-y-auto"
      >
        <DialogHeader
          placeholder=""
          className="hidden sm:flex justify-end pt-4 pb-0"
        >
          <IconButton
            placeholder=""
            className="text-2xl text-lightDark w-8 h-8"
            variant="text"
            onClick={handler}
          >
            <Icon icon={ICON_MAPPER.close} />
          </IconButton>
        </DialogHeader>
        <DialogBody placeholder="" className="sm:px-10 xl:px-20 flex flex-col">
          <div className="flex justify-between items-center">
            <div className="flex justify-between items-center">
              <Typography
                placeholder=""
                className="text-xl ss:2xl md:text-3xl lg:text-4xl text-dark font-bold"
              >
                Edit Profile
              </Typography>
            </div>
            <div>
              <Button
                variant="filled"
                color="secondary"
                className="py-2 px-4"
                onClick={handleUpdate}
              >
                Update Profile
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div>
                <Typography
                  placeholder=""
                  className="text-base text-lightDark pt-4"
                >
                  First Name
                </Typography>
                <Input
                  placeholder="First Name"
                  id="fname"
                  value={fname}
                  className="!border-l-0 !border-r-0 !border-t-0 !border-b-[#EAE7F1]  !bg-[#FCFAFF] "
                  labelProps={{
                    className: "hidden",
                  }}
                  crossOrigin={undefined}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Typography
                  placeholder=""
                  className="text-base text-lightDark pt-4"
                >
                  Last Name
                </Typography>
                <MTInput
                  placeholder="Last Name"
                  id="lname"
                  value={lname}
                  className="!border-l-0 !border-r-0 !border-t-0 !border-b-[#EAE7F1]  !bg-[#FCFAFF]  placeholder:text-[#B6AACA]"
                  labelProps={{
                    className: "hidden",
                  }}
                  crossOrigin={undefined}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Typography
                  placeholder=""
                  className="text-base text-lightDark pt-4"
                >
                  Address
                </Typography>
                <MTInput
                  placeholder="Street number and name"
                  id="address"
                  value={address}
                  className="!border-l-0 !border-r-0 !border-t-0 !border-b-[#EAE7F1]  !bg-[#FCFAFF]  placeholder:text-[#B6AACA]"
                  labelProps={{
                    className: "hidden",
                  }}
                  crossOrigin={undefined}
                  onChange={handleChange}
                />
                <div className="flex justify-end items-center gap-3 pt-2">
                  <MTInput
                    placeholder="City"
                    id="city"
                    value={city}
                    className="!border-l-0 !border-r-0 !border-t-0 !border-b-[#EAE7F1]  !bg-[#FCFAFF]  placeholder:text-[#B6AACA]"
                    labelProps={{
                      className: "hidden",
                    }}
                    crossOrigin={undefined}
                    onChange={handleChange}
                  />
                  <MTInput
                    placeholder="Zip Code"
                    id="zipcode"
                    value={zipcode}
                    className="!border-l-0 !border-r-0 !border-t-0 !border-b-[#EAE7F1]  !bg-[#FCFAFF]  placeholder:text-[#B6AACA]"
                    labelProps={{
                      className: "hidden",
                    }}
                    crossOrigin={undefined}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Typography
                    placeholder=""
                    className="text-base text-lightDark pt-4"
                  >
                    Phone Number
                  </Typography>
                  <MTInput
                    placeholder="Phone Number"
                    id="phone"
                    maxLength={10}
                    value={phone}
                    className="!border-l-0 !border-r-0 !border-t-0 !border-b-[#EAE7F1]  !bg-[#FCFAFF]  placeholder:text-[#B6AACA]"
                    labelProps={{
                      className: "hidden",
                    }}
                    crossOrigin={undefined}
                    onChange={handleChange}
                  />
                </div>
                <div className="text-base text-lightDark pt-4">
                  Are you open to permanent work or temporary work?
                </div>
                <div
                  className="flex items-center gap-2 py-2 cursor-pointer"
                  onClick={handlePermanentJobClick}
                >
                  <Icon
                    icon={
                      selectPermanentJob
                        ? ICON_MAPPER.circleFilledCheck
                        : ICON_MAPPER.circleCheck
                    }
                    className={`text-xl -mt-2 ${
                      selectPermanentJob ? "text-secondary" : "text-[#D9D2E4]"
                    }`}
                  />
                  <div className="flex items-center gap-2">
                    <Typography
                      placeholder=""
                      className="text-base text-lightDark pb-2"
                    >
                      Permanent Job
                    </Typography>
                  </div>

                  <div
                    className="flex items-center gap-2"
                    onClick={handleTempJobClick}
                  >
                    <Icon
                      icon={
                        selectTempJob
                          ? ICON_MAPPER.circleFilledCheck
                          : ICON_MAPPER.circleCheck
                      }
                      className={`text-xl -mt-2 ${
                        selectTempJob ? "text-secondary" : "text-[#D9D2E4]"
                      }`}
                    />

                    <Typography
                      placeholder=""
                      className="text-base text-lightDark pb-2"
                    >
                      Temporary Job
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 pt-2">
              <div className="">
                <div className="grid grid-cols-2 gap-4 ">
                  <div>
                    <div className="flex gap-2 justify-center items-center md:justify-start text-2xl text-dark font-bold">
                      Profile Photo
                      <Icon
                        icon={ICON_MAPPER.edit}
                        className="w-5 h-4 text-secondary"
                      />
                    </div>
                    <div className="text-0.5xl">(Head Shot)</div>
                  </div>
                  <div className="relative flex flex-col h-40 justify-center items-center !bg-[#FCFAFF]">
                    <Image
                      className={`${
                        profilePhoto
                          ? "w-40 h-40 object-cover"
                          : "w-auto h-auto"
                      }  bg-white rounded-lg`}
                      src={profilePhoto || "/templateImages/gallery.png"}
                      alt=""
                      width={150}
                      height={150}
                    />
                    <div className="absolute top-16 opacity-0">
                      <MTInput
                        id="profilephoto"
                        type="file"
                        className="!border-l-0 !border-r-0 !border-t-0 !border-b-[#EAE7F1]  !bg-[#FCFAFF]  placeholder:text-[#B6AACA]"
                        labelProps={{
                          className: "hidden",
                        }}
                        crossOrigin={undefined}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex gap-2 justify-center items-center md:justify-start text-2xl text-dark font-bold">
                      Photo ID
                      <Icon
                        icon={ICON_MAPPER.edit}
                        className="w-5 h-4 text-secondary"
                      />
                    </div>
                    <div>(e.g Driver&apos;s License)</div>
                  </div>
                  <div className="relative flex flex-col h-40 justify-center items-center !bg-[#FCFAFF]">
                    <Image
                      className={`${
                        photoID ? "w-40 h-40 object-cover" : "w-auto h-auto"
                      }  bg-white rounded-lg`}
                      src={photoID || "/templateImages/gallery.png"}
                      alt=""
                      width={150}
                      height={150}
                    />
                    <div className={`absolute top-16 opacity-0`}>
                      <MTInput
                        id="photoid"
                        type="file"
                        className="!border-l-0 !border-r-0 !border-t-0 !border-b-[#EAE7F1] !bg-[#FCFAFF] placeholder:text-[#B6AACA]"
                        labelProps={{
                          className: "hidden",
                        }}
                        crossOrigin={undefined}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
}
