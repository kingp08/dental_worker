import { useState } from "react";
import { IComponent, IJob } from "@/utils/interfaces";
import { Icon } from "@/libraries/iconify-react";
import { ICON_MAPPER } from "@/utils/constants";
import {
  Dialog,
  DialogBody,
  IconButton,
  Typography,
} from "@/libraries/material-tailwind";
import type { DialogProps } from "@/libraries/material-tailwind";
import JobTabItem from "@/components/job-posting/JobTabItem";

interface IProps extends IComponent {
  viewJob: boolean;
  setViewJob: React.Dispatch<React.SetStateAction<boolean>>;
  job: IJob;
  activeTab: string;
  size: DialogProps["size"];
}

const JobDescriptionDialog: React.FC<IProps> = ({
  viewJob,
  setViewJob,
  job,
  activeTab,
  size,
}: IProps) => {
  const handler = () => {
    setViewJob(!viewJob);
  };

  return (
    <>
      <Dialog placeholder="" handler={handler} open={viewJob} size={size}>
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
          <div className="p-6 sm:px-10 xl:px-20">
            <div className="flex justify-between items-center">
              <Typography
                placeholder=""
                className="text-xl lg:text-2xl xl:text-4xl text-dark font-bold"
              >
                Job Description
              </Typography>
              <Icon
                icon={ICON_MAPPER.close}
                className="flex text-dark font-bold text-xl ss:hidden cursor-pointer"
                onClick={handler}
              />
            </div>
            <JobTabItem job={job} activeTab={activeTab} />
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
};

export default JobDescriptionDialog;
