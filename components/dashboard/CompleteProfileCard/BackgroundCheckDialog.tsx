"use client";

import React, { useState } from 'react'
import { IComponent } from '@/utils/interfaces';
import { DialogProps } from '@material-tailwind/react'
import {
    Dialog,
    DialogBody,
    IconButton,
    Typography,
    MTInput,
  } from "@/libraries/material-tailwind";
import Loading from '@/components/custom/Loading';
import { Icon } from '@/libraries/iconify-react';
import { ICON_MAPPER } from '@/utils/constants';
import Button from '@/components/custom/buttons/Button';
import api from '@/utils/api';
import { toast } from '@/libraries/react-toastify';
import { getErrorMessage } from '@/utils/functions';

const LIST_CRIMINAL_SEARCH = [
    {
        id: 1,
        label: "Records with less-than-misdemeanor severity",
    },
    {
        id: 2,
        label: "Records when you were under 18",
    },
    {
        id: 3,
        label: "Misdemeanor:",
    },
    {
        id: 4,
        label: "Deferred / alternative adjudication records",
    },
    {
        id: 5,
        label: "Marijuana possession records",
    },
    {
        id: 6,
        label: "Vehicles & traffic records",
    },
    {
        id: 7,
        label: "Public nuisance records",
    },
    {
        id: 8,
        label: "Alcohol & Tobacco",
    },
    {
        id: 9,
        label: "Marijuana Possession/Use",
    },
    {
        id: 10,
        label: "Driving under the Influence (DUI)",
    },
]

interface IProps extends IComponent {
    backgroundCheck: boolean;
    setBackgroundCheck: Function;
    size: DialogProps["size"];
  }

export default function BackgroundCheckDialog({
    backgroundCheck,
    setBackgroundCheck,
    size = "md"
} : IProps) {

    const handler = () => {
        setBackgroundCheck(!backgroundCheck);
      };

    let loading = false;

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
      open={backgroundCheck}
      size={size}
      className="h-[80%] overflow-y-auto"
    >
       {loading ? (
        <Loading />
      ) : (
        <DialogBody placeholder="">
          <div className="hidden ss:flex justify-end">
            <IconButton
              placeholder=""
              className="text-2xl text-lightDark w-8 h-8"
              variant="text"
              onClick={handler}
            >
              <Icon icon={ICON_MAPPER.close} />
            </IconButton>
          </div>
          <div className="p-2 sm:px-10 xl:px-20">
            <div className="flex justify-between items-center">
              <Typography
                placeholder=""
                className="text-xl ss:2xl md:text-3xl lg:text-4xl text-dark font-bold"
              >
                Complete A Background Check
              </Typography>
            </div>
            <div className="flex flex-col gap-3 pt-4">
              <Typography
                placeholder=""
                className="text-xs md:text-sm font-normal text-lightDark"
              >
                Increase your marketability with a background check badge
              </Typography>
            </div>
            <div className="flex flex-col gap-3 pt-4">
              <Typography
                placeholder=""
                className="text-2xl text-dark font-bold"
              >
                James Mann
              </Typography>
            </div>

            <div className="flex flex-col gap-2 pt-4">
              <Typography
                placeholder=""
                className="text-base font-medium flex text-dark items-center"
              >
                <Icon icon={ICON_MAPPER.circleFilledCheck} className='text-success text-3xl' />
                <p className='pl-2'>Unlock the background check badge for your profile</p>
              </Typography>
              <Typography
                placeholder=""
                className="text-base font-medium flex text-dark items-center"
              >
                <Icon icon={ICON_MAPPER.circleFilledCheck} className='text-success text-3xl' /> 
                <p className='pl-2' >Increase the number of offices you are eligible to work for</p>
              </Typography>
              <Typography
                placeholder=""
                className="text-base font-medium flex text-dark items-center"
              >
                <Icon icon={ICON_MAPPER.circleFilledCheck} className='text-success text-3xl' /> 
                <p className='pl-2'>Includes:</p>
              </Typography>

              <div className='pl-9'>
                <Typography
                    placeholder=""
                    className="text-base font-medium flex text-lightDark items-center "
                >
                    <Icon icon={ICON_MAPPER.check} /> 
                    <p className='pl-2'>SSN Trace</p>
                </Typography>
                <Typography
                    placeholder=""
                    className="text-base font-medium flex text-lightDark items-center"
                >
                    <Icon icon={ICON_MAPPER.check} /> 
                    <p className='pl-2'>National Criminal Search</p>
                </Typography>

                <div className='pl-8'>
                    {LIST_CRIMINAL_SEARCH.map((e) =>(
                    <Typography
                        key={e.id}
                        placeholder=""
                        className="text-base font-medium flex text-lightDark items-center"
                    >
                        <li className='pl-2'>{e.label}</li>
                    </Typography>
                    )
                    )}
                </div>

                <Typography
                    placeholder=""
                    className="text-base font-medium flex text-lightDark items-center"
                >
                    <Icon icon={ICON_MAPPER.check} /> 
                    <p className='pl-2'>Sex Offender Search</p>
                </Typography>
                <Typography
                    placeholder=""
                    className="text-base font-medium flex text-lightDark items-center"
                >
                    <Icon icon={ICON_MAPPER.check} /> 
                    <p className='pl-2'>Global Watchlist Search</p>
                </Typography>
                <Typography
                    placeholder=""
                    className="text-base font-medium flex text-lightDark items-center"
                >
                    <Icon icon={ICON_MAPPER.check} /> 
                    <p className='pl-2'>Terrorist Watchlist Search</p>
                </Typography>

              </div>
              <Typography
                placeholder=""
                className="text-base font-medium flex text-dark items-center"
              >
                <Icon icon={ICON_MAPPER.circleFilledCheck} className='text-success text-3xl' /> 
                <p className='pl-2'>CLEAR checks are valid for 1 year from the date of issue</p>
              </Typography>
              
            <div className="flex flex-col gap-3 pt-4">
              <Typography
                placeholder=""
                className="text-2xl text-dark font-bold"
              >
                $15.00
              </Typography>
            </div>
            <div className="flex flex-col gap-3 pt-2">
              <Typography
                placeholder=""
                className="text-xs md:text-sm font-normal text-lightDark"
              >
                By continuing, you agree to a background check and are purchasing the Background Check Badge for your Cloud 
                Dentistry profile. The Background Check Badge will only be displayed if your background check is deemed CLEAR 
                according to the rules above. No refunds are issued for failed or incomplete background checks.
              </Typography>
            </div>
        </div>
        </div>
            <div className="px-10 xl:px-20 pb:10 xl:pb-20 pt-6">
                <Typography
                    placeholder=""
                    variant="h2"
                    className="text-2xl font-bold text-dark"
                >   
                    Payment Details
                </Typography>
                <Typography placeholder="" className="text-base text-lightDark pb-2 pt-3">
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
          </div>
        </DialogBody>
      )}
    </Dialog>
  )
}

