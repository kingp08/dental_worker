import { ReactNode } from "react";

export interface IComponent {
  className?: string;
}

export interface ILanguage {
  id: number;
  language: string;
  fluency: string;
}

export interface IProfessional {
  id: number;
  avatar: string;
  name: string;
  title: string;
  rating: number;
  skills: string[];
  distance: number;
  rate: number;
  booking: number;
  lateCancel: string;
  noShows: number;
  lastLogin: string;
  jobProvider: string;
  workedHours: number;
  Education: string;
  licencedIn: string;
  languages: ILanguage[];
}

export interface IJob {
  id: number;
  title: string;
  numOfAppliers: string;
  break?: string;
  paymentTerms?: string;
  paymentMethod?: string;
  distance?: string;
  practiceTypes?: {
    id: string;
    name: string;
  }[];
  preProvided?: string[];
  practiceType?: string[];
  proType: string;
  description?: string;
  jobTypeId?: string;
  milesRadius?: string;
  // poster: {
  //   organization: string;
  //   rate: number;
  //   numberOfReviews: number;
  //   logo: string;
  // };
  posterData?: {
    avatar: string;
    rate: string;
    id: number;
    name: string;
  };
  applyStatus?: string;
  breakDuration?: string;
  experience?: string;
  location?: string;
  requirement: {
    expRange: {
      min: number;
      max: number;
    } | null;
    salaryRange: {
      min: number;
      max: number;
      mode: string;
    } | null;
    location: string;
    skillMatchRate: {
      total: number;
      matchedCount: number;
    };
  };
  salary?: {
    mode: string;
    min: string;
    max: string;
  };
  postedAt: string;
  isReadable: boolean;
  candidates?: number;
  status?: string;
  ppeProvided?: [];
}

export interface IMsg {
  id: number;
  sender: string;
  imgSrc: string;
  message: string;
  senderData?: {
    avatar: string;
    name: string;
  };
}

export interface INotification {
  id: number;
  title: string;
  content: string;
  receivedAt: string;
  imgSrc: string;
  type: string;
}

export interface IBank {
  id: number;
  logo: string;
  name: string;
  bankNum: string;
  status: string;
  isDefault: boolean;
}

export interface IButtonProps extends IComponent {
  children?: ReactNode;
  onClick?: Function;
}

export interface INavItem {
  id: number;
  icon: string;
  path: string;
  name: string;
}

export interface ILayoutProps {
  children: ReactNode;
}

export interface IUserData {
  userId: string;
  name?: string;
  id?: string;
  minHours?: string;
  travelRadius?: string;
  verifyData?: any;
  city?: string;
  state?: string;
  avatar: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  zipCode: string;
  jobRole: string;
  hourlyRate: number;
  userType: number;
}

export interface PaymentAccount {
  accountNumber: string;
  bankName: string;
  eType?: string;
  routingNumber?: string;
  id: string;
  accountType: "bank" | "card";
  verifiedAccount: boolean;
  defaultAccount: boolean;
  cardNumber?: string;
  brand?: string;
}

export interface IProviderProps {
  children: ReactNode | number | string;
}

export interface ISigninReqBody {
  username: string;
  password: string;
}
export interface IUserItem {
  id: number;
  name: string;
  imgSrc: string;
  lastMessage: string;
  lastSentAt: string;
  unreadCount: number;
  sentAt?: string;
  chatterData?: {
    avatar: string;
    name: string;
  };
}

export interface IMessage {
  id: number;
  isReceived: boolean;
  sentAt: string;
  message: string;
}

export interface ICalEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  type: "unavailable" | "available";
  blockId: string;
}

export interface IWeekAvailability {
  id: string;
  enable: boolean;
  label: string;
  days: Array<{
    isAvailable: boolean;
    from: string;
    to: string;
  }>;
}

export interface IUserStatus {
  phoneVerified: boolean;
  addressAdded: boolean;
  maxDistanceAdded: boolean;
  license: boolean;
  backgroundDesc: boolean;
  feeAdded: boolean;
  schoolInfoAdded: boolean;
  photo: boolean;
  idUploaded: boolean;
  emailVerified: boolean;
}

export interface IJobRole {
  id: string;
  label: string;
}

export interface IUserDataForSignup {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  zipCode: string;
  jobRole: number;
  hourlyRate: number;
  password: string;
  [key: string]: string | number;
}

export interface ITraining {
  school: string;
  gradYear: string;
  graduated: boolean;
}

export interface IBooking {
  id: string;
  msgId: string;
  bookingWith: string;
  bookedDateTime: string;
  hourlyRate: string;
}

export interface IBookingSetting {
  travelRadius: number;
  minHours: number;
  hourlyRate: number;
}

export interface IEvent {
  id: string;
  title: string;
  doubleBooked: boolean;
  date: Date;
  start: Date;
  end: Date;
  time: string[];
  blockid: string;
}
