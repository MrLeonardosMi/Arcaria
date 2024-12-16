import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
      gridTemplateColumns: {
        '9': 'repeat(9, minmax(0, 1fr))',
      },
    },
  },
  plugins: [require("rippleui")],
} satisfies Config;
