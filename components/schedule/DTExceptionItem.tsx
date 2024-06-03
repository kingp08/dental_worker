"use client";

import { ChangeEvent, useState } from "react";
import { IComponent } from "@/utils/interfaces";
import { ListItem, Typography } from "@/libraries/material-tailwind";
import StatusBadge from "../custom/StatusBadge";
import EditDialog from "./EditDialog";
import DeleteDialog from "./DeleteDialog";
import { SCHEDULE_TIMES, ICON_MAPPER } from "@/utils/constants";
import { SCHEDULE } from "@/utils/tempData";
import { Icon } from "@/libraries/iconify-react";

interface IProps extends IComponent {
  item: any;
  index: number;
}

export default function DTExceptionItem({
  className = "",
  item,
  index,
}: IProps) {
  const [from, setFrom] = useState<string>(SCHEDULE_TIMES[1]);
  const [to, setTo] = useState<string>(SCHEDULE_TIMES[1]);

  const handleFrom = (e: ChangeEvent<HTMLSelectElement>) => {
    setFrom(e.target.value);
  };

  const handleTo = (e: ChangeEvent<HTMLSelectElement>) => {
    setTo(e.target.value);
  };

  const [openEdit, setEditOpen] = useState<boolean>(false);
  const handleEdit = () => setEditOpen((cur) => !cur);

  const [openDelete, setDeleteOpen] = useState<boolean>(false);
  const handleDelete = () => setDeleteOpen((cur) => !cur);

  return (
    <>
      <div className="pt-6">
        <div className="px-4 flex items-center">
          <ListItem
            placeholder=""
            key={item.id}
            className={`justify-between items-center${
              index === SCHEDULE.length - 1
                ? ""
                : " border-b-2 border-[#F8F4FF]"
            }`}
          >
            <div className="w-full grid grid-cols-8 gap-2">
              <div className="col-span-2">
                <Typography placeholder="" className="text-lightDark text-sm">
                  {from}
                </Typography>
              </div>
              <div className="col-span-2">
                <Typography placeholder="" className="text-lightDark text-sm">
                  {to}
                </Typography>
              </div>
              <div className="col-span-2 flex justify-center">
                <StatusBadge status={item.availability}>
                  {item.availability}
                </StatusBadge>
              </div>
              <div className="col-span-2">
                <div className="flex justify-center gap-6">
                  <Icon
                    icon={ICON_MAPPER.edit}
                    className="text-md text-lightDark w-6 h-6"
                    onClick={handleEdit}
                  />
                  <Icon
                    icon={ICON_MAPPER.delete}
                    className="text-md text-lightDark w-6 h-6"
                    onClick={handleDelete}
                  />
                </div>
              </div>
            </div>
          </ListItem>
        </div>
      </div>
      <EditDialog
        openEdit={openEdit}
        setEditOpen={setEditOpen}
        available={item.available}
      />
      <DeleteDialog
        openDelete={openDelete}
        setDeleteOpen={setDeleteOpen}
        item={item}
      />
    </>
  );
}
