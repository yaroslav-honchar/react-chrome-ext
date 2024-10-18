/** @type {import("tailwindcss").Config} */
module.exports = {
  darkMode: "class", // Enables dark mode using the 'class' strategy
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Primary dark pastel colors
        primary: {
          light: "#8a94de", // Light pastel blue
          DEFAULT: "#5964bb", // Dark pastel blue
          dark: "#2b358a", // Even darker pastel blue
        },
        secondary: {
          light: "#f3b1a3", // Light pastel coral
          DEFAULT: "#e87d6e", // Dark pastel coral
          dark: "#bb564b", // Even darker pastel coral
        },
        accent: {
          light: "#d9a5c9", // Light pastel pink
          DEFAULT: "#b073a0", // Dark pastel pink
          dark: "#8a5177", // Even darker pastel pink
        },

        // Background colors
        background: {
          light: "#2f3136", // Dark slate background
          DEFAULT: "#232428", // Slightly darker shade
          dark: "#191a1d", // Even deeper dark shade
        },

        // Text colors
        text: {
          light: "#c1c2c5", // Light gray for contrast against dark backgrounds
          DEFAULT: "#e0e0e0", // Soft white for readability
          dark: "#f5f5f5", // Pure white for strong contrast
        },

        // Additional pastel accent colors
        // pastelBlue: "#a8c6ea",
        // pastelGreen: "#a3e5c7",
        // pastelPurple: "#c8a7e1",
        // pastelYellow: "#f3eac2",
        // pastelOrange: "#f2c5a0",
      },
    },
  },
  plugins: [],
}
