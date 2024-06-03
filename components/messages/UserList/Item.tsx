import { AllHTMLAttributes } from "react";
import Image from "next/image";
import { IUserItem } from "@/utils/interfaces";
import { Typography } from "@/libraries/material-tailwind";
import { ellipsisString } from "@/utils/functions";

interface IProps extends AllHTMLAttributes<HTMLDivElement> {
  itemData: IUserItem;
  total:number;
}

export default function Item({ onClick, className,total, itemData }: IProps) {
  console.log(total)
  return (
    <div
      className={`py-2 px-1 flex items-stretch justify-between bg-white hover:bg-gray-200 transition rounded-md cursor-pointer ${className}`}
      onClick={onClick}
    >
      <div className="flex items-center gap-2">
        <Image
          src={itemData?.chatterData?.avatar || ""}
          alt=""
          width={48}
          height={48}
          className="h-auto rounded-full"
        />

        <div className="flex flex-col items-start">
          <Typography placeholder="" className="text-base font-bold text-dark">
            {itemData?.chatterData?.name}
          </Typography>
          <Typography placeholder="" className="text-base text-lightDark line-clamp-1">
            {ellipsisString(itemData.lastMessage, 20)}
          </Typography>
        </div>
      </div>

      <div className="flex flex-col items-end justify-between">
        <Typography placeholder="" className="text-sm text-lightDark">
          {itemData?.sentAt}
        </Typography>
        {total>0 && (
          <div className="w-4 h-4 bg-secondary p-3 rounded-full flex flex-col items-center justify-center">
            <span className="text-xs text-white">{total}</span>
          </div>
        )}
      </div>
    </div>
  );
}
