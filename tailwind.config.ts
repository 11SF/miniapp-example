import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./Components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "default": "url('/assets/bg/bg.svg')",
      },
    },
  },
  plugins: [],
};
export default config;
