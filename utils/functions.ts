import axios from "axios";
import { PATHS_BEFORE_AUTH } from "./constants";

export const formatNumber = (num: number): string => {
  if (num >= 1e6) {
    return `${(num / 1e6).toFixed(1)}M`;
  }

  if (num >= 1e3) {
    return `${(num / 1e3).toFixed(1)}K`;
  }

  return num.toFixed(1);
};

export const ellipsisString = (str: string, maxLen: number): string => {
  if (str.length > maxLen) {
    return `${str.slice(0, maxLen - 1)}...`;
  }
  return str;
};

export const isAuthLayout = (pathname: string): boolean => {
  if (PATHS_BEFORE_AUTH.includes(pathname)) {
    return true;
  }
  return false;
};

export const getErrorMessage = (err: Error): string => {
  return axios.isAxiosError(err)
    ? `${err.response?.status}: ${err.response?.data.message}`
    : "Ooops! Something went wrong.";
};
