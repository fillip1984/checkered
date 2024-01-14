import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    colors: {
      // https://coolors.co/6b9080-a4c3b2-cce3de-eaf4f4-f6fff8
      primary: "hsl(154 15% 49%)",
      secondary: "hsl(147 21% 70%)",
      accent: "hsl(167 29% 85%)",
      white: "hsl(133 100% 98%)",
      black: "hsl(152 15% 19%)",
      gray: "hsl(180 31% 94%)",
      dark: "hsl(180 5% 20%)",
      warning: "hsl(59 65% 70%)",
      danger: "hsl(0 100% 71%)",
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
} satisfies Config;
