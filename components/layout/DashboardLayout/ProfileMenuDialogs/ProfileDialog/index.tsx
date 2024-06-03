import React, {
  useEffect,
  useRef,
  useMemo,
  useState,
  FormEvent,
  ChangeEvent,
} from "react";
import { ICON_MAPPER, COLOR_MAPPER, MSG_SERVER_ERROR } from "@/utils/constants";
import { IComponent, IUserStatus } from "@/utils/interfaces";
import { Icon } from "@/libraries/iconify-react";
import Button from "@/components/custom/buttons/Button";
import CardTemplate from "@/components/custom/CardTemplate";
import TabButton from "@/components/custom/buttons/TabButton";
import {
  Avatar,
  Card,
  CardBody,
  Dialog,
  DialogBody,
  DialogHeader,
  IconButton,
  Typography,
} from "@/libraries/material-tailwind";
import type { DialogProps } from "@/libraries/material-tailwind";
import { CircularProgressbarWithChildren } from "@/libraries/react-circular-progressbar";
import BCalendar from "@/components/custom/calendars/BCalendar";
import { useUser } from "@/contexts/UserContext";
import api from "@/utils/api";
import { toast } from "@/libraries/react-toastify";
import StatusItem from "../../ProfileDialogue/StatusItem";
import EmptyAvatar from "@/components/custom/EmptyAvatar";
import { useCalendar } from "@/contexts/CalendarContext";
import { uuidv4 } from "@/libraries/uuid";
import EditProfile from "../EditProfileDialog/EditProfile";
import EditProfileDialogBox from "./EditProfileDialog";
// Extra imports for Edit Profile Dialog
import Input from "@/components/custom/Input";
import yup from "@/libraries/yup";
import { useFormik } from "@/libraries/formik";
import {
  VALIDATION_INVALID_EMAIL,
  VALIDATION_REQUIRED_FIELD,
} from "@/utils/constants";

interface IProps extends IComponent {
  profileDialogOpened: boolean;
  setProfileDialogOpened: (value: boolean) => void;
  size: DialogProps["size"];
}

let isFirstLoad = true;

export default function ProfileDialog({
  profileDialogOpened,
  setProfileDialogOpened,
  size = "xl",
}: IProps) {
  const { userData } = useUser();
  const { setEvents } = useCalendar();

  const [activeTab, setActiveTab] = useState<string>("Reviews Received");
  const [userStatus, setUserStatus] = useState<IUserStatus | null>(null);

  // UseState for open Edit Profile Button
  const [EditProfileDialog, setEditProfieDialog] = useState<boolean>(false);

  const [editProfile, setEditProfile] = useState<boolean>(false);
  const [addEditDialog, setAddEditDialog] = useState<boolean>(false);
  const [addProfileDialog, setAddProfileDialog] = useState<boolean>(false);

  const [addEditProfileDialog, setAddEditProfileDialog] =
    useState<boolean>(false);

  const handleSave = () => {
    setAddProfileDialog(true);
    setAddEditProfileDialog(false);
  };

  const handleEdit = () => {
    setAddEditProfileDialog(true);
  };

  const statusCompletency = useMemo<number>(() => {
    if (!userStatus) return 0;

    const keys = Object.keys(userStatus);
    const trueValues = Object.values(userStatus).filter((v) => v);

    return (trueValues.length / keys.length) * 100;
  }, [userStatus]);

  const language = useMemo<string>(() => {
    // if (!userData?.lang) return "";

    // return userData.lang.map((l) => l.title).join(", ");
    return "";
  }, []);

  const handler = () => {
    setProfileDialogOpened(!profileDialogOpened);
  };

  // Open and close Edit Profile
  const handlerEdit = () => {
    setEditProfieDialog(!EditProfileDialog);
  };

  // useEffect(() => {
  //   if (isFirstLoad) {
  //     (async () => {
  //       const { data: userStatusRes } = await api.get("/user/dashboard/status");
  //       if (userStatusRes.error) return toast.error(MSG_SERVER_ERROR);
  //       setUserStatus(userStatusRes.data);

  //       const { data: calEventsRes } = await api.post("/calendar/events/list");
  //       if (calEventsRes.error) return toast.error(MSG_SERVER_ERROR);
  //       setEvents(
  //         calEventsRes.data.map((item: any) => ({
  //           id: item?.id || uuidv4(),
  //           title: item?.title || "",
  //           start: item?.start ? new Date(item?.start) : new Date(),
  //           end: item?.end ? new Date(item?.end) : new Date(),
  //           type:
  //             item?.extendedProps?.type === "block"
  //               ? "unavailable"
  //               : "available",
  //           blockId: item?.blockid,
  //         }))
  //       );
  //     })();
  //   }
  //   isFirstLoad = false;
  // }, []);

  if (!EditProfileDialog) {
    return (
      <Dialog
        placeholder=""
        handler={handler}
        open={profileDialogOpened}
        size={size}
        className="h-[95%] overflow-auto rounded-3xl p-4"
      >
        <div>
          <DialogHeader
            placeholder=""
            className="hidden sm:flex justify-end pt-4 pb-0"
          >
            <IconButton
              placeholder=""
              className="text-2xl text-lightDark w-8 h-8"
              variant="text"
              onClick={handler}
            >
              <Icon icon={ICON_MAPPER.close} />
            </IconButton>
          </DialogHeader>

          <DialogBody
            placeholder=""
            className="py-4 px-4 xl:py-15 xl:px-20 flex flex-col gap-8"
          >
            <div className="block sm:flex justify-between items-center">
              <div className="flex justify-between items-center">
                <Typography
                  placeholder=""
                  variant="h2"
                  className="text-3xl font-bold text-dark"
                >
                  My Public Profile
                </Typography>
                <Icon
                  icon={ICON_MAPPER.copy}
                  className="block sm:hidden text-secondary text-lg font-bold"
                />
              </div>
              <Typography
                placeholder=""
                className="text-base font-normal text-lightDark"
              >
                Last Login: less than a minute ago
              </Typography>
            </div>

            <div className="grid grid-cols-2 py-6 2xl:py-12">
              <div className="col-span-2 2xl:col-span-1">
                <div className="flex flex-col md:flex-row items-center gap-1 md:gap-6">
                  <div className="w-20 h-20">
                    <CircularProgressbarWithChildren
                      value={statusCompletency}
                      strokeWidth={6}
                      styles={{
                        path: {
                          stroke: COLOR_MAPPER.warning,
                        },
                        trail: {
                          stroke: "#F6F4F9",
                        },
                      }}
                    >
                      {userData?.avatar ? (
                        <Avatar
                          variant="circular"
                          placeholder=""
                          src={userData.avatar}
                          alt=""
                          className="w-16 h-16"
                        />
                      ) : (
                        <EmptyAvatar className="w-16 h-16" />
                      )}
                    </CircularProgressbarWithChildren>
                  </div>

                  <div className="flex flex-col justify-center">
                    <div className="flex gap-2 justify-center items-center md:justify-start">
                      <h4 className="text-2xl font-bold text-dark">
                        {userData?.name}
                      </h4>
                      <Icon
                        icon={ICON_MAPPER.edit}
                        className="w-5 h-4 text-secondary"
                      />
                    </div>
                    <div className="flex flex-col gap-2 md:flex-row md:gap-4">
                      <Typography
                        placeholder=""
                        className="text-base font-normal text-lightDark text-center"
                      >
                        Dental Hygienist
                      </Typography>
                      <Typography
                        placeholder=""
                        className="text-base font-normal text-lightDark text-center"
                      >
                        Cloud Jobs Provider #{userData?.id}
                      </Typography>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-2 pt-4 md:hidden">
                  <Button
                    variant="filled"
                    color="secondary"
                    className="py-2 px-4"
                    onClick={handlerEdit}
                  >
                    Edit Profile
                  </Button>
                  <div className="flex gap-2 py-2 px-4 rounded-md border border-[#F3EBFF]">
                    <Typography
                      placeholder=""
                      className="text-sm font-normal text-dark"
                    >
                      Only Dental Jobs Users
                    </Typography>
                    <Icon
                      icon={ICON_MAPPER.downArrow}
                      className="w-5 h-5 text-secondary"
                    />
                  </div>
                </div>
              </div>

              <div className="hidden md:flex md:pt-4 2xl:pt-0 items-center col-span-2 2xl:col-span-1 ">
                <div className="flex gap-6">
                  <div className="flex flex-col justify-center">
                    <div className="flex gap-2 py-2 px-4 rounded-md border border-[#F3EBFF]">
                      <Typography
                        placeholder=""
                        className="text-sm font-normal text-dark"
                      >
                        Copy & Share Your Profile Link
                      </Typography>
                      <Icon
                        icon={ICON_MAPPER.copy}
                        className="w-5 h-5 text-secondary"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="flex gap-2 py-2 px-4 rounded-md border border-[#F3EBFF]">
                      <Typography
                        placeholder=""
                        className="text-sm font-normal text-dark"
                      >
                        Only Dental Jobs Users
                      </Typography>
                      <Icon
                        icon={ICON_MAPPER.downArrow}
                        className="w-5 h-5 text-secondary"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col justify-center">
                    {!addProfileDialog ? (
                      <div>
                        <Button
                          variant="filled"
                          color="secondary"
                          className="py-2 px-4"
                          onClick={handleEdit}
                        >
                          Edit Profile
                        </Button>
                        <EditProfileDialogBox
                          addEditProfileDialog={addEditProfileDialog}
                          setAddEditProfileDialog={setAddEditProfileDialog}
                          handleSave={handleSave}
                          size="lg"
                        />
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>

            {userStatus && (
              <div className="p-6 bg-[#FFFCF6]">
                <Typography
                  placeholder=""
                  className="text-lg text-warning font-bold pb-4"
                >
                  {statusCompletency.toFixed(2)}% Completed
                </Typography>
                <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                  <StatusItem
                    label="Verify Phone Number"
                    status={userStatus.phoneVerified}
                  />
                  <StatusItem
                    label="Add/Complete Address"
                    status={userStatus.addressAdded}
                  />
                  <StatusItem
                    label="Add Maximum Distance"
                    status={userStatus.maxDistanceAdded}
                  />
                  <StatusItem
                    label="Add Dental License Number"
                    status={userStatus.license}
                  />
                  <StatusItem
                    label="Add Background Description"
                    status={userStatus.backgroundDesc}
                  />
                  <StatusItem label="Add Fee" status={userStatus.feeAdded} />
                  <StatusItem
                    label="Add School Information"
                    status={userStatus.schoolInfoAdded}
                  />
                  <StatusItem
                    label="Upload Your Profile Photo"
                    // status={userStatus.avatar}
                    status={true}
                  />
                  <StatusItem
                    label="Upload Your Photo ID"
                    status={userStatus.idUploaded}
                  />
                  <StatusItem
                    label="Confirm Your Email Address"
                    status={userStatus.emailVerified}
                  />
                </div>
              </div>
            )}

            <div className="p-6">
              <div className="grid grid-cols-10 gap-3">
                <div className="col-span-10 md:col-span-5 xl:col-span-2 flex gap-2 items-center">
                  <Icon
                    icon={ICON_MAPPER.clock}
                    className="w-6 h-6 text-primary"
                  />
                  <Typography
                    placeholder=""
                    className="text-sm text-lightDark "
                  >
                    {userData?.minHours} hours worked
                  </Typography>
                </div>
                <div className="col-span-10 md:col-span-5 xl:col-span-2 flex gap-2 items-center">
                  <Icon
                    icon={ICON_MAPPER.coin}
                    className="w-5 h-5 text-primary"
                  />
                  <Typography
                    placeholder=""
                    className="text-sm text-lightDark "
                  >
                    ${userData?.hourlyRate}/hr
                  </Typography>
                </div>
                <div className="col-span-10 md:col-span-5 xl:col-span-2 flex gap-2 items-center">
                  <Icon
                    icon={ICON_MAPPER.location}
                    className="w-6 h-6 text-primary"
                  />
                  <Typography
                    placeholder=""
                    className="text-sm text-lightDark "
                  >
                    {userData?.city}, {userData?.state} {userData?.zipCode}
                  </Typography>
                </div>
                <div className="col-span-10 md:col-span-5 xl:col-span-2 flex gap-2 items-center">
                  <Icon
                    icon={ICON_MAPPER.car}
                    className="w-6 h-6 text-primary"
                  />
                  <Typography
                    placeholder=""
                    className="text-sm text-lightDark "
                  >
                    {userData?.travelRadius} Miles Away
                  </Typography>
                </div>
                <div className="col-span-10 md:col-span-5 xl:col-span-2 flex gap-2 items-center">
                  <Icon
                    icon={ICON_MAPPER.clock}
                    className="w-6 h-6 text-primary"
                  />
                  <Typography
                    placeholder=""
                    className="text-sm text-lightDark "
                  >
                    {language}
                  </Typography>
                </div>
              </div>
            </div>

            <Card placeholder="" className="h-[700px]">
              <CardBody placeholder="" className="h-full">
                <BCalendar />
              </CardBody>
            </Card>

            <div>
              <CardTemplate title="" className="w-full bg-[#FFF]">
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <TabButton
                        className="font-semibold"
                        isActive={activeTab === "Reviews Received"}
                        onClick={() => setActiveTab("Reviews Received")}
                      >
                        Reviews Received
                      </TabButton>
                      <TabButton
                        className="font-semibold"
                        isActive={activeTab === "Reviews of Offices"}
                        onClick={() => setActiveTab("Reviews of Offices")}
                      >
                        Reviews of Offices
                      </TabButton>
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  {activeTab === "Reviews Received" ? (
                    <Typography placeholder="" className="text-dark text-sm">
                      0 reviews
                    </Typography>
                  ) : (
                    ""
                  )}
                </div>
              </CardTemplate>
            </div>
          </DialogBody>
        </div>
      </Dialog>
    );
  }

  // Edit Profile Dialog
  else {
    return (
      <Dialog
        placeholder=""
        handler={handler}
        open={profileDialogOpened}
        size={"lg"}
        className="h-[95%] overflow-auto rounded-3xl p-4"
      >
        <div>
          <DialogHeader
            placeholder=""
            className="hidden sm:flex justify-end pt-4 pb-0"
          >
            <IconButton
              placeholder=""
              className="text-2xl text-lightDark w-8 h-8"
              variant="text"
              onClick={() => handlerEdit()}
            >
              <Icon icon={ICON_MAPPER.close} />
            </IconButton>
          </DialogHeader>

          <EditProfile />
        </div>
      </Dialog>
    );
  }
}
