import React, { ChangeEvent, useEffect, useState } from "react";
import { IComponent } from "@/utils/interfaces";
import TabButton from "../../../../custom/buttons/TabButton";
import Select from "../../../../custom/Select";
import Button from "@/components/custom/buttons/Button";
import { Icon } from "@/libraries/iconify-react";
import { ICON_MAPPER } from "@/utils/constants";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  IconButton,
  Avatar,
  Typography,
} from "@/libraries/material-tailwind";
import type { DialogProps } from "@/libraries/material-tailwind";
import api from "@/utils/api";
import { toast } from "react-toastify";
import { getErrorMessage } from "@/utils/functions";

interface IProps extends IComponent {
  officesDialogOpened: boolean;
  setOfficesDialogOpened: Function;
  size: DialogProps["size"];
}

interface Office {
  id: string;
  avatar: string;
  name: string;
  travelRadius: string;
  address: string;
  isFavorite: boolean;
  isBlocked: boolean;
  addedToFav?: string;
  addedToblock?: string;
  skills?: string[];
  ppeProvided?: string[];
}

const SORT_BY = [
  {
    id: 1,
    label: "Name",
  },
  {
    id: 2,
    label: "Distance",
  },
  {
    id: 3,
    label: "Date Blocked",
  },
];

export default function OfficesDialog({
  officesDialogOpened,
  setOfficesDialogOpened,
  size = "lg",
}: IProps) {
  const handler = () => {
    setOfficesDialogOpened(!officesDialogOpened);
  };

  const [activeTab, setActiveTab] = useState<string>("All offices");
  const [selectedOffice, setSelectedOffice] = useState<Office | null>(null);
  const [sortBy, setSortBy] = useState<string>("Sort by");

  const handleSortBy = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  const [offices, setOffices] = useState<Office[]>([]);

  const getFilteredOffices = () => {
    if (activeTab === "Favorite Offices") {
      return offices.filter((office) => office.isFavorite);
    } else if (activeTab === "Blocked Offices") {
      return offices.filter((office) => office.isBlocked);
    } else {
      return offices;
    }
  };

  const filteredOffices = getFilteredOffices();

  useEffect(() => {
    setOffices([]);

    if (activeTab === "Favorite Offices") {
      api
        .post("/professional/offices/favorite")
        .then((res) => {
          setOffices(res.data.offices);
        })
        .catch((err) => {
          toast.error(getErrorMessage(err));
        });
    } else if (activeTab === "Blocked Offices") {
      api
        .post("/professional/offices/blocked")
        .then((res) => {
          setOffices(res.data.offices);
        })
        .catch((err) => {
          toast.error(getErrorMessage(err));
        });
    } else {
      api
        .post("/professional/offices/all")
        .then((res) => {
          setOffices(res.data.offices);
        })
        .catch((err) => {
          toast.error(getErrorMessage(err));
        });
    }
  }, [activeTab]);

  const handleOfficeItem = (office: Office) => () => {
    setSelectedOffice(office);
  };
  const closeSelectedOfficeDialog = (e: any) => {
    // e.stopPropagation();
    setSelectedOffice(null);
  };

  const handleBlockOffice = async (id: string, isBlocked: boolean) => {
    await api
      .post("/professional/office/set/blocked", { id, isBlocked: !isBlocked })
      .then((res) => {
        if (res.data.success) {
          toast.success("Success");
        }
      });

    setOffices((offices) =>
      offices.map((office) => {
        if (office.id === id) {
          return {
            ...office,
            isBlocked: !isBlocked,
          };
        }
        return office;
      })
    );
  };

  const handleFavoriteOffice = async (id: string, isFavorite: boolean) => {
    await api
      .post("/professional/office/set/favorites", {
        id,
        isFavorite: !isFavorite,
      })
      .then((res) => {
        if (res.data.success) {
          toast.success("Success");
        }
      });

    setOffices((offices) =>
      offices.map((office) => {
        if (office.id === id) {
          return {
            ...office,
            isFavorite: !isFavorite,
          };
        }
        return office;
      })
    );
  };

  return (
    <>
      <Dialog
        placeholder=""
        handler={() => { }}
        open={officesDialogOpened}
        size={size}
        className="h-[95%] overflow-y-auto cursor-pointer"
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
          <Typography
            placeholder=""
            className="text-3xl text-dark font-bold  pb-8"
          >
            Offices
          </Typography>
          <div className=" block md:flex justify-between">
            <div className="flex flex-col gap-4 pb-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <TabButton
                    className="font-semibold"
                    isActive={activeTab === "All offices"}
                    onClick={() => setActiveTab("All offices")}
                  >
                    All offices
                  </TabButton>
                  <TabButton
                    className="font-semibold"
                    isActive={activeTab === "Favorite Offices"}
                    onClick={() => setActiveTab("Favorite Offices")}
                  >
                    Favorite Offices
                  </TabButton>
                  <TabButton
                    className="font-semibold"
                    isActive={activeTab === "Blocked Offices"}
                    onClick={() => setActiveTab("Blocked Offices")}
                  >
                    Blocked Offices
                  </TabButton>
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <Select value={sortBy} onChange={handleSortBy}>
                {SORT_BY.map((item) => (
                  <option key={item.id} value={item.label}>
                    {item.label}
                  </option>
                ))}
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-10 gap-4">
            {filteredOffices.map((office, index) => (
              <div
                key={index}
                className="col-span-10 md:col-span-5 lg:col-span-2 bg-[#FCFCFD] rounded-lg p-4 flex flex-col"
                onClick={handleOfficeItem(office)}
              >
                <div className="flex justify-between">
                  <Avatar
                    variant="rounded"
                    src={office.avatar}
                    alt=""
                    width={46}
                    height={46}
                    placeholder=""
                  />
                  <Icon
                    icon={
                      office.isFavorite
                        ? ICON_MAPPER.heart
                        : ICON_MAPPER.heartOutlined
                    }
                    className="text-pink-600 text-xl"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFavoriteOffice(office.id, office.isFavorite);
                    }}
                  />
                </div>
                <div className="flex flex-grow items-center">
                  <Typography
                    placeholder=""
                    className="text-lg text-dark font-bold"
                  >
                    {office.name}
                  </Typography>
                </div>
                <div className="flex gap-2 items-center pt-3">
                  <Icon
                    icon={ICON_MAPPER.car}
                    className="text-lightDark text-base"
                  />
                  <Typography
                    placeholder=""
                    className="text-xs text-lightDark font-normal"
                  >
                    {office.travelRadius}
                  </Typography>
                </div>
                <div className="flex gap-2 items-center pt-3">
                  <Icon
                    icon={ICON_MAPPER.location}
                    className="text-lightDark text-base"
                  />
                  <Typography
                    placeholder=""
                    className="text-xs text-lightDark font-normal"
                  >
                    {office.address}
                  </Typography>
                </div>
                {activeTab === "Favorite Offices" ? (
                  <div className="flex gap-2 items-center pt-3">
                    <Icon
                      icon={ICON_MAPPER.heart}
                      className="text-lightDark text-base"
                    />
                    <Typography
                      placeholder=""
                      className="text-xs text-lightDark font-normal"
                    >
                      Added to favourites : {office.addedToFav}
                    </Typography>
                  </div>
                ) : activeTab === "Blocked Offices" ? (
                  <div className="flex gap-2 items-center pt-3">
                    <Icon
                      icon={ICON_MAPPER.blocked}
                      className="text-lightDark text-base"
                    />
                    <Typography
                      placeholder=""
                      className="text-xs text-lightDark font-normal"
                    >
                      Added to Blocked : {office.addedToblock}
                    </Typography>
                  </div>
                ) : (
                  ""
                )}
                {activeTab === "Blocked Offices"}
                <div className="flex justify-center pt-2">
                  <Button
                    variant="filled"
                    color="secondary"
                    className="w-full py-1 text-xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBlockOffice(office.id, office.isBlocked);
                    }}
                  >
                    {office.isBlocked ? "Unblock" : "Block"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </DialogBody>
      </Dialog>
      {selectedOffice && (
        <Dialog
          placeholder=""
          open={!!selectedOffice}
          handler={closeSelectedOfficeDialog}
          size="md"
        >
          <DialogHeader placeholder="" className="flex justify-end pt-4 ">
            <IconButton
              placeholder=""
              className="text-2xl text-lightDark w-8 h-8"
              variant="text"
              onClick={closeSelectedOfficeDialog}
            >
              <Icon icon={ICON_MAPPER.close} />
            </IconButton>
          </DialogHeader>
          <DialogBody
            placeholder=""
            className="px-10 xl:px-20 pb:10 xl:pb-20 pt-0"
          >
            <div className="flex items-center justify-between">
              <div className="flex gap-3">
                <Avatar
                  placeholder=""
                  variant="rounded"
                  src={selectedOffice.avatar}
                  alt={selectedOffice.name}
                  width={64}
                  height={64}
                />
                <Typography
                  placeholder=""
                  className="text-lg text-dark font-bold"
                >
                  {selectedOffice.name}
                </Typography>
              </div>
              <div className="flex gap-5 items-center">
                {selectedOffice.isFavorite === true ? (
                  <Icon
                    icon={ICON_MAPPER.heart}
                    className="text-pink-600 text-xl"
                  />
                ) : (
                  <Icon
                    icon={ICON_MAPPER.heartOutlined}
                    className="text-pink-600 text-xl"
                  />
                )}
                <Button
                  variant="filled"
                  color="secondary"
                  className="py-2 px-8"
                  onClick={closeSelectedOfficeDialog}
                >
                  {selectedOffice.isFavorite === true ? "Block" : "Done"}
                </Button>
              </div>
            </div>
            <div className="flex gap-2 items-center pt-5">
              <Icon
                icon={ICON_MAPPER.car}
                className="text-lightDark text-base"
              />
              <Typography
                placeholder=""
                className="text-xs text-lightDark font-normal"
              >
                {selectedOffice.travelRadius}
              </Typography>
            </div>
            <div className="flex gap-2 items-center pt-5">
              <Icon
                icon={ICON_MAPPER.location}
                className="text-lightDark text-base"
              />
              <Typography
                placeholder=""
                className="text-xs text-lightDark font-normal"
              >
                {selectedOffice.address}
              </Typography>
            </div>
            <div className="pt-5">
              <Typography
                placeholder=""
                className="text-xs text-lightDark font-normal"
              >
                Skills needed :
              </Typography>
              <div className="flex gap-2 flex-wrap pl-3">
                {selectedOffice.skills?.map((item, index) => (
                  <div
                    key={index}
                    className={`rounded-lg bg-opacity-5 capitalize  px-2 py-1 flex items-center bg-primary w-fit `}
                  >
                    <div className="flex items-center gap-2">
                      <Typography
                        placeholder=""
                        className="text-xs text-dark font-bold"
                      >
                        {item}
                      </Typography>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="pt-3">
              <Typography
                placeholder=""
                className="text-xs text-lightDark font-normal"
              >
                PPE Provided :
              </Typography>
              <div className="flex gap-2 flex-wrap pl-3">
                {selectedOffice.ppeProvided?.map((item, index) => (
                  <Typography
                    key={index}
                    placeholder=""
                    className="text-xs text-dark font-bold"
                  >
                    {item}
                  </Typography>
                ))}
              </div>
            </div>
          </DialogBody>
        </Dialog>
      )}
    </>
  );
}
