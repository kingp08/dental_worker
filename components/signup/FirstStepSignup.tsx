import { ChangeEvent, useRef } from "react";
import { toast } from "react-toastify";
import { IconButton, Typography } from "@/libraries/material-tailwind";
import { Icon } from "@/libraries/iconify-react";
import { ICON_MAPPER } from "@/utils/constants";
import Image from "next/image";
import Button from "../custom/buttons/Button";

interface IProps {
  setAvatar: (
    value: (File | null) | ((prev: File | null) => File | null)
  ) => void;
  avatarSrc: string;
  setAvatarSrc: (value: string | ((prev: string) => string)) => void;
  goToNextStep: () => void;
}

export default function FirstStepSignup({
  setAvatar,
  avatarSrc,
  setAvatarSrc,
  goToNextStep,
}: IProps) {
  const inputFile = useRef<HTMLInputElement | null>(null);

  const openFileWindow = () => {
    inputFile.current?.click();
  };

  const selectImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const imageUrl = URL.createObjectURL(selectedFile);

      const imageElement = document.createElement("img");
      imageElement.onload = () => {
        if (imageElement.width === imageElement.height) {
          setAvatar(selectedFile);
          setAvatarSrc(imageUrl);
        } else {
          toast.error("Please select a square image");
        }
      };
      imageElement.src = imageUrl;
    }
  };

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    goToNextStep();
  };

  return (
    <form
      className="flex flex-col items-center gap-16 py-4 px-8"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-6 items-center">
        <Typography
          placeholder=""
          className="text-dark text-sm font-bold text-center"
        >
          Add Profile Photo
        </Typography>
        <div className="flex justify-center items-center w-[148px] h-[148px] bg-[#F6F4F9] rounded-full border-2 border-[#D9D2E4] relative">
          {!!avatarSrc ? (
            <Image
              src={avatarSrc}
              alt="avatar"
              layout="fill"
              className="rounded-full"
            />
          ) : (
            <Icon
              icon={ICON_MAPPER.profile}
              className="w-[148px] h-[148px] object-cover object-center text-[#B6AACA]"
            />
          )}

          <div className="absolute right-0 bottom-3">
            <IconButton
              placeholder=""
              className="w-9 h-9 rounded-full bg-secondary text-xl"
              onClick={openFileWindow}
            >
              <Icon icon={!!avatarSrc ? ICON_MAPPER.edit : ICON_MAPPER.plus} />
            </IconButton>
            <input
              type="file"
              accept="image/*"
              hidden
              ref={inputFile}
              onChange={selectImage}
            />
          </div>
        </div>
        <Typography
          placeholder=""
          className="text-lightDark text-xs font-normal text-center"
        >
          First of all, take a minute to upload your profile photo.
        </Typography>
      </div>

      <Button variant="filled" color="secondary" className="w-48" type="submit">
        Next
      </Button>
    </form>
  );
}
