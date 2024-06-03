"use client";

import React, { useState } from "react";
import Button from "@/components/custom/buttons/Button";
import { IComponent, IJob } from "@/utils/interfaces";
import { Avatar, Typography } from "@/libraries/material-tailwind";
import { Icon } from "@/libraries/iconify-react";
import { ellipsisString } from "@/utils/functions";
import JobApplyDialog from "../dashboard/JobPostingCard/JobApplyDialog";
import moment from "moment";

interface IProps extends IComponent {
  job: IJob;
  activeTab: string;
}

export default function JobTabItem({ className = "", job, activeTab }: IProps) {
  const [applyJob, setApplyJob] = useState<boolean>(false);
  const handleApplyJob = () => {
    setApplyJob(true);
  };

  const renderStars = (rate: any) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rate) {
        stars.push(
          <Icon
            key={i}
            icon="material-symbols:star"
            className="text-xl text-primary"
          />
        );
      } else if (i - 0.5 === rate) {
        stars.push(
          <Icon
            key={i}
            icon="material-symbols:star-half"
            className="text-xl text-primary"
          />
        );
      } else {
        stars.push(
          <Icon
            key={i}
            icon="material-symbols:star-outline"
            className="text-xl text-[#F6F4F9]"
          />
        );
      }
    }
    return stars;
  };

  return (
    <div
      className={`bg-[#FCFCFD] px-4 py-5 rounded-xl gap-4 justify-between ${className}`}
    >
      <div className="flex justify-between gap-2">
        <div className="flex gap-4 items-cebter">
          {job?.posterData?.avatar && (
            <Avatar
              variant="rounded"
              src={job?.posterData?.avatar}
              alt=""
              className="w-[94px] h-[94px]"
              placeholder=""
            />
          )}
          <div className="flex flex-col">
            <div className="block md:hidden">
              <Typography
                placeholder=""
                variant="h3"
                className="text-dark text-xl font-bold"
              >
                {ellipsisString(`${job.title}`, 30)}
              </Typography>
            </div>
            <div className="hidden md:block">
              <Typography
                placeholder=""
                variant="h3"
                className="text-dark text-xl font-bold"
              >
                {`${job.title}`}
              </Typography>
            </div>
            <Typography placeholder="" className="text-lg text-primary">
              {job?.posterData?.name}
            </Typography>
            <div className="flex items-center">
              {job?.posterData && renderStars(parseFloat(job?.posterData.rate))}
            </div>
          </div>
        </div>
        <div className="hidden lg:flex lg:flex-col justify-center">
          {activeTab === "Applied" ? (
            <div className="flex justify-center items-center gap-x-2">
              {job?.applyStatus === "Application Rejected" ? (
                <Icon
                  icon="gridicons:cross-circle"
                  className="text-xl text-error"
                />
              ) : (
                <Icon
                  icon="teenyicons:tick-circle-solid"
                  className="text-xl text-[#00D391]"
                />
              )}

              <Typography
                placeholder=""
                className="text-sm  font-bold text-dark"
              >
                {job?.applyStatus}
              </Typography>
            </div>
          ) : (
            // : !job.isReadable ? (
            //   <div className="">
            //     <Typography
            //       placeholder=""
            //       className="text-sm text-end text-error max-w-[180px]"
            //     >
            //       Cannot apply due to no confirmed license in TX
            //     </Typography>
            //   </div>
            // )
            <div className="flex justify-end">
              <Button
                variant="filled"
                color="secondary"
                className="flex justify-center items-center max-w-[107px] h-9"
                onClick={handleApplyJob}
              >
                Apply
              </Button>
            </div>
          )}
          {activeTab === "Temporary" || activeTab === "Permanent" ? (
            <Typography
              placeholder=""
              className="text-sm text-lightDark pt-2 text-end"
            >
              {job.numOfAppliers} professionals have applied
            </Typography>
          ) : (
            <></>
          )}
        </div>
      </div>
      {activeTab === "Temporary" ? (
        <div>
          <div>
            <Typography placeholder="" className="text-sm text-lightDark pt-6">
              Date & Time
            </Typography>
            <Typography
              placeholder=""
              className="text-sm text-dark font-semibold pt-3 pl-2"
            >
              {moment(job.postedAt).format("MM/DD/YYYY hh:mm a")}
            </Typography>
          </div>
          <div className="grid grid-cols-4 gap-4 pt-7">
            <div className="col-span-2 lg:col-span-1">
              <Typography placeholder="" className="text-sm text-lightDark">
                Break :
              </Typography>
              <Typography
                placeholder=""
                className="text-sm text-dark font-semibold pt-1"
              >
                {job.breakDuration}
              </Typography>
            </div>
            <div className="col-span-2 lg:col-span-1">
              <Typography placeholder="" className="text-sm text-lightDark">
                Salary({job?.salary?.mode} Based):
              </Typography>
              <Typography
                placeholder=""
                className="text-sm text-dark font-semibold pt-1"
              >
                ${job?.salary?.min} - ${job?.salary?.max}
              </Typography>
            </div>
            <div className="col-span-2 lg:col-span-1">
              <Typography placeholder="" className="text-sm text-lightDark">
                Payment Terms:
              </Typography>
              <Typography
                placeholder=""
                className="text-sm text-dark font-semibold pt-1"
              >
                {job.paymentTerms}
              </Typography>
            </div>
            <div className="col-span-2 lg:col-span-1">
              <Typography placeholder="" className="text-sm text-lightDark">
                Payment Method:
              </Typography>
              <Typography
                placeholder=""
                className="text-sm text-dark font-semibold pt-1"
              >
                {job.paymentMethod}
              </Typography>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div>
            <Typography placeholder="" className="text-sm text-lightDark pt-6">
              Practice Types
            </Typography>
            <div className="flex flex-wrap items-center gap-x-3">
              {job.practiceTypes &&
                job.practiceTypes.map((item, index) => (
                  <Typography
                    placeholder=""
                    key={index}
                    className="text-sm text-dark font-semibold pt-3 pl-2"
                  >
                    {item?.name}
                  </Typography>
                ))}
            </div>
          </div>

          <div>
            <Typography placeholder="" className="text-sm text-lightDark pt-6">
              Description
            </Typography>
            <div className="block lg:hidden break-words">
              <Typography
                placeholder=""
                className="text-sm text-dark font-semibold pt-3"
              >
                {job.description ?? ""}
              </Typography>
            </div>
            <div className="hidden lg:block break-words">
              <Typography
                placeholder=""
                className="text-sm text-dark font-semibold pt-3"
              >
                {job.description ? ellipsisString(job.description, 200) : ""}
                <button className="text-sm text-secondary">Read more</button>
              </Typography>
            </div>
          </div>

          <div>
            <Typography placeholder="" className="text-sm text-lightDark pt-6">
              Pre Provided
            </Typography>
            <div className="flex flex-wrap items-center gap-x-3">
              {job.preProvided &&
                job.preProvided.map((item, index) => (
                  <Typography
                    placeholder=""
                    key={index}
                    className="text-sm text-dark font-semibold pt-3 pl-2"
                  >
                    {item}
                  </Typography>
                ))}
            </div>
          </div>
        </div>
      )}
      <Typography placeholder="" className="text-sm text-lightDark pt-6">
        Pro Types
      </Typography>
      <div className="flex flex-wrap items-center gap-x-3">
        {job.proType && (
          <Typography
            placeholder=""
            className="text-sm text-dark font-semibold pt-3 pl-2"
          >
            {job.proType}
          </Typography>
        )}
      </div>

      <div className="grid grid-cols-4 gap-4 pt-7">
        <div className="col-span-4 lg:col-span-1">
          <div className="flex gap-2">
            <Icon
              icon="mingcute:user-star-fill"
              className="text-secondary lg:text-primary text-xl"
            />
            <Typography
              placeholder=""
              className="text-dark text-sm font-semibold"
            >
              {job?.experience || "None"}
            </Typography>
          </div>
        </div>

        <div className="col-span-4 lg:col-span-1">
          <div className="flex gap-2">
            <Icon
              icon="mdi:location"
              className="text-secondary lg:text-primary text-xl"
            />
            <Typography
              className="text-dark text-sm font-semibold"
              placeholder=""
            >
              {job?.location || "None"}
            </Typography>
          </div>
        </div>

        {activeTab === "Temporary" ? (
          <div className="col-span-4 lg:col-span-1">
            <div className="flex gap-2">
              <Icon
                icon="ant-design:car-filled"
                className="text-secondary lg:text-primary text-xl"
              />
              <Typography
                className="text-dark text-sm font-semibold"
                placeholder=""
              >
                {job.distance || "None"}
              </Typography>
            </div>
          </div>
        ) : (
          <div className="col-span-4 lg:col-span-1">
            <div className="flex gap-2">
              <Icon
                icon="fluent:person-money-20-filled"
                className="text-secondary lg:text-primary text-xl"
              />
              <Typography
                placeholder=""
                className="text-dark text-sm font-semibold"
              >
                {job?.salary?.mode === null
                  ? "None"
                  : `$${job?.salary?.min} - $${job?.salary?.max}`}
              </Typography>
            </div>
          </div>
        )}

        <div className="col-span-4 lg:col-span-1">
          <div className="flex gap-2">
            <Icon
              icon="solar:calendar-bold"
              className="text-secondary lg:text-primary text-xl"
            />
            <Typography
              className="text-dark text-sm font-semibold"
              placeholder=""
            >
              {job.postedAt.slice(0, 10)}
            </Typography>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center mt-4 lg:hidden">
        {activeTab === "Applied" ? (
          <div className="flex justify-center items-center gap-x-2">
            {job.status === "Application Rejected" ? (
              <Icon
                icon="gridicons:cross-circle"
                className="text-xl text-error"
              />
            ) : (
              <Icon
                icon="teenyicons:tick-circle-solid"
                className="text-xl text-[#00D391]"
              />
            )}

            <Typography placeholder="" className="text-sm  font-bold text-dark">
              {job.status}
            </Typography>
          </div>
        ) : !job.isReadable ? (
          <div className="">
            <Typography
              placeholder=""
              className="text-sm text-end text-error max-w-[180px]"
            >
              Cannot apply due to no confirmed license in TX
            </Typography>
          </div>
        ) : (
          <div className="flex justify-center">
            <Button
              variant="filled"
              color="secondary"
              className="flex justify-center items-center max-w-[107px] h-9"
              onClick={handleApplyJob}
            >
              Apply
            </Button>
          </div>
        )}
        {activeTab === "Temporary" || activeTab === "Permanent" ? (
          <Typography
            placeholder=""
            className="text-sm text-lightDark pt-2 text-center"
          >
            {job.numOfAppliers} professionals have applied
          </Typography>
        ) : (
          <></>
        )}
      </div>
      <JobApplyDialog
        applyJob={applyJob}
        job={job}
        setApplyJob={setApplyJob}
        size="md"
      />
    </div>
  );
}
