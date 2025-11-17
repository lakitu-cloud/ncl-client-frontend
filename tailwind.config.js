// tailwind.config.js (project root)
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", ...require('tailwindcss/defaultTheme').fontFamily.sans],
        oswald: ["Oswald", ...require('tailwindcss/defaultTheme').fontFamily.sans],
        openSans: ["Open Sans", ...require('tailwindcss/defaultTheme').fontFamily.sans],
      },
      screens: {
        xs: "340px",
        ss: "620px",
        sm: "768px",
        md: "1060px",
        lg: "1200px",
        xl: "1700px",
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
};