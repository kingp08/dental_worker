import type { TUserItem } from "@/app/messages/page";
import { IMessage } from "@/utils/interfaces";
import Image from "next/image";
import { AllHTMLAttributes } from "react";

interface IProps extends AllHTMLAttributes<HTMLDivElement> {
  message: IMessage;
  user: TUserItem;
}

export default function ReceivedMessage({
  message,
  user,
  className = "",
  ...others
}: IProps) {
  return (
    <div className={`w-full flex justify-start ${className}`} {...others}>
      <div className="w-full md:w-3/4 flex items-start gap-2">
        <Image
          src={user?.chatterData?.avatar || ""}
          alt=""
          width={40}
          height={40}
          className="h-auto"
        />

        <div className="flex-1 flex items-end bg-[#d8b4fe] p-4 rounded-2xl rounded-tl-none">
          <p className="flex-1 text-dark text-sm md:text-base">
            {message.message}
          </p>
          <span className="text-lightDark text-xs md:text-sm">
            {message.sentAt.slice(11, 16)}
          </span>
        </div>
      </div>
    </div>
  );
}
