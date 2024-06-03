"use client";

import React, { ChangeEvent, useState, useEffect } from "react";
import Button from "@/components/custom/buttons/Button";
import Input from "@/components/custom/Input";
import Select from "@/components/custom/Select";
import Checkbox from "@/components/custom/Checkbox";
import { IComponent } from "@/utils/interfaces";
import { Icon } from "@/libraries/iconify-react";
import { ICON_MAPPER } from "@/utils/constants";
import {
  Dialog,
  DialogBody,
  IconButton,
  Typography,
} from "@/libraries/material-tailwind";
import type { DialogProps } from "@/libraries/material-tailwind";
import api from "@/utils/api";
import { toast } from "react-toastify";
import { getErrorMessage } from "@/utils/functions";
import Loading from "@/components/custom/Loading";
import { useUser } from "@/contexts/UserContext";

interface IProps extends IComponent {
  listSkillsDialog: boolean;
  setListSkillsDialog: Function;
  size: DialogProps["size"];
}

interface IDentalVisionLevel {
  id: number;
  level: string;
}

interface ISkill {
  id: number;
  title: string;
  level: {
    id: number;
    title: string;
  };
}

const DENTAL_VISION_LEVEL: IDentalVisionLevel[] = [
  {
    id: 1,
    level: "Begineer",
  },
  {
    id: 2,
    level: "Intermediate",
  },
  {
    id: 3,
    level: "Advanced",
  },
  {
    id: 4,
    level: "Professional",
  },
];

export default function ListSkillsDialog({
  listSkillsDialog,
  setListSkillsDialog,
  size = "md",
}: IProps) {
  const handler = () => {
    setListSkillsDialog(!listSkillsDialog);
  };

  const [loading, setLoading] = useState<boolean>(false);
  const { userData, setUserData } = useUser();

  useEffect(() => {
    setLoading(true);
    api
      .get("/user/get/profile/skills")
      .then((res) => {
        setLoading(false);
        setSkills(res.data);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(getErrorMessage(err));
      });
  }, []);

  const handleNext = () => {
    setLoading(true);
    api
      .post("/user/save/profile/skills", skills)
      .then((res) => {
        setLoading(false);
        let tempUserData = userData;
        Object(tempUserData?.verifyData).skillsAdded = true;
        setUserData(tempUserData);
        toast.success("Saved successfully");
        setListSkillsDialog(!listSkillsDialog);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(getErrorMessage(err));
      });
  };

  const [skills, setSkills] = useState<ISkill[]>([]);
  const [newSkill, setNewSkill] = useState<string>("");
  const [level, setLevel] = useState<string>(DENTAL_VISION_LEVEL[0].level);

  const handleAdd = () => {
    const trimmedNewSkill = newSkill.trim();
    if (trimmedNewSkill === "") {
      return;
    }
    const skillExists = skills.some(
      (skill) => skill.title.toLowerCase() === trimmedNewSkill.toLowerCase()
    );
    if (skillExists) {
      toast.error("That already exists.");
    } else {
      const newSkillItem: ISkill = {
        id: skills.length + 1,
        title: trimmedNewSkill,
        level: {
          id: 1,
          title: "Beginner",
        },
      };
      setSkills([...skills, newSkillItem]);
      setNewSkill("");
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewSkill(e.target.value);
  };
  const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  const handleDelete = (id: number) => {
    const updatedSkills = skills.filter((skill) => skill.id !== id);
    setSkills(updatedSkills);
  };

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setLevel(e.target.value);
  };

  return (
    <Dialog
      placeholder=""
      handler={handler}
      open={listSkillsDialog}
      size={size}
      className="h-[60%] overflow-y-auto"
    >
      <DialogBody placeholder="">
        {loading ? (
          <Loading />
        ) : (
          <>
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
                  List Your Skills
                </Typography>
                <Icon
                  icon={ICON_MAPPER.close}
                  className="flex text-dark font-bold text-xl ss:hidden cursor-pointer"
                  onClick={handler}
                />
              </div>
              <div className="flex flex-col gap-6 pt-4">
                <Typography
                  placeholder=""
                  className="text-xs md:text-sm font-normal text-lightDark"
                >
                  Practices want to know what YOU know: specific practice
                  management software, digital imaging, dental tech/equipment
                  and skills related to a specialty.
                </Typography>
                <Typography
                  placeholder=""
                  className="text-xs md:text-sm font-normal text-lightDark"
                >
                  Type your skills below and click a matching result to add it
                  to your list. Include as many skills as you have.
                </Typography>
                <Input
                  id="text"
                  name="skills"
                  label="Type Your Skills"
                  placeholder={skills.length ? "" : "Type your skills here"}
                  value={newSkill}
                  onChange={handleInputChange}
                  onKeyPress={handleInputKeyPress}
                  startAdornment={
                    skills.length > 0
                      ? skills.map((item) => (
                        <div
                          key={item.id}
                          className={`rounded-lg bg-opacity-5 capitalize px-2 py-1 text-sm xl:text-base flex items-center bg-primary text-dark font-normal text-center w-fit`}
                        >
                          <div className="flex items-center gap-2">
                            <Typography placeholder="">
                              {item.title}
                            </Typography>
                            <Icon
                              icon={ICON_MAPPER.close}
                              onClick={() => handleDelete(item.id)}
                              className="cursor-pointer"
                            />
                          </div>
                        </div>
                      ))
                      : null
                  }
                />
              </div>

              <div className="pt-6">
                <Checkbox
                  name="isReadPolicy"
                  color="secondary"
                  label="I am currently a student in a dental program for General Dentist"
                />
              </div>
              <div className="w-full flex items-center gap-5 pt-4">
                <Typography placeholder="" className="text-dark font-bold">
                  Dental Vision
                </Typography>
                <div className="flex-grow">
                  <Select
                    value={level}
                    onChange={handleSelect}
                    className="w-full bg-gray-200"
                  >
                    {DENTAL_VISION_LEVEL.map((item) => (
                      <option key={item.id} value={item.level}>
                        {item.level}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>
              <div className="w-full rounded-lg">
                <div className="flex justify-end pt-2">
                  <Button
                    variant="filled"
                    color="secondary"
                    className="py-2 px-8 text-sm"
                    onClick={handleNext}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </DialogBody>
    </Dialog>
  );
}
