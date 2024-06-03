import Image from "next/image";
import Button from "@/components/custom/buttons/Button";
import { IComponent, IProfessional } from "@/utils/interfaces";
import { Icon } from "@/libraries/iconify-react";
import { ICON_MAPPER } from "@/utils/constants";
import {
  Dialog,
  DialogBody,
  IconButton,
  Typography,
} from "@/libraries/material-tailwind";
import type { DialogProps } from "@/libraries/material-tailwind";

interface IProps extends IComponent {
  referDialogOpen: boolean;
  setReferDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  size: DialogProps["size"];
}

const SHARE_LINK = [
  {
    id: 1,
    src: "/assets/images/socialLink1.png",
  },
  {
    id: 2,
    src: "/assets/images/socialLink2.png",
  },
  {
    id: 3,
    src: "/assets/images/socialLink3.png",
  },
  {
    id: 4,
    src: "/assets/images/socialLink4.png",
  },
];

const DATA = [
  {
    id: 1,
    referral: "Lorem ipsum",
    status: "Lorem ipsum",
    lastUpdate: "11min ago",
    reward: "Lorem",
  },
  {
    id: 2,
    referral: "Lorem ipsum",
    status: "Lorem ipsum",
    lastUpdate: "2hours ago",
    reward: "Lorem",
  },
  {
    id: 3,
    referral: "Lorem ipsum",
    status: "Lorem ipsum",
    lastUpdate: "1day ago",
    reward: "Lorem",
  },
];

const ReferDialog: React.FC<IProps> = ({
  referDialogOpen,
  setReferDialogOpen,
  size = "lg",
}: IProps) => {
  const handler = () => {
    setReferDialogOpen(!referDialogOpen);
  };

  return (
    <Dialog
      placeholder=""
      handler={handler}
      open={referDialogOpen}
      size={size}
      className="h-[80%] overflow-y-auto"
    >
      <DialogBody placeholder="">
        <div className="flex justify-end">
          <IconButton
            placeholder=""
            className="text-2xl text-lightDark w-8 h-8"
            variant="text"
            onClick={handler}
          >
            <Icon icon={ICON_MAPPER.close} />
          </IconButton>
        </div>
        <Typography
          placeholder=""
          className="text-dark text-xl xl:text-4xl font-semibold pt-4 xl:pt-8"
        >
          Refer, Reward, Repeat
        </Typography>
        <div className="pt-2">
          <Typography
            placeholder=""
            className="text-lightDark text-lg xl:text-2xl font-semibold"
          >
            We&apos;re looking for great dental professionals like you!
          </Typography>
        </div>
        <div className="pt-6">
          <Typography
            placeholder=""
            className="text-lightDark text-xs xl:text-sm font-semibold"
          >
            Receive <span className="font-bold">$100</span> for each dental
            professional that you refer who registers with Dental Jobs AND
            completes at least one booking.
          </Typography>
          <Typography
            placeholder=""
            className="text-lightDark text-xs xl:text-sm font-semibold pt-2"
          >
            Receive <span className="font-bold">$100</span> for each new dental
            practice you refer who registers with Dental Jobs AND purchases a
            plan. (Limited to one office per account and does not apply to
            reactivations.)
          </Typography>
        </div>
        <div className="pt-6">
          <Typography
            placeholder=""
            className="text-dark text-sm xl:text-base font-bold"
          >
            It&apos;s So Easy
          </Typography>
          <Typography
            placeholder=""
            className="text-lightDark text-xs xl:text-sm font-semibold pt-2"
          >
            Share your link on social media, texts, emails - however you want to
            invite your friends and colleagues to join Dental Jobs for the first
            time.
          </Typography>
        </div>
        <div className="pt-6">
          <Typography
            placeholder=""
            className="text-dark text-xs xl:text-sm font-bold"
          >
            Share the site
          </Typography>
          <div className="flex gap-6 pt-6">
            {SHARE_LINK.map((item) => (
              <Image
                key={item.id}
                src={item.src}
                width={58}
                height={58}
                alt=""
              />
            ))}
          </div>
        </div>
        <div className="pt-6 xl:pt-12">
          <div className="grid grid-cols-4 gap-2 py-2 px-3 bg-[#FCFAFF]">
            <div className="col-span-1">
              <Typography
                placeholder=""
                className="text-dark text-sm xl:text-base font-semibold"
              >
                Referral
              </Typography>
            </div>
            <div className="col-span-1">
              <Typography
                placeholder=""
                className="text-dark text-sm xl:text-base font-semibold"
              >
                Status
              </Typography>
            </div>
            <div className="col-span-1">
              <Typography
                placeholder=""
                className="text-dark text-sm xl:text-base font-semibold"
              >
                Last Update
              </Typography>
            </div>
            <div className="col-span-1">
              <Typography
                placeholder=""
                className="text-dark text-sm xl:text-base font-semibold"
              >
                Reward
              </Typography>
            </div>
          </div>
          {DATA.map((data, i) => (
            <div
              key={data.id}
              className={`grid grid-cols-4 items-center gap-2 justify-start py-2 px-3 ${
                i !== DATA.length - 1 ? " border-b-2 border-[#F8F4FF]" : ""
              }`}
            >
              <Typography
                placeholder=""
                className="text-lightDark text-sm xl:text-base"
              >
                {data.referral}
              </Typography>
              <Typography
                placeholder=""
                className="text-lightDark text-sm xl:text-base"
              >
                {data.status}
              </Typography>
              <Typography
                placeholder=""
                className="text-lightDark text-sm xl:text-base"
              >
                {data.lastUpdate}
              </Typography>
              <Typography
                placeholder=""
                className="text-lightDark text-sm xl:text-base"
              >
                {data.reward}
              </Typography>
            </div>
          ))}
        </div>
      </DialogBody>
    </Dialog>
  );
};

export default ReferDialog;
