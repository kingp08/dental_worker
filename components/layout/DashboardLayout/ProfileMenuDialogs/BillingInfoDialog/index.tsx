import { useState } from "react";
import Image from "next/image";
import { IComponent } from "@/utils/interfaces";
import { Icon } from "@/libraries/iconify-react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  IconButton,
  Button,
  Typography,
} from "@/libraries/material-tailwind";
import type { DialogProps } from "@/libraries/material-tailwind";
import { ICON_MAPPER } from "@/utils/constants";
import AddBillingCardDialog from "./AddBillingCardDialog";

interface IProps extends IComponent {
  billingInfoDialogOpened: boolean;
  setBillingInfoDialogOpened: Function;
  size: DialogProps["size"];
}

export default function BillingInfoDialog({
  billingInfoDialogOpened,
  setBillingInfoDialogOpened,
  size = "lg",
}: IProps) {
  const handler = () => {
    setBillingInfoDialogOpened(!billingInfoDialogOpened);
  };

  const [addCardDialog, setAddCardDialog] = useState<boolean>(false);
  const [addBillingCardDialog, setAddBillingCardDialog] =
    useState<boolean>(false);

  const handleAdd = () => {
    setAddBillingCardDialog(true);
  };
  const handleSave = () => {
    setAddCardDialog(true);
    setAddBillingCardDialog(false);
  };

  return (
    <Dialog
      placeholder=""
      handler={handler}
      open={billingInfoDialogOpened}
      size={size}
      className="h-[95%] overflow-y-auto"
    >
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
      <DialogBody placeholder="" className="px-10 xl:px-20">
        <Typography placeholder="" className="text-3xl text-dark font-bold">
          Billing Info
        </Typography>
        <Typography
          placeholder=""
          className="text-xl text-dark font-bold  pt-6 xl:pt-12 pb-3 xl:pb-6"
        >
          Payment
        </Typography>
        {!addCardDialog ? (
          <div className="flex justify-center">
            <div className="flex flex-col items-center rounded-lg border border-[#F6F4F9] px-6 xl:px-13 py-10 xl:py-21  w-1/3">
              <Button
                placeholder=""
                variant="filled"
                className="bg-secondary flex items-center gap-2 p-2"
                onClick={handleAdd}
              >
                <Icon icon={ICON_MAPPER.plus} className="text-3xl text-bold" />
              </Button>
              <Typography
                placeholder=""
                className="text-base text-lightDark font-semibold pt-4"
              >
                Add Credit Card
              </Typography>
            </div>
            <AddBillingCardDialog
              addBillingCardDialog={addBillingCardDialog}
              setAddBillingCardDialog={setAddBillingCardDialog}
              handleSave={handleSave}
              size="sm"
            />
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-3 md:col-span-1 flex flex-col items-center border border-[#F6F4F9] p-4 rounded-lg">
              <Image
                src="/assets/images/bankCard.png"
                width={154}
                height={80}
                className="w-auto h-auto"
                alt=""
                priority={true}
              />
              <Typography
                placeholder=""
                className="text-base text-dark font-bold pt-4"
              >
                US BANK Mega
              </Typography>
              <Typography
                placeholder=""
                className="text-base text-lightDark pb-4"
              >
                xxxxxxxxxxxx9299
              </Typography>
              <Typography
                placeholder=""
                className="text-sm text-dark py-1 px-2 bg-[#FCFCFD] border border-[#F8F4FF] rounded-lg"
              >
                Visa
              </Typography>
            </div>
            <div className="col-span-3 md:col-span-1 flex flex-col items-center border border-[#F6F4F9] p-4 rounded-lg">
              <Image
                src="/assets/images/bankCard.png"
                width={154}
                height={80}
                className="w-auto h-auto"
                alt=""
                priority={true}
              />
              <Typography
                placeholder=""
                className="text-base text-dark font-bold pt-4"
              >
                US BANK NA
              </Typography>
              <Typography
                placeholder=""
                className="text-base text-lightDark pb-4"
              >
                xxxxxxxxxxxx8810
              </Typography>
              <Typography
                placeholder=""
                className="text-sm text-dark py-1 px-2 bg-[#FCFCFD] border border-[#F8F4FF] rounded-lg"
              >
                Master Card
              </Typography>
            </div>
            <div className="col-span-3 md:col-span-1 flex flex-col items-center justify-center border border-[#F6F4F9] p-4 rounded-lg">
              <div className="flex flex-col items-center">
                <Button
                  placeholder=""
                  variant="filled"
                  className="bg-secondary flex items-center gap-2 p-2"
                  onClick={handleAdd}
                >
                  <Icon
                    icon={ICON_MAPPER.plus}
                    className="text-3xl text-bold"
                  />
                </Button>
                <Typography
                  placeholder=""
                  className="text-base text-lightDark font-semibold pt-4"
                >
                  Add Credit Card
                </Typography>
              </div>
            </div>
          </div>
        )}

        <Typography
          placeholder=""
          className="text-xl text-dark font-bold  pt-6 xl:pt-12 pb-3 xl:pb-6"
        >
          Payment History
        </Typography>
        <div className="p-3 xl:p-6 rounded-lg border border-[#F6F4F9]">
          <div className="grid grid-cols-8 gap-3 bg-[#FCFAFF] rounded-lg py-3">
            <div className="col-span-2 text-center">
              <Typography
                placeholder=""
                className="text-base text-lightDark font-semibold"
              >
                Date
              </Typography>
            </div>
            <div className="col-span-2 text-center">
              <Typography
                placeholder=""
                className="text-base text-lightDark font-semibold"
              >
                Subtotal
              </Typography>
            </div>
            <div className="col-span-2 text-center">
              <Typography
                placeholder=""
                className="text-base text-lightDark font-semibold"
              >
                Discount
              </Typography>
            </div>
            <div className="col-span-2 text-center">
              <Typography
                placeholder=""
                className="text-base text-lightDark font-semibold"
              >
                Total
              </Typography>
            </div>
          </div>
          <div className="p-6 xl:p-12 text-center">
            <Typography
              placeholder=""
              className="text-base text-lightDark font-semibold"
            >
              No history available
            </Typography>
          </div>
        </div>
      </DialogBody>
    </Dialog>
  );
}
