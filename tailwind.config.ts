import type { Config } from "tailwindcss";
import { COLOR_MAPPER, SCREEN_MAPPER } from "./utils/constants";
const withMT = require("@material-tailwind/react/utils/withMT");

const config: Config = withMT({
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: COLOR_MAPPER,
    fontFamily: {
      sans: ["Nunito Sans", "sans-serif"],
      serif: ["Nunito Sans", "serif"],
      body: ["Nunito Sans", "sans-serif"],
    },
    screens: SCREEN_MAPPER,
  },
  plugins: [],
});

export default config;
