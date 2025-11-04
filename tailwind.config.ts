import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      height: {
        '150': '150px', 
        '400': '400px'
      },
      zIndex: {
        '1100': '1100',
      },
      width: {
        '7/8': '87.5%', 
      },
  },
  plugins: [],
}
}
export default config;
