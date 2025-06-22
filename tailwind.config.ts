import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/assets/**/*.{js,ts,jsx,tsx,mdx,svg,png}",
  ],
  theme: {
    extend: {
      colors: {},
      // 불필요한 애니메이션 설정 제거
    },
  },
  plugins: [],
};
export default config;
