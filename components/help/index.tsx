"use client";

import React, { useState } from "react";
import CardTemplate from "../custom/CardTemplate";
import { Typography, Collapse } from "@/libraries/material-tailwind";
import { Icon } from "@/libraries/iconify-react";
import { ICON_MAPPER } from "@/utils/constants";

interface FAQItem {
  title: string;
  desc: string;
}

const DATA_ITEM: FAQItem = {
  title:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt?",
  desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac auctor augue mauris augue neque gravida in. Blandit cursus risus at ultrices mi tempus imperdiet. Lacus luctus accumsan tortor posuere ac ut consequat. Interdum consectetur libero id faucibus nisl tincidunt eget nullam non. Cursus risus at ultrices mi. Quam elementum pulvinar etiam non. Blandit cursus risus at ultrices mi tempus imperdiet. Lacus luctus accumsan tortor posuere ac ut consequat. Interdum consect. ",
};

const DATA: FAQItem[] = Array(5).fill(DATA_ITEM);

const HelpPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleOpen = (index: number) =>
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));

  const isLastItem = (index: number) => index === DATA.length - 1;

  return (
    <CardTemplate title="" className="w-full bg-[#FFF]">
      <div className="w-[60%] h-full m-auto">
        <Typography
          placeholder=""
          className="text-dark text-xl xl:text-2xl font-bold"
        >
          FAQs
        </Typography>
        <Typography
          placeholder=""
          className="text-lightDark text-sm xl:text-base pt-4"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac auctor
          augue mauris augue neque gravida in.
        </Typography>
        <div className="pt-6">
          {DATA.map((item, index) => (
            <div
              key={index}
              className={`p-3 cursor-pointer ${
                isLastItem(index) ? "" : "border-b-2 border-[#F8F4FF]"
              } ${index === openIndex ? "bg-[#FCFCFD]" : ""}`}
            >
              <div
                className="flex justify-between items-center"
                onClick={() => toggleOpen(index)}
              >
                <Typography
                  placeholder=""
                  className="text-dark text-xs xl:text-sm font-normal"
                >
                  {item.title}
                </Typography>
                <Icon
                  icon={
                    index === openIndex ? ICON_MAPPER.minus : ICON_MAPPER.plus
                  }
                  className="text-secondary w-6 h-6"
                />
              </div>
              <Collapse open={index === openIndex}>
                <Typography
                  placeholder=""
                  className="text-lightDark text-xs xl:text-sm pt-3 font-normal"
                >
                  {item.desc}
                </Typography>
              </Collapse>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center gap-5 pt-20">
        <Typography
          placeholder=""
          className="text-secondary text-sm xl:text-base font-normal cursor-pointer underline"
        >
          Terms of Service
        </Typography>
        <Typography
          placeholder=""
          className="text-secondary text-sm xl:text-base font-normal cursor-pointer underline"
        >
          Privacy Policy
        </Typography>
      </div>
    </CardTemplate>
  );
};

export default HelpPage;
