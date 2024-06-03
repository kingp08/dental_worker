import React, { useEffect, useRef, useMemo, useState, FormEvent, ChangeEvent } from "react";
import { ICON_MAPPER, COLOR_MAPPER, MSG_SERVER_ERROR } from "@/utils/constants";
import { Icon } from "@/libraries/iconify-react";
import Button from "@/components/custom/buttons/Button";
import {
  Avatar,
  DialogBody,
  Typography,
} from "@/libraries/material-tailwind";
import { useUser } from "@/contexts/UserContext";
import api from "@/utils/api";
import { toast } from "@/libraries/react-toastify";
import Input from "@/components/custom/Input";
import yup from "@/libraries/yup";
import { useFormik } from "@/libraries/formik";
import {
  VALIDATION_INVALID_EMAIL,
  VALIDATION_REQUIRED_FIELD,
} from "@/utils/constants";


function EditProfile() {

// Get userData
const { userData } = useUser();

// Start of useState
  
    const [EditProfileDialog, setEditProfieDialog] = useState<boolean>(false)
    const profileInputFile = useRef<HTMLInputElement | null>(null);
    const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
    const [profilePhotoSrc, setProfilePhotoSrc] = useState<string>(
      userData?.avatar ? userData.avatar : ""
    );



// Start of functions

const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  formik.handleSubmit(e);
};

const openProfilePhotoWindow = () => {
  profileInputFile.current?.click();
};

const selectProfilePhoto = (e: ChangeEvent<HTMLInputElement>) => {
  if (e.target.files && e.target.files[0]) {
    setProfilePhoto(e.target.files[0]);
    setProfilePhotoSrc(URL.createObjectURL(e.target.files[0]));
  }
};


// Formik implementation for edit profile dialog

const validationSchema = yup.object().shape({
  firstname: yup
    .string()
    .required(VALIDATION_REQUIRED_FIELD),
});

const formik = useFormik({
  initialValues: {
    firstName: userData?.firstName,
    lastName: userData?.lastName,
    address: "",
    city: "",
    zipCode: userData?.zipCode,
    phone: userData?.phone,
    jobMode: userData?.jobRole,
    avatar: userData?.avatar,
  },
  onSubmit: (values) => {
    console.log(values)
    console.log(profilePhoto)

    // POST METHOD FOR SUBMIT EDIT PROFILE
    //setLoading(true);
    /* 
      values.avatar = profilePhoto;

      const config = {
    headers: {
      "content-type": "multipart/form-data",
    }

     api
    .post("http://172.105.152.69/webapi/user/update/professional/profile/info", values, config)
    .then((res) => {
      setUserData((prev) =>
        prev
          ? {
              ...prev,
              firstName: res.data.firstName,
              lastName: res.data.lastName,
              address: res.data.address,
              city: res.data.city,
              zipCode: res.data.zipCode,
              phone: res.data.phone,
              jobMode: res.data.jobMode,
              avatar: res.data.profilePhoto,
            }
          : prev
      );
      setLoading(false);
      toast.success("Uploaded.");
      .catch((err) => {
      setLoading(false);
      toast.error(getErrorMessage(err));
    });

  };
    
    */
  }
});


    return (
        <DialogBody
          placeholder=""
          className="py-4 px-4 xl:py-15 xl:px-20 flex flex-col gap-8"
        >
          <div className="block sm:flex justify-between items-center">
            <div className="flex justify-between items-center">
              <Typography
                placeholder=""
                variant="h2"
                className="text-3xl font-bold text-dark"
              >
                Edit Profile
              </Typography>
              <Icon
                icon={ICON_MAPPER.copy}
                className="block sm:hidden text-secondary text-lg font-bold"
              />
            </div>
          </div>
          
          <div>
          <div>
            <form className="m-2 md:flex-row flex justify-between" onSubmit={(e)=>handleSubmit(e)}>
            <div className="flex flex-col gap-2 justify-evenly h-full w-1/2">
            {/*Text inputs */}
            <Input
            type="firstName"
            id="firstName"
            label="First Name"
            placeholder={userData?.firstName}
            onChange={formik.handleChange}
            value={formik.values.firstName}
            error={formik.touched.firstName && formik.errors.firstName}
          />
          <Input
            type="lastName"
            id="lastName"
            label="Last Name"
            placeholder={userData?.lastName}
            onChange={formik.handleChange}
            value={formik.values.lastName}
            error={formik.touched.lastName && formik.errors.lastName}
          />
          <Input
            type="address"
            id="address"
            label="Address"
            placeholder={"Street number and name"}
            onChange={formik.handleChange}
            value={formik.values.address}
            error={formik.touched.address && formik.errors.address}
          />

          <div className="flex flex-row gap-2 justify-between"> 
          <Input
            type="city"
            id="city"
            label=""
            placeholder={"Enter City"}
            onChange={formik.handleChange}
            value={formik.values.city}
            error={formik.touched.city && formik.errors.city}
          />
          <Input
            type="ziCcode"
            id="zipCode"
            label=""
            placeholder={userData?.zipCode}
            onChange={formik.handleChange}
            value={formik.values.zipCode}
            error={formik.touched.zipCode && formik.errors.zipCode}
          />
          </div>

          <Input
            type="phone"
            id="phone"
            label="Phone Number"
            placeholder={userData?.phone}
            onChange={formik.handleChange}
            value={formik.values.phone}
            error={formik.touched.phone && formik.errors.phone}
          />
          

            </div>
            <div className="flex h-1/4 flex-row justify-between gap-2">
            {/*Image input */}
            <div className="flex flex-col w-1/2 ">

            <div className="flex flex-row flex-nowrap gap-0">
            
            <Typography
            placeholder=""
            variant="h2"
            className="font-bold text-dark text-md py-2 flex flex-row flex-nowrap gap-1"
            >
            Profile Photo 
            <Typography 
            placeholder=""
            variant="h2"
            className="text-secondary text-md cursor-pointer">  
            <label htmlFor="avatar">
            <Icon icon={ICON_MAPPER.edit} className="cursor-pointer"></Icon>
            <input
              type="file"
              id="avatar"
              accept="image/*"
              hidden
              ref={profileInputFile}
              onChange={selectProfilePhoto}
            />
            </label>
    
            </Typography>
            </Typography>
            </div>
            <Typography
            placeholder=""
            variant="h2"
            className="text-dark font-extralight text-sm py-2"
            >
            (Head Shot)
            </Typography>
            </div>
          
          
          {/*userData?.avatar ? (
                <Avatar
                  variant="circular"
                  placeholder=""
                  src={userData.avatar}
                  alt=""
                  className="w-[200px] h-[200px]"
                />
              ) : (
                <EmptyAvatar className="w-[200px] h-[200px]" />
              )*/}

          <div
          className="rounded-lg"
          onClick={openProfilePhotoWindow}
        >
          {!!profilePhotoSrc ? (
            <Avatar
              variant="square"
              placeholder=""
              src={profilePhotoSrc}
              alt=""
              width={100}
              height={100}
              className="w-[200px] h-[200px]"
            />
          ) : (
            <>
              <Avatar
                variant="square"
                placeholder=""
                src={profilePhotoSrc}
                alt=""
                width={100}
                height={100}
                className="w-[200px] h-[200px]"
              />
            </>
          )}
          
          </div>

            
          <div className="md:absolute md:ml-[160px] md:mt-[400px]">
          <Button 
          variant="filled"
          color="secondary"
          type="submit"
            className="py-2 px-4 md:w-[150px]">
            Update Profile
          </Button>
          </div>

            </div>
            </form>
          </div>
          </div>

        </DialogBody>
    )
}

export default EditProfile