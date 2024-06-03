"use client";

import React, { useEffect, useState } from "react";
import { IComponent, IJob } from "@/utils/interfaces";
import CardTemplate from "../custom/CardTemplate";
import TabButton from "../custom/buttons/TabButton";
import JobTabItem from "./JobTabItem";
import { ButtonGroup, Button, Typography } from "@/libraries/material-tailwind";
import { Icon } from "@/libraries/iconify-react";
import api from "@/utils/api";
import { useUser } from "@/contexts/UserContext";
import { getErrorMessage } from "@/utils/functions";
import { toast } from "@/libraries/react-toastify";
import Loading from "../custom/Loading";


export default function JobPostingPage({ className = "" }: IComponent) {
  const [activeTab, setActiveTab] = useState<string>("Temporary");
  const [data, setData] = useState<IJob[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const {userData} = useUser();

  const getData = async(activeTab : string) => {
    if(activeTab === "Temporary"){
    api
      .post("/jobs/professional/listing/1",{
        jobTypeId : "temporary"
      })
      .then((res) => {
        setLoading(false);
        setData(res.data.jobs);
      })
      .catch((err) => {
        toast.error(getErrorMessage(err));
      });
    } else if (activeTab === "Permanent"){
      api
        .post("/jobs/professional/listing/1", {
          jobTypeId : "fulltime"
        })
        .then((res) => {
          setLoading(false);
          setData(res.data.jobs);
        })
      .catch((err) => {
        toast.error(getErrorMessage(err));
      });
    } else if (activeTab === "Applied"){
      api
      .post("/jobs/professional/listing/1",{
        jobTypeId : "applied"
      })
      .then((res) => {
        setLoading(false);
        setData(res.data.jobs);
      })
      .catch((err) => {
        toast.error(getErrorMessage(err));
      });
    }
  };

  useEffect(() => {
    if(!userData || userData?.userType == 1) return ;
    getData(activeTab);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);


  return (
    <CardTemplate title="" className={`${className} w-full bg-[#FFF]`}>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <TabButton
              className="font-semibold"
              isActive={activeTab === "Temporary"}
              onClick={() => setActiveTab("Temporary")}
            >
              Temporary
            </TabButton>
            <TabButton
              className="font-semibold"
              isActive={activeTab === "Permanent"}
              onClick={() => setActiveTab("Permanent")}
            >
              Permanent
            </TabButton>
            <TabButton
              className="font-semibold"
              isActive={activeTab === "Applied"}
              onClick={() => setActiveTab("Applied")}
            >
              Applied
            </TabButton>
          </div>

          <div className="block md:hidden">
            <Icon
              icon="dashicons:admin-settings"
              className="text-3xl text-secondary"
            />
          </div>

          <div className="hidden md:block">
            {activeTab === "Temporary" || activeTab === "Permanent" ? (
              <ButtonGroup
                placeholder=""
                className="rounded-md border border-gray-300 bg-white"
              >
                <Button
                  placeholder=""
                  className="bg-white text-lightDark text-sm font-light normal-case py-0"
                >
                  Zip Code
                </Button>
                <Button
                  placeholder=""
                  className="bg-white text-lightDark text-sm font-light normal-case py-0"
                >
                  Miles Radius
                </Button>
                <Button
                  placeholder=""
                  className="bg-white text-lightDark text-sm font-light normal-case py-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1">
                      Sort by
                      <Icon
                        icon="solar:alt-arrow-down-line-duotone"
                        className="text-xl font-bold text-secondary"
                      />
                    </div>
                    <Icon
                      icon="fluent:search-square-24-filled"
                      className="text-3xl text-secondary"
                    />
                  </div>
                </Button>
              </ButtonGroup>
            ) : (
              <ButtonGroup
                placeholder=""
                className="rounded-md border border-gray-300 bg-white h-[30px]"
              >
                <Button
                  placeholder=""
                  className="bg-white text-lightDark text-sm font-light normal-case py-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1">
                      Permanent
                      <Icon
                        icon="solar:alt-arrow-down-line-duotone"
                        className="text-xl font-bold text-secondary"
                      />
                    </div>
                  </div>
                </Button>
                <Button
                  placeholder=""
                  className="bg-white text-lightDark text-sm font-light normal-case py-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1">
                      Sort by
                      <Icon
                        icon="solar:alt-arrow-down-line-duotone"
                        className="text-xl font-bold text-secondary"
                      />
                    </div>
                  </div>
                </Button>
              </ButtonGroup>
            )}
          </div>
        </div>

        {activeTab === "Temporary" ? (
          <Typography
            placeholder=""
            className="text-dark text-base col-span-1 gap-1"
          >
            <span className="font-bold">{data?.length}</span> jobs meet
            your Search
          </Typography>
        ) : activeTab === "Permanent" ? (
          <Typography
            placeholder=""
            className="text-dark text-base col-span-1 gap-1"
          >
            <span className="font-bold">{data?.length}</span> jobs meet
            your Search
          </Typography>
        ) : activeTab === "Applied" ? (
          <Typography
            placeholder=""
            className="text-dark text-base col-span-1 gap-1"
          >
            <span className="font-bold">{data?.length}</span> jobs you
            have applied
          </Typography>
        ) : (
          <Typography
            placeholder=""
            className="text-dark text-base col-span-1 gap-1"
          >
            Default Title
          </Typography>
        )}

        <div className="block lg:grid lg:grid-cols-2 lg:gap-4">
          {loading ? <Loading /> : data?.map((job: IJob) => (
            <JobTabItem key={job.id} job={job} activeTab={activeTab} />
          ))}
        </div>
      </div>
    </CardTemplate>
  );
}
