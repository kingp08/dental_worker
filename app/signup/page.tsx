"use client";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import LeftSection from "@/components/layout/AuthLayout/LeftSection";
import Signup from "@/components/signup/Signup";
import { Typography } from "@/libraries/material-tailwind";
import { L_STORAGE_AUTH_TOKEN } from "@/utils/constants";

export default function SignupPage() {
  const [authToken, setAuthToken] = useState<string>("");

  useEffect(() => {
    setAuthToken(
      localStorage.getItem(L_STORAGE_AUTH_TOKEN) ||
        sessionStorage.getItem(L_STORAGE_AUTH_TOKEN) ||
        ""
    );
  }, []);

  if (authToken) return redirect("/dashboard");

  return (
    <>
      <LeftSection className="hidden md:flex flex-col justify-center items-center">
        <div className="flex flex-col items-center gap-4 relative">
          <Image
            src="/assets/images/initialLogo.png"
            width={81}
            height={81}
            alt=""
            priority={true}
          />
          <Image
            src="/assets/images/letterLogo.png"
            width={202.5}
            height={27}
            alt=""
            priority={true}
          />
        </div>
        <div className="relative flex flex-col items-center gap-4 w-2/3 mt-48">
          <Image
            src="/assets/images/calendar.png"
            alt=""
            width={383}
            height={406}
            className="w-auto h-auto"
            priority={true}
          />
          <Typography
            placeholder=""
            className="text-center text-gray-200 font-semibold text-lg"
          >
            Habitasse leo mi enim condimentum rhoncus. Sed non tortor gravida .
          </Typography>
          <Image
            className="absolute -top-[145px] -right-24 w-auto h-auto bg-white rounded-lg"
            src="/assets/images/scheduleImg.png"
            alt=""
            width={312}
            height={177}
          />
        </div>
      </LeftSection>

      <section className="col-span-2 md:col-span-1 flex flex-col items-center py-16 z-10 bg-[#F5F7F9] h-screen overflow-auto">
        <div className="flex flex-col items-center pb-6 md:hidden">
          <Image
            src="/assets/images/logo_purple.png"
            width={26}
            height={26}
            alt=""
            priority={true}
          />
          <Image
            src="/assets/images/letter_logo_purple.png"
            width={64}
            height={8.7}
            alt=""
            priority={true}
          />
        </div>
        <div className="w-full p-8 md:p-0 md:w-2/3 flex flex-col gap-12">
          <Typography
            placeholder=""
            variant="h2"
            className="font-bold text-xl md:text-3xl text-center text-dark"
          >
            Professional Registration
          </Typography>
          <div className="flex flex-col gap-2">
            <Typography placeholder="" className="text-lightDark text-xs">
              If you are a dental practice looking to hire, click{" "}
              <Link href="#" className="text-secondary font-semibold">
                here
              </Link>{" "}
              to register.
            </Typography>

            <Typography placeholder="" className="text-lightDark text-xs">
              Please enter your full name and contact information. We will never
              sell your information and it will only be used as part of our
              service. In order to approve your profile, we will need to verify
              your contact information. We may also contact you to help you
              complete your application. If you would like to set up a meeting
              now, please{" "}
              <Link href="#" className="text-secondary font-semibold">
                Schedule a time
              </Link>{" "}
              to speak with us.
            </Typography>
          </div>

          <Signup />
        </div>
      </section>
    </>
  );
}
