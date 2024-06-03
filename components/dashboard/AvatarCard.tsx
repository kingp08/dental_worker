"use client";

import React, { useState, useEffect } from "react";
import { IComponent } from "@/utils/interfaces";
import { COLOR_MAPPER, ICON_MAPPER } from "@/utils/constants";
import { Avatar, Typography } from "@/libraries/material-tailwind";
import { CircularProgressbarWithChildren } from "@/libraries/react-circular-progressbar";
import { Icon } from "@/libraries/iconify-react";
import CardTemplate from "@/components/custom/CardTemplate";
import { useUser } from "@/contexts/UserContext";
import EmptyAvatar from "../custom/EmptyAvatar";
import api from "@/utils/api";
import { error } from "console";
import { toast } from "react-toastify";

export default function AvatarCard({ className = "" }: IComponent) {
  const { userData } = useUser();

  const [selectPermanentJob, setSelectPermanentJob] = useState<boolean>(false);
  const [selectTempJob, setSelectTempJob] = useState<boolean>(false);

  const handleSetJobType = (type: string): void => {
    let jobTypes: string[] = [];

    if (type == "fulltime") {
      !selectPermanentJob && jobTypes.push("permanent");
      selectTempJob && jobTypes.push("temporary");
    } else {
      selectPermanentJob && jobTypes.push("permanent");
      !selectTempJob && jobTypes.push("temporary");
    }

    api
      .post("/professional/dashboard/jobtype", {
        jobType: jobTypes,
      })
      .then((res) => {
        const { success } = res.data;
        if (success) {
          toast.success("Succeed in setting a jobType");
        }
      })
      .catch((err) => {
        toast.error("Failed in setting a jobType.");
      });
  };

  const handlePermanentJobClick = () => {
    setSelectPermanentJob(!selectPermanentJob);
    handleSetJobType("fulltime");
  };

  const handleTempJobClick = () => {
    setSelectTempJob(!selectTempJob);
    handleSetJobType("temporary");
  };

  useEffect(() => {
    api
      .get("/professional/dashboard/jobtype")
      .then((res) => {
        let jobTypes: string[] = res.data.jobType;
        jobTypes?.forEach((type) => {
          type == "permanent" && setSelectPermanentJob(true);
          type == "temporary" && setSelectTempJob(true);
        });
      })
      .catch((error) => {
        toast.error("Failed in getting a jobType.");
      });
  }, []);

  return (
    <CardTemplate className={className} title={`Hi, ${userData?.name || ""}`}>
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-24 h-24">
            <CircularProgressbarWithChildren
              value={40}
              strokeWidth={6}
              styles={{
                path: {
                  stroke: COLOR_MAPPER.warning,
                },
                trail: {
                  stroke: "#F6F4F9",
                },
              }}
            >
              {userData?.avatar ? (
                <Avatar
                  variant="circular"
                  placeholder=""
                  src={userData.avatar}
                  alt=""
                  className="w-20 h-20"
                />
              ) : (
                <EmptyAvatar className="w-20 h-20" />
              )}
            </CircularProgressbarWithChildren>
          </div>

          <div className="bg-[#FFFCF6] px-2 rounded-lg">
            <Typography placeholder="" className="text-warning font-bold">
              40% Completed
            </Typography>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 mt-4">
          <Typography
            placeholder=""
            className="font-bold text-lg text-dark text-center"
          >
            Welcome to Dental Jobs!
          </Typography>
          <Typography
            placeholder=""
            className="text-sm text-center text-[#7A6899]"
          >
            Habitasse leo mi enim condimentum rhoncus. Sed non tortor gravida
            pulvinar tempus purus. Feugiat quam aliquam.
          </Typography>
        </div>

        <div className="flex flex-col items-center gap-4 mt-4">
          <Typography placeholder="" className="font-bold text-2xl text-dark">
            Availablility
          </Typography>

          <div className="flex flex-col items-center gap-2">
            <div
              className="flex items-center gap-6 px-3 py-2 border-2 border-[#D9D2E4] rounded-xl cursor-pointer"
              onClick={handlePermanentJobClick}
            >
              <div className="flex items-center gap-2">
                <Icon
                  icon={ICON_MAPPER.bag}
                  className="text-primary text-2xl"
                />
                <Typography
                  placeholder=""
                  className="text-dark text-lg font-semibold"
                >
                  Permanent Job
                </Typography>
              </div>
              <Icon
                icon={
                  selectPermanentJob
                    ? ICON_MAPPER.circleFilledCheck
                    : ICON_MAPPER.circleCheck
                }
                className={`text-3xl ${
                  selectPermanentJob ? "text-secondary" : "text-[#D9D2E4]"
                }`}
              />
            </div>

            <div
              className="flex items-center gap-6 px-3 py-2 border-2 border-[#D9D2E4] rounded-xl  cursor-pointer"
              onClick={handleTempJobClick}
            >
              <div className="flex items-center gap-2">
                <Icon
                  icon={ICON_MAPPER.bag}
                  className="text-primary text-2xl"
                />
                <Typography
                  placeholder=""
                  className="text-dark text-lg font-semibold"
                >
                  Temporary Job
                </Typography>
              </div>
              <Icon
                icon={
                  selectTempJob
                    ? ICON_MAPPER.circleFilledCheck
                    : ICON_MAPPER.circleCheck
                }
                className={`text-3xl ${
                  selectTempJob ? "text-secondary" : "text-[#D9D2E4]"
                }`}
              />
            </div>
          </div>
        </div>
      </div>
    </CardTemplate>
  );
}
