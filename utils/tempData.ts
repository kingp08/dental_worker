import { ICON_MAPPER } from "@/utils/constants";

export const TEMP_NOTIFICATIONS = [
  {
    id: 1,
    title: "Update your availability",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
    notifiedAt: "2 min ago",
    avatar: {
      isImage: false,
      src: ICON_MAPPER.clock,
    },
  },
  {
    id: 2,
    title: "Update your availability",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
    notifiedAt: "2 min ago",
    avatar: {
      isImage: true,
      src: "/assets/images/avatar-wade.png",
    },
  },
  {
    id: 3,
    title: "Update your availability",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
    notifiedAt: "2 min ago",
    avatar: {
      isImage: false,
      src: ICON_MAPPER.clock,
    },
  },
  {
    id: 4,
    title: "Update your availability",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
    notifiedAt: "2 min ago",
    avatar: {
      isImage: false,
      src: ICON_MAPPER.clock,
    },
  },
  {
    id: 5,
    title: "Update your availability",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
    notifiedAt: "2 min ago",
    avatar: {
      isImage: false,
      src: ICON_MAPPER.clock,
    },
  },
];

export const TEMP_MESSAGES = [
  {
    id: 1,
    sender: "Jane Cooper",
    imgSrc: "/assets/images/avatar-jane.png",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
  },
  {
    id: 2,
    sender: "Wade Warren",
    imgSrc: "/assets/images/avatar-wade.png",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
  },
  {
    id: 3,
    sender: "Cameron Williamson",
    imgSrc: "/assets/images/avatar-cameron.png",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
  },
  {
    id: 4,
    sender: "Brooklyn Simmons",
    imgSrc: "/assets/images/avatar-brooklyn.png",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
  },
  {
    id: 5,
    sender: "Guy Hawkins",
    imgSrc: "/assets/images/avatar-guy.png",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
  },
];

export const USER_ACCOUNT_SETTING = [
  {
    id: 1,
    desc: "My Public Profile",
    logo: ICON_MAPPER.user,
    isExtendible: true,
  },
  {
    id: 2,
    desc: "Booking Settings",
    logo: ICON_MAPPER.clock,
    isExtendible: false,
  },
  {
    id: 3,
    desc: "Offices",
    logo: ICON_MAPPER.bag,
    isExtendible: true,
  },
  {
    id: 4,
    desc: "Billing Info",
    logo: ICON_MAPPER.bill,
    isExtendible: false,
  },
  {
    id: 5,
    desc: "Account Settings",
    logo: ICON_MAPPER.userSetting,
    isExtendible: true,
  },
  {
    id: 6,
    desc: "Notifications",
    logo: ICON_MAPPER.notification,
    isExtendible: false,
  },
  {
    id: 7,
    desc: "Log out",
    logo: ICON_MAPPER.logout,
    isExtendible: false,
  },
];

export const STEPS_TO_COMPLETE = [
  {
    id: 3,
    label: "Add Maximum Distance",
  },
  {
    id: 5,
    label: "Add Background Description",
  },
  {
    id: 10,
    label: "Confirm Your Email Address",
  },
  {
    id: 1,
    label: "Verify phone Number",
  },
  {
    id: 6,
    label: "Add hourlyRate",
  },
  {
    id: 8,
    label: "Upload Your Profile Photo",
  },
  {
    id: 4,
    label: "Add Dental License Number",
  },
  {
    id: 7,
    label: "Add School Information",
  },
  {
    id: 9,
    label: "Upload Your Photo ID",
  },
  {
    id: 2,
    label: "Add/Complete Address",
  },
];

export const SCHEDULE = [
  {
    id: 1,
    day: "Mondays",
    available: true,
    from: "01/02/2024 12:00 am",
    to: "01/02/2024 11:59 pm",
    availability: "Available",
  },
  {
    id: 2,
    day: "Tuesdays",
    available: false,
    from: "01/02/2024 12:00 am",
    to: "01/02/2024 11:59 pm",
    availability: "Not Available",
  },
  {
    id: 3,
    day: "Wednesdays",
    available: false,
    from: "01/02/2024 12:00 am",
    to: "01/02/2024 11:59 pm",
    availability: "Not Available",
  },
  {
    id: 4,
    day: "Thursdays",
    available: false,
    from: "01/02/2024 12:00 am",
    to: "01/02/2024 11:59 pm",
    availability: "Available",
  },
  {
    id: 5,
    day: "Fridays",
    available: true,
    from: "01/02/2024 12:00 am",
    to: "01/02/2024 11:59 pm",
    availability: "Not Available",
  },
  {
    id: 6,
    day: "Saturdays",
    available: true,
    from: "01/02/2024 12:00 am",
    to: "01/02/2024 11:59 pm",
    availability: "Not Available",
  },
  {
    id: 7,
    day: "Sundays",
    available: true,
    from: "01/02/2024 12:00 am",
    to: "01/02/2024 11:59 pm",
    availability: "Not Available",
  },
];

export const EVENTS = [
  {
    id: 1,
    logo: "/assets/images/office1.png",
    title: "Treating Periodontal Disease in the Post-Antibiotic Age",
    desc: "1.0 Hr of CE credit",
    postedAt: "January 25, 2024 6:00pm-7:00pm CST",
  },
  {
    id: 2,
    logo: "/assets/images/office2.png",
    title:
      "From Tragedy to Triumph: Raising Awareness and Reducing the Stigma of Suicide",
    desc: "1.0 Hr of CE credit",
    postedAt: "January 09, 2024 7:00pm-8:00pm CST",
  },
  {
    id: 3,
    logo: "/assets/images/office3.png",
    title:
      "Comfortably Numb: A Review of Local Anesthesia for Dental Hygienists",
    desc: "1.0 Hr of CE credit",
    postedAt: "January 11, 2024 7:00pm-8:00pm CST",
  },
  {
    id: 4,
    logo: "/assets/images/office4.png",
    title: "Dental Implant Basics and Maintenance",
    desc: "2.0 Hr of CE credit",
    postedAt: "January 16, 2024 6:00pm-8:00pm CST",
  },
];

export const NOTIFICATION_CATEGORIES = [
  {
    id: 1,
    label: "Job Posts",
    key: "jobPosts",
  },
  {
    id: 2,
    label: "Bookings",
    key: "bookings",
  },
  {
    id: 3,
    label: "Messages",
    key: "messages",
  },
  {
    id: 4,
    label: "Reviews",
    key: "reviews",
  },
  {
    id: 5,
    label: "Schedule Update Reminder",
    key: "updateReminder",
  },
];

export const TEMP_BOOKING = [
  {
    id: 1,
    label: "Arlene McCoy",
    bookingTime: "Dec 30, 2023 10:00 AM",
    bookingWith: "Lorem ipsum",
    address: "Dallas, TX 75204",
    breakTime: "10:00 AM-11:00 AM",
    estHours: "2 Hours",
    hourlyRate: "$56.70",
    payment: "Lorem ipsum",
    createdAt: "Lorem ipsum",
    status: "pending",
  },
  {
    id: 2,
    label: "Savannah Nguyen",
    bookingTime: "Jan 1, 2023 10:00 AM",
    bookingWith: "Lorem ipsum",
    address: "Dallas, TX 75204",
    breakTime: "10:00 AM-11:00 AM",
    estHours: "2 Hours",
    hourlyRate: "$56.70",
    payment: "Lorem ipsum",
    createdAt: "Lorem ipsum",
    status: "completed",
  },
  {
    id: 3,
    label: "Leslie Alexander",
    bookingTime: "Jan 5, 2023 10:00 AM",
    bookingWith: "Lorem ipsum",
    address: "Dallas, TX 75204",
    breakTime: "10:00 AM-11:00 AM",
    estHours: "2 Hours",
    hourlyRate: "$56.70",
    payment: "Lorem ipsum",
    createdAt: "Lorem ipsum",
    status: "ongoing",
  },
  {
    id: 4,
    label: "Annette Black",
    bookingTime: "Jan 10, 2023 10:00 AM",
    bookingWith: "Lorem ipsum",
    address: "Dallas, TX 75204",
    breakTime: "10:00 AM-11:00 AM",
    estHours: "2 Hours",
    hourlyRate: "$56.70",
    payment: "Lorem ipsum",
    createdAt: "Lorem ipsum",
    status: "pending",
  },
  {
    id: 5,
    label: "AJenny Wilson",
    bookingTime: "Jan 31, 2023 10:00 AM",
    bookingWith: "Lorem ipsum",
    address: "Dallas, TX 75204",
    breakTime: "10:00 AM-11:00 AM",
    estHours: "2 Hours",
    hourlyRate: "$56.70",
    payment: "Lorem ipsum",
    createdAt: "Lorem ipsum",
    status: "completed",
  },
  {
    id: 6,
    label: "Esther Howard",
    bookingTime: "Feb 5, 2023 10:00 AM",
    bookingWith: "Lorem ipsum",
    address: "Dallas, TX 75204",
    breakTime: "10:00 AM-11:00 AM",
    estHours: "2 Hours",
    hourlyRate: "$56.70",
    payment: "Lorem ipsum",
    createdAt: "Lorem ipsum",
    status: "ongoing",
  },
  {
    id: 7,
    label: "Arlene McCoy",
    bookingTime: "Feb 12, 2023 10:00 AM",
    bookingWith: "Lorem ipsum",
    address: "Dallas, TX 75204",
    breakTime: "10:00 AM-11:00 AM",
    estHours: "2 Hours",
    hourlyRate: "$56.70",
    payment: "Lorem ipsum",
    createdAt: "Lorem ipsum",
    status: "completed",
  },
  {
    id: 8,
    label: "Savannah Nguyen",
    bookingTime: "Feb 12, 2023 10:00 AM",
    bookingWith: "Lorem ipsum",
    address: "Dallas, TX 75204",
    breakTime: "10:00 AM-11:00 AM",
    estHours: "2 Hours",
    hourlyRate: "$56.70",
    payment: "Lorem ipsum",
    createdAt: "Lorem ipsum",
    status: "completed",
  },
  {
    id: 9,
    label: "Leslie Alexander",
    bookingTime: "Feb 25, 2023 10:00 AM",
    bookingWith: "Lorem ipsum",
    address: "Dallas, TX 75204",
    breakTime: "10:00 AM-11:00 AM",
    estHours: "2 Hours",
    hourlyRate: "$56.70",
    payment: "Lorem ipsum",
    createdAt: "Lorem ipsum",
    status: "completed",
  },
  {
    id: 10,
    label: "Annette Black",
    bookingTime: "Feb 28, 2023 10:00 AM",
    bookingWith: "Lorem ipsum",
    address: "Dallas, TX 75204",
    breakTime: "10:00 AM-11:00 AM",
    estHours: "2 Hours",
    hourlyRate: "$56.70",
    payment: "Lorem ipsum",
    createdAt: "Lorem ipsum",
    status: "pending",
  },
  {
    id: 11,
    label: "Jenny Wilson",
    bookingTime: "Feb 29, 2023 10:00 AM",
    bookingWith: "Lorem ipsum",
    address: "Dallas, TX 75204",
    breakTime: "10:00 AM-11:00 AM",
    estHours: "2 Hours",
    hourlyRate: "$56.70",
    payment: "Lorem ipsum",
    createdAt: "Lorem ipsum",
    status: "pending",
  },
  {
    id: 12,
    label: "Esther Howard",
    bookingTime: "Mar 1, 2023 10:00 AM",
    bookingWith: "Lorem ipsum",
    address: "Dallas, TX 75204",
    breakTime: "10:00 AM-11:00 AM",
    estHours: "2 Hours",
    hourlyRate: "$56.70",
    payment: "Lorem ipsum",
    createdAt: "Lorem ipsum",
    status: "ongoing",
  },
  {
    id: 13,
    label: "Arlene McCoy",
    bookingTime: "Mar 2, 2023 10:00 AM",
    bookingWith: "Lorem ipsum",
    address: "Dallas, TX 75204",
    breakTime: "10:00 AM-11:00 AM",
    estHours: "2 Hours",
    hourlyRate: "$56.70",
    payment: "Lorem ipsum",
    createdAt: "Lorem ipsum",
    status: "ongoing",
  },
  {
    id: 14,
    label: "Annette Black",
    bookingTime: "Mar 2, 2023 10:00 AM",
    bookingWith: "Lorem ipsum",
    address: "Dallas, TX 75204",
    breakTime: "10:00 AM-11:00 AM",
    estHours: "2 Hours",
    hourlyRate: "$56.70",
    payment: "Lorem ipsum",
    createdAt: "Lorem ipsum",
    status: "ongoing",
  },
];
