"use client";

import React, { useEffect, useState } from "react";
import Button from "@/components/custom/buttons/Button";
import { Avatar, Typography } from "@/libraries/material-tailwind";
import { Icon } from "@/libraries/iconify-react";
import { ICON_MAPPER } from "@/utils/constants";
import { IComponent, IJob } from "@/utils/interfaces";
import { formatNumber } from "@/utils/functions";
import JobDescriptionDialog from "./JobDescriptionDialog";
import JobApplyDialog from "./JobApplyDialog";
import moment from "moment";
import Loading from "@/components/custom/Loading";

interface IProps extends IComponent {
  job: IJob;
  activeTab: string;
}

export default function JPCardTemplate({
  className = "",
  job,
  activeTab,
}: IProps) {
  const [viewJob, setViewJob] = useState<boolean>(false);
  const [applyJob, setApplyJob] = useState<boolean>(false);

  const handleViewJob = () => {
    setViewJob(true);
  };
  const handleApplyJob = () => {
    setApplyJob(true);
  };

  return (
      job ? 
      <div
        className={`col-span-12 lg:col-span-6 xl:col-span-1 bg-lightDark bg-opacity-10 px-4 py-5 rounded-xl flex flex-col gap-4 justify-between ${className}`}
      >
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <Typography
              placeholder=""
              variant="h3"
              className="text-dark text-xl font-bold"
            >
              {job.title}
            </Typography>
            {/* <Typography
              placeholder=""
              className="text-dark text-base font-semibold"
            >
              {job.poster.organization}
            </Typography> */}
          </div>

          {/* <Avatar
            variant="rounded"
            src={job.poster.logo}
            alt=""
            width={64}
            height={64}
            placeholder=""
          /> */}
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1">
            <Icon icon={ICON_MAPPER.star} className="text-lg text-primary" />
            {/* <Typography
              placeholder=""
              className="text-lightDark font-semibold text-sm"
            >
              {job.poster.rate} ({job.poster.numberOfReviews} Reviews)
            </Typography> */}
          </div>
          <div className="flex items-center gap-2">
            <Icon
              icon={ICON_MAPPER.userStars}
              className="text-lightDark text-xl"
            />
            <Typography
              placeholder=""
              className="text-lightDark text-sm font-semibold"
            >
              {job.experience}
            </Typography>
          </div>

          <div className="flex items-center gap-2">
            <Icon
              icon={ICON_MAPPER.userDollar}
              className="text-lightDark text-xl"
            />
            <Typography
              className="text-lightDark text-sm font-semibold"
              placeholder=""
            >
              {job.salary === null
                ? "None"
                : `$${job.salary?.min
                  }-$${job.salary?.max} ${
                    job.salary?.mode
                  }`}
            </Typography>
          </div>

          <div className="flex items-center gap-2">
            <Icon
              icon={ICON_MAPPER.location}
              className="text-lightDark text-xl"
            />
            <Typography
              className="text-lightDark text-sm font-semibold"
              placeholder=""
            >
              {job.location || "None"}
            </Typography>
          </div>

          {/* <div className="flex items-center gap-2">
            <Icon
              icon={ICON_MAPPER.checkList}
              className="text-lightDark text-xl"
            />
            <Typography
              className="text-lightDark text-sm font-semibold"
              placeholder=""
            >
              {job.requirement.skillMatchRate.matchedCount} of{" "}
              {job.requirement.skillMatchRate.total} skills matched
            </Typography>
          </div> */}

          <div className="flex items-center gap-2">
            <Icon
              icon={ICON_MAPPER.calendar}
              className="text-lightDark text-xl"
            />
            <Typography
              className="text-lightDark text-sm font-semibold"
              placeholder=""
            >
              {moment(job.postedAt).format("MM/DD/YYYY hh:mm a")}
            </Typography>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outlined"
            color="lightDark"
            className="text-center text-sm px-3 py-2"
            onClick={handleViewJob}
          >
            View
          </Button>
          <Button
            variant="filled"
            color="secondary"
            className="text-center text-sm px-3 py-2"
            onClick={handleApplyJob}
          >
            Apply
          </Button>
        </div>
        <JobDescriptionDialog
          viewJob={viewJob}
          setViewJob={setViewJob}
          job={job}
          activeTab={activeTab}
          size="md"
        />
        <JobApplyDialog applyJob={applyJob} setApplyJob={setApplyJob} job={job} size="sm" />
      </div>
    : <div> No Job Posting found here</div> 
  );
}
