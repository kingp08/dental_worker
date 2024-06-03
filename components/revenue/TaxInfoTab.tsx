"use client";

import React from "react";
import Image from "next/image";
import {
  Typography,
  Dialog,
  Card,
  CardBody,
  Button,
} from "@/libraries/material-tailwind";
import { Icon } from "@/libraries/iconify-react";

export default function TaxInfo() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <div className="flex flex-col gap-6 lg:pl-5">
      <div className="justify-between grid grid-cols-12 gap-2 p-2 lg:pr-6 bg-[#FCFCFD] rounded-lg">
        <div className="col-span-6 lg:col-span-3">
          <Image
            src="/assets/images/bankLogo1.png"
            width={170}
            height={100}
            alt="stripe"
            className=""
          />
        </div>
        <div className="block lg:hidden col-span-6">
          <div className="flex flex-col gap-2 items-center">
            <Typography
              placeholder=""
              className="text-lightDark text-xs font-semibold text-center"
            >
              Current status with Stripe:
            </Typography>
            <div className="rounded-lg bg-opacity-5 bg-success text-success capitalize px-2 py-1 text-xs xl:text-base flex w-fit">
              Information needed
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-6">
          <Typography
            placeholder=""
            className="text-lightDark text-sm font-semibold pb-4"
          >
            Dental Jobs uses Stripe to collect fees from offices and to deposit
            payment into your bank account.
          </Typography>
          <Typography
            placeholder=""
            className="text-lightDark text-sm font-semibold pb-4"
          >
            It also prepares your 1099 form which documents your earnings
            through Dental Jobs.
          </Typography>
          <Typography
            placeholder=""
            className="text-lightDark text-sm font-semibold pb-4"
          >
            In order to prepare your 1099, Stripe needs information about you,
            like your name, tax ID, address, etc. The more you earn on Dental
            Jobs, the more information Stripe is required to provide to the IRS,
            so it may request additional information in the future.
          </Typography>
          <Typography
            placeholder=""
            className="text-lightDark text-sm font-semibold pb-4"
          >
            Learn more about Stripe&apos;s identity verification process{" "}
            <span className="text-secondary">here</span>
          </Typography>
          <div className="pt-6 flex justify-center lg:hidden">
            <button className="bg-secondary rounded-md text-white py-2 px-6">
              Visit Stripe Verification Center{" "}
            </button>
          </div>
        </div>
        <div className="hidden lg:block col-span-3">
          <div className="flex justify-end gap-2 items-center">
            <Typography
              placeholder=""
              className="text-lightDark text-sm font-semibold"
            >
              Current status with Stripe:
            </Typography>
            <div className="rounded-lg bg-opacity-5 bg-success text-success capitalize px-2 py-1 text-sm xl:text-base flex w-fit">
              Information needed
            </div>
          </div>
          <div className="pt-6 flex justify-end">
            <button className="bg-secondary rounded-md text-white py-2 px-6">
              Visit Stripe Verification Center{" "}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-2 p-2 bg-[#FCFCFD] rounded-lg">
        <div className="col-span-12 lg:col-span-3">
          <Typography
            placeholder=""
            className="text-dark font-bold text-lg pb-4"
          >
            Additional resources:
          </Typography>
        </div>
        <div className="col-span-12 lg:col-span-6">
          <Typography
            placeholder=""
            className="text-lightDark text-sm font-semibold"
          >
            As an independent Contractor (1099), you may be eligible for a
            significant tax deduction for the travel between your home and the
            dental offices where you&apos;ve temp&apos;d.
          </Typography>
        </div>
        <div className="col-span-12 lg:col-span-3">
          <div className="flex justify-center lg:justify-end">
            <button
              className="bg-secondary rounded-md text-white py-2 px-6"
              onClick={handleOpen}
            >
              2023 Estimates to date
            </button>
          </div>
          <Dialog
            placeholder=""
            open={open}
            handler={handleOpen}
            animate={{
              mount: { scale: 1, y: 0 },
              unmount: { scale: 0.9, y: -100 },
            }}
          >
            <Card placeholder="" className="mx-auto w-full">
              <CardBody placeholder="" className="flex flex-col gap-4 p-20">
                <Typography
                  placeholder=""
                  className="text-4xl text-dark font-bold text-center py-9"
                >
                  2023 Travel Estimates To Date
                </Typography>
                <Typography
                  placeholder=""
                  className="text-base font-normal text-lightDark py-2"
                >
                  In 2023, Dental Jobs&apos;s records show that you completed 0
                  bookings as an independent contractor.
                </Typography>
                <Typography
                  placeholder=""
                  className="text-base font-normal text-lightDark"
                >
                  Click &quot;Send my Estimates&quot; below and we&apos;ll send
                  you an email with each booking completed, the date, and the
                  estimated round-trip between your address at the time and the
                  office address.
                </Typography>
                <div className="flex justify-center">
                  <Button
                    placeholder=""
                    variant="filled"
                    className="bg-secondary"
                    onClick={handleOpen}
                  >
                    Send my Estimates
                  </Button>
                </div>
              </CardBody>
            </Card>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-2 p-2 lg:pr-6">
        <div className="col-span-6 lg:col-span-3">
          <Image
            src="/assets/images/bankLogo2.png"
            width={170}
            height={75}
            alt="stripe"
            className=""
          />
        </div>
        <div className="flex justify-end items-center lg:hidden col-span-6 mr-4">
          <Icon icon="entypo:export" className="text-secondary text-lg" />
        </div>
        <div className="col-span-12 lg:col-span-6">
          <Typography
            placeholder=""
            className="text-lightDark text-sm font-semibold pt-1"
          >
            Keeper is a tax-filing and expense-tracking software designed for
            people with business income, like you.
          </Typography>
          <Typography
            placeholder=""
            className="text-lightDark text-sm font-semibold pb-4"
          >
            Save 50%... Use our link and pay only $79 per year.
          </Typography>
          <div className="flex gap-7">
            <Typography
              placeholder=""
              className="text-lightDark text-sm font-semibold pb-4"
            >
              Features
            </Typography>
            <ul className="list-disc text-lightDark pb-2">
              <li className="">
                Connect your bank for instant personalization & tax breaks.
              </li>
              <li className="">
                Automatically uncovers tax write-offs among your past
                transactions.
              </li>
              <li className="">
                At tax time, file directly through the Keeper app with the IRS &
                all 50 states.
              </li>
              <li className="">
                Supports W2, 1099, investment, and other income types.
              </li>
              <li className="">
                Supports 300+ types of credits, and deductions.
              </li>
              <li className="">Smart audit protection & accuracy guarantee.</li>
              <li className="">
                An assigned in-app tax assistant answers your questions.
              </li>
              <li className="">No upsells, ever.</li>
            </ul>
          </div>
        </div>
        <div className="hidden lg:block col-span-3">
          <div className="flex justify-end">
            <Icon icon="entypo:export" className="text-secondary text-3xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
