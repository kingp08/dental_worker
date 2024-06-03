import Image from "next/image";
import Button from "@/components/custom/buttons/Button";
import { IComponent, IJob } from "@/utils/interfaces";
import { Icon } from "@/libraries/iconify-react";
import { ICON_MAPPER, PATH_MAPPER } from "@/utils/constants";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  Typography,
  DialogProps,
  IconButton,
  Avatar,
  Textarea,
} from "@/libraries/material-tailwind";
import { ellipsisString, getErrorMessage } from "@/utils/functions";
import moment from "moment";
import { ChangeEvent, useState } from "react";
import api from "@/utils/api";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface IProps extends IComponent {
  applyJob: boolean;
  setApplyJob: React.Dispatch<React.SetStateAction<boolean>>;
  job: IJob;
  size: DialogProps["size"];
}

const JobApplyDialog: React.FC<IProps> = ({
  applyJob,
  setApplyJob,
  job,
  size,
}: IProps) => {
  const router = useRouter();

  const handler = () => {
    setApplyJob(!applyJob);
  };

  const handleApply = () => {

    const applyForJob = async () => {
      await api
        .post("/jobs/professional/send/application", {
          jobId: job.id,
          message: message
        })
        .then((res) => {
          setApplyJob(!applyJob);
        })
        .catch((err) => {
          toast.error(getErrorMessage(err));
        });
    }
    applyForJob();
    setMessage("");
  }

  const [message, setMessage] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  return (
    <Dialog placeholder="" handler={handler} open={applyJob} size={size}>
      <DialogHeader placeholder="" className="flex justify-end">
        <IconButton
          placeholder=""
          className="text-2xl text-lightDark w-8 h-8"
          variant="text"
          onClick={handler}
        >
          <Icon icon={ICON_MAPPER.close} />
        </IconButton>
      </DialogHeader>
      <DialogBody placeholder="" className="mx-20 py-5 rounded-xl justify-between">
        <div className="flex flex-col items-center pb-6 gap-2">
          <Image
            src="/assets/images/Group.png"
            width={124}
            height={150}
            alt=""
          />
          <Typography
            placeholder=""
            className="text-center text-dark font-semibold text-xl"
          >
            Are you sure you want to apply for this job?
          </Typography>
          <div className="flex gap-2 p-2 !bg-[#FCFAFF]">
            <Avatar
              variant="rounded"
              src={job?.posterData?.avatar}
              alt=""
              className="w-[68px] h-[68px]"
              placeholder=""
            />
            <div className="flex flex-row ">
              <div className=" md:hidden">
                <Typography
                  placeholder=""
                  variant="h3"
                  className="text-dark text-xl font-bold"
                >
                  {ellipsisString(`${job?.title}`, 30)}
                </Typography>
              </div>
              <div className="flex flex-col content-between">
                <Typography
                  placeholder=""
                  variant="h3"
                  className="text-dark text-xl font-bold"
                >
                  {`${job?.title} needed on ${moment(job?.postedAt).format("MMM Do YY")}`}
                </Typography>
                <Typography placeholder="" className="text-md text-lightDark">
                  {job?.location}
                </Typography>
              </div>
            </div>
          </div>
          <div className="w-full">
            <Typography
              placeholder=""
              className="text-xs md:text-sm font-normal text-lightDark"
            >
              Message
            </Typography>
            <Textarea
              rows={5}
              resize={false}
              placeholder="Write here..."
              className="min-h-full !border-0 focus:border-transparent rounded-lg !bg-[#FCFAFF]"
              containerProps={{
                className: "grid h-full",
              }}
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={message}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col items-center gap-3">
            <Button
              variant="filled"
              color="secondary"
              onClick={handleApply}
              className="py-2 px-4 w-full"
            >
              Apply
            </Button>
            <Link href={PATH_MAPPER.jobPosting}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handler}
                className="py-2 px-4"
              >
                Search Other Jobs
              </Button>
            </Link>
          </div>
        </div>
      </DialogBody>
    </Dialog>
  );
};

export default JobApplyDialog;
