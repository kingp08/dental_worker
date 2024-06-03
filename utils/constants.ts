export const PATH_MAPPER = {
  dashboard: "/dashboard",
  bookings: "/bookings",
  calendar: "/calendar",
  schedule: "/schedule",
  jobPosting: "/job-posting",
  messages: "/messages",
  revenue: "/revenue",
  donate: "/donate",
  help: "/help",
  signin: "/signin",
  dentalSigup: "http://172.105.152.69:3001/signup",
  signup: "/signup",
  forgotPassword: "/forgot-password",
  otpVerify: "/otp-verify",
  createPassword: "/create-password",
};

export const PATHNAME_MAPPER = {
  [PATH_MAPPER.dashboard]: "Dashboard",
  [PATH_MAPPER.bookings]: "Bookings",
  [PATH_MAPPER.calendar]: "Calendar",
  [PATH_MAPPER.schedule]: "Schedule",
  [PATH_MAPPER.jobPosting]: "Job Posting",
  [PATH_MAPPER.messages]: "Messages",
  [PATH_MAPPER.revenue]: "Revenue",
  [PATH_MAPPER.donate]: "Donate",
  [PATH_MAPPER.help]: "Help",
  [PATH_MAPPER.signin]: "Sign in",
  [PATH_MAPPER.signup]: "Sign up",
  [PATH_MAPPER.forgotPassword]: "Forgot Password",
  [PATH_MAPPER.otpVerify]: "OTP Verification",
  [PATH_MAPPER.createPassword]: "Create New Password",
};

export const COLOR_MAPPER = {
  primary: "#8032FF",
  secondary: "#FF817B",
  success: "#00D391",
  warning: "#FFAD32",
  error: "#FF3257",
  dark: "#1F1233",
  lightDark: "#7A6899",
};

export const STATUS_MAPPER = {
  pending: "pending",
  completed: "completed",
  ongoing: "ongoing",
  eligible: "eligible",
  available: "Available",
  notAvailable: "Not Available",
  notVerified: "Not Verified",
};

export const ICON_MAPPER = {
  dashboard: "mingcute:grid-fill",
  starCalendar: "bxs:calendar-star",
  calendar: "solar:calendar-bold",
  clock: "tabler:clock-filled",
  bag: "basil:bag-solid",
  message: "solar:chat-dots-bold",
  dollarSack: "fa6-solid:sack-dollar",
  donate: "fa6-solid:hand-holding-dollar",
  help: "material-symbols:help",
  externalLink: "tabler:external-link",
  circleFilledCheck: "ph:check-circle-fill",
  circleCheck: "ph:check-circle-light",
  check: "ic:round-check",
  close: "ic:round-close",
  notification: "ion:notifications",
  plus: "ic:round-plus",
  minus: "ic:round-minus",
  leftArrow: "ep:arrow-left-bold",
  rightArrow: "ep:arrow-right-bold",
  upArrow: "ep:arrow-up-bold",
  downArrow: "ep:arrow-down-bold",
  leftLongArrow: "ph:arrow-left-bold",
  star: "ph:star-fill",
  user: "oi:person",
  userStars: "mingcute:user-star-fill",
  userDollar: "solar:dollar-bold",
  userBlock: "basil:user-block-solid",
  userReport: "material-symbols:person-alert-rounded",
  userSetting: "mdi:account-cog",
  location: "mdi:location",
  checkList: "fluent:task-list-square-16-filled",
  menu: "heroicons-solid:menu-alt-3",
  edit: "fe:edit",
  delete: "material-symbols:delete",
  copy: "clarity:copy-line",
  coin: "subway:coin",
  car: "bi:car-front-fill",
  eye: "mdi:eye",
  eyeOff: "mdi:eye-off",
  vEllipsis: "nimbus:ellipsis",
  send: "bxs:send",
  chat: "entypo:chat",
  search: "tabler:search",
  mute: "octicon:mute-16",
  trash: "bxs:trash",
  meeting: "mdi:virtual-meeting",
  bill: "mingcute:bill-fill",
  logout: "streamline:logout-1-solid",
  heart: "mdi:heart",
  heartOutlined: "mdi:heart-outline",
  blocked: "fluent:presence-blocked-20-regular",
  mail: "gridicons:mail",
  phone: "ic:round-phone",
  profile: "iconamoon:profile",
  gallery: "solar:gallery-bold",
};

export const SHORT_WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];

export const NAV_LINKS = {
  primary: [
    {
      id: 1,
      icon: ICON_MAPPER.dashboard,
      path: PATH_MAPPER.dashboard,
      name: PATHNAME_MAPPER[PATH_MAPPER.dashboard],
    },
    {
      id: 2,
      icon: ICON_MAPPER.starCalendar,
      path: PATH_MAPPER.bookings,
      name: PATHNAME_MAPPER[PATH_MAPPER.bookings],
    },
    {
      id: 3,
      icon: ICON_MAPPER.calendar,
      path: PATH_MAPPER.calendar,
      name: PATHNAME_MAPPER[PATH_MAPPER.calendar],
    },
    {
      id: 4,
      icon: ICON_MAPPER.clock,
      path: PATH_MAPPER.schedule,
      name: PATHNAME_MAPPER[PATH_MAPPER.schedule],
    },
    {
      id: 5,
      icon: ICON_MAPPER.bag,
      path: PATH_MAPPER.jobPosting,
      name: PATHNAME_MAPPER[PATH_MAPPER.jobPosting],
    },
    {
      id: 6,
      icon: ICON_MAPPER.message,
      path: PATH_MAPPER.messages,
      name: PATHNAME_MAPPER[PATH_MAPPER.messages],
    },
    {
      id: 7,
      icon: ICON_MAPPER.dollarSack,
      path: PATH_MAPPER.revenue,
      name: PATHNAME_MAPPER[PATH_MAPPER.revenue],
    },
  ],
  secondary: [
    {
      id: 1,
      icon: ICON_MAPPER.donate,
      path: PATH_MAPPER.donate,
      name: PATHNAME_MAPPER[PATH_MAPPER.donate],
    },
    {
      id: 2,
      icon: ICON_MAPPER.help,
      path: PATH_MAPPER.help,
      name: PATHNAME_MAPPER[PATH_MAPPER.help],
    },
  ],
};

export const SCREEN_MAPPER = {
  xs: "320px",
  ss: "450px",
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
};

export const SCHEDULE_TIMES = [
  "08:30 AM",
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
  "04:30 PM",
  "05:00 PM",
  "05:30 PM",
];

export const MONTH_NAMES = [
  "January",
  "Feburary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const VALIDATION_REQUIRED_FIELD = "Required field";
export const VALIDATION_INVALID_EMAIL = "Invalid email";
export const VALIDATION_INVALID_PHONE = "Invalid phone";
export const VALIDATION_DISMATCH_PASSWORDS = "Passwords are dismatched.";

export const L_STORAGE_AUTH_TOKEN = "AUTH_TOKEN";
export const L_STORAGE_REFRESH_TOKEN = "REFRESH_TOKEN";
export const L_STORAGE_USER_DATA = "USER_DATA";

export const PATHS_BEFORE_AUTH = [
  PATH_MAPPER.signin,
  PATH_MAPPER.signup,
  PATH_MAPPER.otpVerify,
  PATH_MAPPER.createPassword,
  PATH_MAPPER.forgotPassword,
  // PATH_MAPPER.dashboard, // temp for dev
];

export const MSG_SERVER_ERROR = "500: Server error.";

export const LINKS_TO_COMPLETE = [
  {
    id: 1,
    label: "Dental Training",
    key: "trainingAdded",
    value: true,
  },
  {
    id: 2,
    label: "Background Description",
    key: "backgroundDescAdded",
    value: true,
  },
  {
    id: 3,
    label: "Verify Your Email Address",
    key: "emailConfirmed",
    value: false,
  },
  {
    id: 4,
    label: "Languages Your Speak",
    key: "languageAdded",
    value: true,
  },
  {
    id: 5,
    label: "Verify Your Mobile Phone Number",
    key: "phoneConfirmed",
    value: true,
  },
  {
    id: 6,
    label: "Upload Your Profile Picture & Photo ID",
    key: "avatarUploaded",
    value: true,
  },
  {
    id: 7,
    label: "Add Your License Number",
    key: "licenseAdded",
    value: false,
  },
  {
    id: 8,
    label: "Complete A Background Check (Optional)",
    key: "",
    value: false,
  },
  {
    id: 9,
    label: "List Your Skills",
    key: "skillsAdded",
    value: true,
  },
];