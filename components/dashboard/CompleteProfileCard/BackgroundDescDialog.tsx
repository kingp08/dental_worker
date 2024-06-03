"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import Button from "@/components/custom/buttons/Button";
import { IComponent } from "@/utils/interfaces";
import { Icon } from "@/libraries/iconify-react";
import { ICON_MAPPER } from "@/utils/constants";
import {
  Dialog,
  DialogBody,
  IconButton,
  Typography,
  Textarea,
} from "@/libraries/material-tailwind";
import type { DialogProps } from "@/libraries/material-tailwind";
import api from "@/utils/api";
import Loading from "@/components/custom/Loading";
import { toast } from "react-toastify";
import { useUser } from "@/contexts/UserContext";

interface IProps extends IComponent {
  backgroundDesc: boolean;
  setBackgroundDesc: Function;
  size: DialogProps["size"];
}

export default function BackgroundDescDialog({
  backgroundDesc,
  setBackgroundDesc,
  size = "md",
}: IProps) {
  const handler = () => {
    setBackgroundDesc(!backgroundDesc);
  };

  const [loading, setLoading] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("");
  const { userData, setUserData } = useUser();
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  useEffect(() => {
    setLoading(true);
    api
      .get("/user/get/profile/description")
      .then((res) => {
        setLoading(false);
        setDescription(res.data.description);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, []);

  const handleSave = () => {
    setLoading(true);
    api
      .post("/user/save/profile/description", { description: description })
      .then((res) => {
        setLoading(false);
        toast.success("Saved successfully.");
        let tempUserData = userData;
        Object(tempUserData?.verifyData).backgroundDescAdded = true;
        setUserData(tempUserData);
        setBackgroundDesc(!backgroundDesc);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <Dialog
      placeholder=""
      handler={handler}
      open={backgroundDesc}
      size={size}
      className="h-[80%] overflow-y-auto"
    >
      {loading ? (
        <Loading />
      ) : (
        <DialogBody placeholder="">
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
          <div className="p-2 sm:px-10 xl:px-20">
            <div className="flex justify-between items-center">
              <Typography
                placeholder=""
                className="text-xl ss:2xl md:text-3xl lg:text-4xl text-dark font-bold"
              >
                Background Description
              </Typography>
              <Icon
                icon={ICON_MAPPER.close}
                className="flex text-dark font-bold text-xl ss:hidden cursor-pointer"
                onClick={handler}
              />
            </div>
            <div className="flex flex-col gap-3 pt-4">
              <Typography
                placeholder=""
                className="text-xs md:text-sm font-normal text-lightDark"
              >
                Share what makes you great! Include your years of experience,
                why you love what you do, your skills and the practice
                management systems you use, and everything else that makes you
                great at your job. The more descriptive, the better - this is
                what offices see.
              </Typography>
              <Textarea
                rows={3}
                resize={false}
                placeholder="Write your answer..."
                className="min-h-full !border-0 focus:border-transparent rounded-lg !bg-[#FCFAFF]"
                containerProps={{
                  className: "grid h-full",
                }}
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                value={description}
                onChange={handleChange}
              />
              <div className="rounded-lg mt-3">
                <div className="flex justify-end">
                  <Button
                    variant="filled"
                    color="secondary"
                    className="py-1 px-3 text-sm"
                    onClick={handleSave}
                  >
                    Save
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 pt-6">
              <Typography
                placeholder=""
                className="text-base font-bold text-dark"
              >
                Some examples to enspire you
              </Typography>
              <div>
                <Typography
                  placeholder=""
                  className="text-base font-normal text-dark"
                >
                  Example 1:
                </Typography>
                <Typography
                  placeholder=""
                  className="text-base text-lightDark pt-1"
                >
                  I am an energetic Dental Hygienist who is enthusiastic about
                  dental health. I enjoy educating patients on dental care and
                  hygiene. I earned my license in 2019 and have worked in both a
                  general practice and a pediatric practice. I enjoy working
                  with kids and enjoy a fast-paced office environment. I have
                  used Carestream and Easy Dental software.
                </Typography>
              </div>
              <div>
                <Typography
                  placeholder=""
                  className="text-base font-normal text-dark"
                >
                  Example 2:
                </Typography>
                <Typography
                  placeholder=""
                  className="text-base text-lightDark pt-1"
                >
                  I’ve been a hygienist since 2005. I love being a hygienist and
                  believe educating on preventative care is rewarding. I am
                  skilled in detecting and managing periodontal disease, scaling
                  and root planing, and soft tissue management. Counseling and
                  motivating patients to achieve optimal oral health is one of
                  my passions.
                </Typography>
              </div>
            </div>
          </div>
        </DialogBody>
      )}
    </Dialog>
  );
}
