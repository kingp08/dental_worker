import { IconButton } from "@/libraries/material-tailwind";
import { Icon } from "@/libraries/iconify-react";
import { IComponent } from "@/utils/interfaces";
import { ICON_MAPPER, PATH_MAPPER } from "@/utils/constants";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RecommendAlert({ className = "" }: IComponent) {
  const [showNotification, setShowNotification] = useState(true);
  const router = useRouter();

  const scheduleHandler = () => {
    router.push(PATH_MAPPER.schedule);
    setShowNotification(false);
  };

  return (
    <div
      className={`bg-warning bg-opacity-20 border border-warning px-2 py-2 flex items-center justify-between gap-2 rounded-lg ${
        !showNotification && "hidden"
      } ${className}`}
    >
      <div className="flex items-start gap-2">
        <Icon
          icon={ICON_MAPPER.clock}
          className="text-xl text-warning mt-0 lg:mt-0.5"
        />
        <span className="text-black text-sm lg:text-base">
          Do you want to update your schedule?
        </span>
      </div>

      <div className="flex items-center gap-1">
        <IconButton
          placeholder="Accept"
          variant="text"
          className="text-xl text-success w-6 h-6"
          onClick={scheduleHandler}
        >
          <Icon icon={ICON_MAPPER.check} />
        </IconButton>
        <IconButton
          placeholder="Accept"
          variant="text"
          className="text-xl text-error w-6 h-6"
          onClick={() => setShowNotification(false)}
        >
          <Icon icon={ICON_MAPPER.close} />
        </IconButton>
      </div>
    </div>
  );
}
