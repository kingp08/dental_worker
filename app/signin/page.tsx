"use client";
import Image from "next/image";
import Link from "next/link";
import LeftSection from "@/components/layout/AuthLayout/LeftSection";
import { Typography } from "@/libraries/material-tailwind";
import SigninForm from "@/components/signin/SigninForm";
import { PATH_MAPPER } from "@/utils/constants";
import { useState } from "react";
import Loading from "@/components/custom/Loading";

export default function SigninPage() {
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <>
      <LeftSection className="hidden md:flex flex-col justify-center items-center gap-4">
        <div className="flex flex-col items-center gap-4 relative z-4">
          <Image
            src="/assets/images/logo-white.png"
            width={54}
            height={54}
            className="w-auto h-auto"
            alt=""
            priority={true}
          />
          <Typography
            variant="h1"
            placeholder=""
            className="text-white text-3xl font-extrabold text-center"
          >
            Dental Jobs
          </Typography>
        </div>
        <div className="relative">
          <Image
            src="/assets/images/calendar.png"
            width={383}
            height={406}
            className="w-auto h-auto"
            alt=""
          />
          <Image
            src="/assets/images/comment-of-calendar.png"
            width={260}
            height={100}
            className="w-auto h-auto absolute top-[11%] -right-[41%]"
            alt=""
          />
        </div>
        <Typography
          placeholder=""
          className="text-center text-gray-200 font-semibold text-lg"
        >
          Habitasse leo mi enim condimentum rhoncus. Sed non tortor gravida .
        </Typography>
      </LeftSection>

      <section className="col-span-2 md:col-span-1 flex flex-col items-center justify-center py-16 z-10 bg-[#F5F7F9] h-screen overflow-auto">
        {loading ? (
          <Loading />
        ) : (
          <>
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
            <div className="w-full p-8 md:p-0 md:w-1/2 flex flex-col items-center gap-10">
              <Typography
                placeholder=""
                variant="h2"
                className="font-bold text-xl md:text-3xl text-center text-dark"
              >
                Login
              </Typography>
              <SigninForm setLoading={setLoading} />
              <Typography
                placeholder=""
                className="text-lightDark font-semibold text-center pb-16"
              >
                Haven&apos;t created your free account?
                <br />
                <Link href={PATH_MAPPER.dentalSigup} className="text-secondary">
                  Sign up Dental Office
                </Link>{" "}
                or{" "}
                <Link href={PATH_MAPPER.signup} className="text-secondary">
                  Dental Professional
                </Link>
              </Typography>
            </div>
          </>
        )}
      </section>
    </>
  );
}
