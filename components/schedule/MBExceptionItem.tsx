"use client";

import { ChangeEvent, useState } from "react";
import { IComponent } from "@/utils/interfaces";
import { Typography } from "@/libraries/material-tailwind";
import StatusBadge from "../custom/StatusBadge";
import { SCHEDULE_TIMES, ICON_MAPPER } from "@/utils/constants";
import { Icon } from "@/libraries/iconify-react";

import EditDialog from "./EditDialog";
import DeleteDialog from "./DeleteDialog";

interface IProps extends IComponent {
  item: any;
  index: number;
}

export default function MBExceptionItem({ item, index }: IProps) {
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
      <div>
        <div className="block lg:hidden pt-3">
          <div className="p-4 shadow-lg">
            <div className="flex justify-between items-center">
              <StatusBadge status={item.availability}>
                {item.availability}
              </StatusBadge>
              <div className="flex justify-center gap-6">
                <Icon
                  icon={ICON_MAPPER.edit}
                  className="text-md text-lightDark w-5 h-5 cursor-pointer"
                  onClick={handleEdit}
                />
                <Icon
                  icon={ICON_MAPPER.delete}
                  className="text-md text-lightDark w-5 h-5 cursor-pointer"
                  onClick={handleDelete}
                />
              </div>
            </div>
            <div className="pt-2">
              <Typography
                placeholder=""
                className="text-dark font-bold text-sm"
              >
                From
              </Typography>
              <Typography placeholder="" className="text-lightDark text-sm">
                {from}
              </Typography>
            </div>
            <div className="pt-2">
              <Typography
                placeholder=""
                className="text-dark font-bold text-sm"
              >
                To
              </Typography>
              <Typography placeholder="" className="text-lightDark text-sm">
                {to}
              </Typography>
            </div>
          </div>
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
