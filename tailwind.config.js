/** @type {import('tailwindcss').Config} */
export default {
  important: true,
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brandGreen: "#1C9236",
        brandGray: "#F2F2F2",
        brandDarkGray: "#8E8E8E",
        brandRed: "#DF1616",
      },
      screens: {
        sm: "481px",
        md: "768px",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
