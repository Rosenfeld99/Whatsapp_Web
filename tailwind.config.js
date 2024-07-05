/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // light mode
        light_primary: "#0e1317",
        light_primary_content: "#FFFFFF",
        light_secoundary: "#131b21",
        light_secoundary_content: "#131b21",
        light_accent: "#3b82f6",
        light_accent_content: "#BBBBBB",
        light_neutral: "#F0F1F1",
        light_neutral_content: "#F0F1F1",

        // glogal
        warning: "#f4b400",
        warning_content: "#fff",
        success: "#31ab70",
        success_content: "#fff",
        error: "#ef4444",
        error_content: "#fff",

        // message dark
        msg_owner_dark: "#275c4d",
        msg_sender_dark: "#232c33",

        // message light
        msg_owner_light: "#275c4d",
        msg_sender_light: "#F0F1F1",

        // dark mode
        dark_primary: "#0e1317",
        dark_primary_content: "#FFFFFF",
        dark_secoundary: "#131b21",
        dark_secoundary_content: "#fff",
        dark_accent: "#808b93",
        dark_accent_content: "#fff",
        dark_neutral: "#232c33",
        dark_neutral_content: "#F0F1F1",
      },
      keyframes: {
        "gradient-x": {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
      },
      animation: {
        "gradient-x": "gradient-x 1.5s ease infinite",
      },
    },
  },
  plugins: [],
};
