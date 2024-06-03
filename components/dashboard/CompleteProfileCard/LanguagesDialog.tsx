"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import Button from "@/components/custom/buttons/Button";
import Select from "@/components/custom/Select";
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
import Loading from "@/components/custom/Loading";
import { getErrorMessage } from "@/utils/functions";
import { toast } from "react-toastify";
import { useUser } from "@/contexts/UserContext";

interface IProps extends IComponent {
  languagesDialog: boolean;
  setLanguagesDialog: Function;
  size: DialogProps["size"];
}

interface ILanguageItem {
  id: string;
  level: number;
}

interface ILanguageName {
  id: number,
  title: string,
}

const levels = [
  {
    level: 11,
    name: "Beginer",
  },
  {
    level: 12,
    name: "Intermediate",
  },
  {
    level: 13,
    name: "Advanced",
  },
  {
    level: 14,
    name: "Professional",
  },
];

export default function LanguagesDialog({
  languagesDialog,
  setLanguagesDialog,
  size = "md",
}: IProps) {
  const handler = () => {
    setLanguagesDialog(!languagesDialog);
  };

  const [loading, setLoading] = useState<boolean>(false);
  const [langNames, setLangNames] = useState<
    Array<{ id: string; title: string }>
  >([]);
  const [languages, setLanguages] = useState<Array<ILanguageItem>>([]);
  const { userData, setUserData } = useUser();

  useEffect(() => {
    (async () => {
      setLoading(true);
      await api
        .get("/get/common/datas/lang")
        .then((res) => {
          res.data.sort((A: ILanguageName, B: ILanguageName) => { return A.id - B.id});
          setLangNames(res.data);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          toast.error(getErrorMessage(err));
        });

      await api
        .get("/user/get/profile/languages")
        .then((res) => {
          setLanguages(res.data);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          toast.error(getErrorMessage(err));
        });
    })();
  }, []);

  const handleDone = () => {
    const requestData = { languages: languages };
    api
      .post("/user/save/profile/languages", requestData) 
      .then(() => {
        setLoading(false);
        let tempUserData = userData;
        Object(tempUserData?.verifyData).languageAdded = true;
        setUserData(tempUserData);
        toast.success("Uploaded successfully.");
        setLanguagesDialog(!languagesDialog);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(getErrorMessage(err));
      });
  };

  const handleSelectLanguageName = (
    e: ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {

    const langId = e.target.value;
    setLanguages((prev) => {
      const prevLangs = [...prev];
      prevLangs[index].id = langId;
      return prevLangs;
    });
  };

  const handleSelectLevel = (
    e: ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    const newLevel = e.target.value ;

    setLanguages((prev) => {
      const prevLangs = [...prev];
      prevLangs[index].level = Number(newLevel);
      return prevLangs;

    })
  };

  const handleDeleteLanguage = (index: number) => {
    setLanguages((prev) => {
      const prevLanguages = [...prev];
      prevLanguages.splice(index, 1);

      return prevLanguages;
    });
  };

  const handleAddLanguage = () => {
    setLanguages((prev) => [
      ...prev,
      {
        id: langNames[0].id,
        level: levels[0].level,
      },
    ]);
  };

  return (
    <Dialog placeholder="" handler={handler} open={languagesDialog} size={size}>
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
                  Languages You Speak
                </Typography>
                <Icon
                  icon={ICON_MAPPER.close}
                  className="flex text-dark font-bold text-xl ss:hidden cursor-pointer"
                  onClick={handler}
                />
              </div>
              <div className="flex flex-col gap-4 pt-4">
                <Typography
                  placeholder=""
                  className="text-xs md:text-sm font-normal text-lightDark"
                >
                  Practices love professionals who are multilingual, it helps
                  everyone when the patient feels comfortable and understood.
                  Gracias! Merci! Danke!
                </Typography>
                {languages.map((language, index) => (
                  <div key={language.id} className="flex items-center gap-3">
                    <div className="grid grid-cols-2 gap-3 w-full">
                      <Select
                        className="w-full bg-gray-200"
                        value={language.id}
                        onChange={(e) => handleSelectLanguageName(e, index)}
                      >
                        {langNames.map((lang) => (
                          <option key={lang.id} value={lang.id}>
                            {lang.title}
                          </option>
                        ))}
                      </Select>

                      <Select
                        className="w-full bg-gray-200"
                        value={language.level}
                        onChange={(e) => handleSelectLevel(e, index)}
                      >
                        {levels.map((levelItem) => (
                          <option key={levelItem.level} value={levelItem.level}>
                            {levelItem.name}
                          </option>
                        ))}
                      </Select>
                    </div>

                    <IconButton
                      placeholder=""
                      className="w-5 h-5 text-xl"
                      variant="text"
                      onClick={() => handleDeleteLanguage(index)}
                    >
                      <Icon icon={ICON_MAPPER.delete} />
                    </IconButton>
                  </div>
                ))}

                <div>
                  <Button
                    variant="text"
                    color="secondary"
                    className="flex items-center gap-2"
                    onClick={handleAddLanguage}
                  >
                    <Icon icon={ICON_MAPPER.plus} />
                    Add language
                  </Button>
                </div>
              </div>

              <div className="w-full rounded-lg mt-3">
                <div className="flex justify-end pt-2">
                  <Button
                    variant="filled"
                    color="secondary"
                    className="py-2 px-8 text-sm"
                    onClick={handleDone}
                  >
                    Done
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
