"use client";

import { IComponent } from "@/utils/interfaces";
import { ICON_MAPPER } from "@/utils/constants";
import {
  Typography,
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
} from "@/libraries/material-tailwind";
import { Icon } from "@/libraries/iconify-react";

interface IProps extends IComponent {
  openDelete: boolean;
  setDeleteOpen: (open: boolean) => void;
  item: any;
}

export default function DeleteDialog({
  openDelete,
  setDeleteOpen,
  item,
}: IProps) {
  const handleClick = () => {
    setDeleteOpen(!openDelete);
  };

  return (
    <Dialog
      placeholder=""
      size="md"
      open={openDelete}
      handler={() => setDeleteOpen(!openDelete)}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0, y: 25 },
      }}
      className="bg-transparent shadow-none h-[500px] overflow-y-auto"
    >
      <Card placeholder="" className="mx-auto w-full">
        <CardBody
          placeholder=""
          className="flex flex-col items-center gap-4 p-10 lg:p-20"
        >
          <div className="p-5">
            <Icon
              icon={ICON_MAPPER.delete}
              className="text-sm text-[#FF3257] w-10 h-10 text-center"
            />
          </div>
          <div className="">
            <Typography
              placeholder=""
              className="text-lightDark text-sm text-center"
            >
              Are you sure want to delete?
            </Typography>
            <Typography
              placeholder=""
              className="text-lightDark text-sm text-center"
            >
              This exception from{" "}
              <span className="text-dark font-bold">{item.from}</span> to
              <span className="text-dark font-bold"> {item.to}</span>
            </Typography>
          </div>
        </CardBody>
        <CardFooter placeholder="" className="py-0 p-10">
          <div className="flex gap-3 justify-center">
            <Button
              placeholder=""
              variant="outlined"
              onClick={handleClick}
              className="text-lightDark border border-lightDark"
            >
              Cancel
            </Button>
            <Button
              placeholder=""
              variant="outlined"
              onClick={handleClick}
              className="text-primary border border-primary"
            >
              Delete
            </Button>
          </div>
        </CardFooter>
      </Card>
    </Dialog>
  );
}
