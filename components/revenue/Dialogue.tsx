import React, { useState } from "react";
import { IComponent } from "@/utils/interfaces";
import {
  Typography,
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  MTInput,
} from "@/libraries/material-tailwind";
import { useUser } from "@/contexts/UserContext";

interface IDialogue extends IComponent {
  open: boolean;
  setOpen: (open: boolean) => void;
  addBank: any;
}

export default function Dialogue({
  className = "",
  open,
  setOpen,
  addBank,
}: IDialogue) {
  const { userData } = useUser();
  const [formData, setFormData] = useState({
    firstName: userData?.firstName,
    lastName: userData?.lastName,
    routingNumber: "",
    accountNumber: "",
    accountType: "individual",
    accountName: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    addBank(formData);

    setOpen(false);
  };

  return (
    <Dialog
      placeholder=""
      size="md"
      open={open}
      handler={() => setOpen(!open)}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0, y: 25 },
      }}
      className="bg-transparent shadow-none"
    >
      <Card placeholder="" className="mx-auto w-full">
        <CardBody placeholder="" className="flex flex-col gap-4 lg:p-10">
          <Typography
            placeholder=""
            className="text-xl lg:text-4xl text-dark font-bold text-left lg:text-center py-4 lg:py-9"
          >
            Add bank account
          </Typography>
          <form className="">
            <div className="py-3">
              <Typography
                placeholder=""
                className="text-base font-normal text-lightDark py-2"
              >
                Account Name
              </Typography>
              <MTInput
                label="Account Name"
                size="md"
                crossOrigin={undefined}
                className="py-1 lg:py-3 px-4 bg-[#FCFAFF]"
                name="accountName"
                value={formData.accountName}
                onChange={handleChange}
              />
            </div>
            <div className="py-3">
              <Typography
                placeholder=""
                className="text-base font-normal text-lightDark py-2"
              >
                Account Type
              </Typography>
              <MTInput
                label="Account Type"
                size="md"
                crossOrigin={undefined}
                className="py-1 lg:py-3 px-4 bg-[#FCFAFF]"
                name="routingNumber"
                value={formData.accountType}
                onChange={handleChange}
              />
            </div>
            <div className="py-3">
              <Typography
                placeholder=""
                className="text-base font-normal text-lightDark py-2"
              >
                Routing Number
              </Typography>
              <MTInput
                label="9 Digit Routing Number"
                size="md"
                crossOrigin={undefined}
                className="py-1 lg:py-3 px-4 bg-[#FCFAFF]"
                name="routingNumber"
                value={formData.routingNumber}
                onChange={handleChange}
              />
            </div>
            <div className="">
              <Typography
                placeholder=""
                className="text-base font-normal text-lightDark py-2"
              >
                Account Number
              </Typography>
              <MTInput
                label="Enter Account Number"
                size="md"
                crossOrigin={undefined}
                className="py-3 px-4 bg-[#FCFAFF]"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleChange}
              />
            </div>
          </form>
        </CardBody>
        <CardFooter placeholder="" className="py-0 p-10">
          <div className="flex gap-3 justify-end">
            <Button
              placeholder=""
              variant="outlined"
              onClick={() => setOpen(false)}
              className="text-primary border border-primary"
            >
              Cancel
            </Button>
            <Button
              placeholder=""
              variant="filled"
              onClick={handleSave}
              className="bg-secondary"
            >
              Save
            </Button>
          </div>
        </CardFooter>
      </Card>
    </Dialog>
  );
}
