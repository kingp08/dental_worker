"use client";

import { useState } from "react";
import Button from "@/components/custom/buttons/Button";
import { IComponent } from "@/utils/interfaces";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  Typography,
  MTInput,
} from "@/libraries/material-tailwind";
import type { DialogProps } from "@/libraries/material-tailwind";
import api from "@/utils/api";
import { toast } from "@/libraries/react-toastify";
import { getErrorMessage } from "@/utils/functions";

interface IProps extends IComponent {
  addBillingCardDialog: boolean;
  setAddBillingCardDialog: Function;
  handleSave: any;
  size: DialogProps["size"];
}

export default function AddBillingCardDialog({
  addBillingCardDialog,
  setAddBillingCardDialog,
  handleSave,
  size = "sm",
}: IProps) {
  const handler = () => {
    setAddBillingCardDialog(!addBillingCardDialog);
  };

  const [cardNumber, setCardNumber] = useState<string>("");
  const [expiry, setExpiry] = useState<string>("");
  const [pin, setPin] = useState<string>("");

  const handleChange = (e: any) => {
    const { id, value } = e.target;

    if( id === "cardNum"){
      setCardNumber(value);
    } else if ( id === "expDate"){
      setExpiry(value);
    } else {
      setPin(value);
    }
  };

  const handleSaved = () => {
    api
      .post("/membership/save/credit/card", { 
        cardNumber: cardNumber,
        expiry: expiry,
        pin: pin
       } )
      .then((res) => {
        toast.success("Saved successfully.");
      })
      .catch((err) => {
        toast.error(getErrorMessage(err));
      });

      setCardNumber("");
      setExpiry("");
      setPin("");
  };

  return (
    <Dialog
      placeholder=""
      handler={handler}
      open={addBillingCardDialog}
      size={size}
    >
      <DialogHeader
        placeholder=""
        className="flex justify-center pt-10 xl:pt-20  pb-6 xl:pb-12"
      >
        <Typography
          placeholder=""
          variant="h2"
          className="text-3xl font-bold text-dark"
        >
          Billing Information
        </Typography>
      </DialogHeader>
      <DialogBody placeholder="" className="px-10 xl:px-20 pb:10 xl:pb-20 pt-0">
        <Typography placeholder="" className="text-base text-lightDark pb-2">
          Card Number
        </Typography>
        <MTInput
          placeholder="Card Number"
          id="cardNum"
          maxLength={16}
          value={cardNumber}
          className="!border-l-0 !border-r-0 !border-t-0 !border-b-[#EAE7F1]  !bg-[#FCFAFF]  placeholder:text-[#B6AACA]"
          labelProps={{
            className: "hidden",
          }}
          crossOrigin={undefined}
          onChange={handleChange}
        />
        <div className="flex justify-between pt-6">
          <div>
            <Typography
              placeholder=""
              className="text-base text-lightDark pb-2"
            >
              Expiry Date
            </Typography>
            <MTInput
              placeholder="MM / YY"
              id="expDate"
              maxLength={5}
              value={expiry}
              className="!border-l-0 !border-r-0 !border-t-0 !border-b-[#EAE7F1]  !bg-[#FCFAFF]  placeholder:text-[#B6AACA]"
              labelProps={{
                className: "hidden",
              }}
              crossOrigin={undefined}
              onChange={handleChange}
            />
          </div>
          <div>
            <Typography
              placeholder=""
              className="text-base text-lightDark pb-2"
            >
              PIN
            </Typography>
            <MTInput
              placeholder="CVV"
              id="pin"
              maxLength={3}
              value={pin}
              className="!border-l-0 !border-r-0 !border-t-0 !border-b-[#EAE7F1]  !bg-[#FCFAFF]  placeholder:text-[#B6AACA]"
              labelProps={{
                className: "hidden",
              }}
              crossOrigin={undefined}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex justify-end pt-6">
          <Button
            variant="filled"
            color="secondary"
            className="py-2 px-8"
            onClick={handleSaved}
          >
            Save
          </Button>
        </div>
      </DialogBody>
    </Dialog>
  );
}
