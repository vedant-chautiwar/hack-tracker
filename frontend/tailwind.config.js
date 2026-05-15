/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#f7f3ec",
        cream: "#fffaf1",
        ink: "#24302f",
        navy: "#18314f",
        forest: "#285943",
        amber: "#d49a3a",
        coral: "#c96f5b",
        teal: "#5f9d91"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["Georgia", "ui-serif", "serif"]
      },
      boxShadow: {
        soft: "0 10px 30px rgba(36, 48, 47, 0.08)"
      }
    }
  },
  plugins: []
};
