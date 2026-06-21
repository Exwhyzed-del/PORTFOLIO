import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050505",
        primary: "#00ff88",
        secondary: "#00c8ff",
        accent: "#9d4edd",
        danger: "#ff4d6d",
      },
    },
  },
  plugins: [],
};
export default config;
