"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { IComponent, IJob } from "@/utils/interfaces";
import { PATH_MAPPER } from "@/utils/constants";
import CardTemplate from "@/components/custom/CardTemplate";
import TabButton from "@/components/custom/buttons/TabButton";
import JPCardTemplate from "@/components/dashboard/JobPostingCard/JPCardTemplate";
import api from "@/utils/api";
import { toast } from "@/libraries/react-toastify";
import { getErrorMessage } from "@/utils/functions";
import Loading from "@/components/custom/Loading";


export default function JobPostingCard({ className = "" }: IComponent) {
  const [activeTab, setActiveTab] = useState<string>("Temporary");
  const [jobs, setJobs] = useState<IJob[] | undefined>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {

    const getData = async(activeTab : string) => {
      if(activeTab === "Temporary"){
      api
        .post("/jobs/professional/listing/1",{
          jobTypeId : "temporary"
        })
        .then((res) => {
          setJobs(res.data.jobs);
          setLoading(false);
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
            setJobs(res.data.jobs);
            setLoading(false);
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
          setJobs(res.data.jobs);
          setLoading(false);
        })
        .catch((err) => {
          toast.error(getErrorMessage(err));
        });
      }
    }
    getData(activeTab);
  },[activeTab]);


  return (
    <CardTemplate
      title="Job Posting"
      className={className}
      actions={
        <Link
          href={PATH_MAPPER.jobPosting}
          className="underline text-lightDark"
        >
          See All
        </Link>
      }
    >
      <div className="flex flex-col gap-4">
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

        <div className="grid grid-cols-12 xl:grid-cols-5 gap-4">
          {loading ? <Loading /> : jobs?.length === 0 ? "No jobs to display" : 
          jobs?.map((job) => (
            <JPCardTemplate key={job.id} job={job} activeTab={activeTab} />
          ))}
        </div>
      </div>
    </CardTemplate>
  );
}
