"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Dialogue from "./Dialogue";
import BankItem from "./BankItem";
import { IComponent, IBank, PaymentAccount } from "@/utils/interfaces";
import { Typography, Button, Switch } from "@/libraries/material-tailwind";
import { Icon } from "@/libraries/iconify-react";
import api from "@/utils/api";
import { toast } from "react-toastify";
import { getErrorMessage } from "@/utils/functions";

const BANKS: Array<IBank> = [
  {
    id: 1,
    logo: "/assets/images/bank1.png",
    name: "US BANK Mega",
    bankNum: "XXXXXXX5821",
    status: "eligible",
    isDefault: true,
  },
  {
    id: 2,
    logo: "/assets/images/bank2.png",
    name: "US BANK NA",
    bankNum: "XXXXXXX0549",
    status: "eligible",
    isDefault: false,
  },
  {
    id: 3,
    logo: "/assets/images/bank3.png",
    name: "Nordic BANK",
    bankNum: "XXXXXXX0549",
    status: "eligible",
    isDefault: false,
  },
];

export default function DirectDepositTab({ className = "" }: IComponent) {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const [addResult, setAddResult] = useState<boolean>(false);
  const [banks, setBanks] = useState([]);

  const addBank = async (data: any) => {
    try {
      let res = await api.post("/membership/save/connect/bankaccount", data);
      if (res) {
        toast.success("Bank Account Added");
        // get bank list
        setAddResult(true);
      }
    } catch (err: any) {
      toast.error(getErrorMessage(err));
    }
  };

  useEffect(() => {
    api
      .get("/membership/get/payment/account")
      .then((res) => {
        const filteredData = res.data.filter(
          (item: PaymentAccount) => item.accountNumber && item.bankName
        );
        setBanks(filteredData);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="h-full rounded-lg bg-[#FCFCFD]">
      {!addResult ? (
        <div className="flex flex-col m-auto">
          <Typography
            placeholder=""
            className="text-dark font-bold text-xl pt-6 pl-6"
          >
            Bank Accounts
          </Typography>
          <Image
            src="/assets/images/revenueTab2.svg"
            width={378}
            height={244}
            alt="direct deposit"
            className="m-auto"
          />
          <div className="flex justify-center">
            <Typography
              placeholder=""
              className="text-dark font-bold text-sm py-6 text-center max-w-[403px]"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              vulputate libero et velit interdum, ac aliquet odio mattis.
            </Typography>
          </div>
          <div className="flex justify-center">
            <Button
              placeholder=""
              onClick={handleOpen}
              className="bg-secondary py-2 px-6  max-w-[132px]"
            >
              <div className="flex justify-center items-center gap-2 text-sm font-light normal-case">
                <Icon icon="ic:sharp-plus" />
                Add Bank
              </div>
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-9 gap-4 p-1 lg:p-3">
            <div className="col-span-9 xl:col-span-7 bg-[#FCFCFD] p-6">
              <Typography
                placeholder=""
                className="text-dark font-bold text-xl pb-6"
              >
                Bank Accounts
              </Typography>
              <div className="grid grid-cols-4 gap-4">
                {banks?.map((bank, idx) => (
                  <div key={idx} className="col-span-4 lg:col-span-1">
                    <BankItem bank={bank} key={idx} />
                  </div>
                ))}

                <div
                  className="hidden lg:flex flex-col justify-center col-span-1 border border-[#F6F4F9]"
                  onClick={handleOpen}
                >
                  <Button
                    placeholder=""
                    className="flex items-center mx-auto bg-secondary rounded-lg w-9 h-9 p-2"
                  >
                    <Icon icon="ic:sharp-plus" className="text-2xl" />
                  </Button>
                  <Typography
                    placeholder=""
                    className="text-lightDark text-sm text-center pt-6"
                  >
                    Add Bank
                  </Typography>
                </div>

                <div
                  className="col-span-4 flex justify-center lg:hidden"
                  onClick={handleOpen}
                >
                  <Button
                    placeholder=""
                    className="flex items-center mx-auto bg-secondary rounded-lg gap-3 p-2 w-[132px] normal-case"
                  >
                    <Icon icon="ic:sharp-plus" className="text-2xl" />
                    <Typography
                      placeholder=""
                      className="text-sm font-bold text-center"
                    >
                      Add Bank
                    </Typography>
                  </Button>
                </div>
              </div>
            </div>

            <div className="col-span-9 xl:col-span-2 bg-[#FCFCFD] p-6">
              <div className="flex gap-6">
                <Typography
                  placeholder=""
                  className="text-dark font-bold text-xl"
                >
                  Instant Payouts
                </Typography>
                <div className="rounded-lg bg-opacity-5 bg-[#FFFCF6] text-[#FFAD32] capitalize px-2 py-1 text-sm xl:text-base flex text-center">
                  Beta
                </div>
              </div>
              <ul className="list-disc text-lightDark pb-2">
                <li className="pb-6">
                  With Instant Payouts, your CDP payments will be deposited to
                  your bank account and available within minutes instead of
                  days.
                </li>
                <li className="pb-6">
                  If your bank is eligible for Instant Payouts, you will see
                  this tag next to the bank:
                  <div className="rounded-lg bg-opacity-5 bg-success text-success capitalize px-2 py-1 text-sm w-fit">
                    Instant Eligible
                  </div>
                </li>
                <li>
                  If this bank is set as your default and you enable Instant
                  Payouts, all future CDP payments will be paid out instantly,
                  minus a fee equal to 1% of the amount paid.
                </li>
              </ul>
              <div className="flex gap-6  pb-6">
                <Typography
                  placeholder=""
                  className="text-dark font-bold text-xl"
                >
                  Instant Payouts
                </Typography>
                <Switch
                  id="custom-switch-component"
                  ripple={false}
                  className="h-full w-full checked:bg-secondary rounded-lg"
                  containerProps={{
                    className: "w-11 h-6",
                  }}
                  circleProps={{
                    className:
                      "before:hidden left-0.5 border-none rounded-md w-5 h-5",
                  }}
                  crossOrigin={undefined}
                />
              </div>
              <ul className="list-disc text-lightDark pb-2">
                <li className="pb-6">
                  You may disable Instant Payouts at any time, but this will
                  only change payments in the future.
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
      <Dialogue open={open} setOpen={setOpen} addBank={addBank} />
    </div>
  );
}
