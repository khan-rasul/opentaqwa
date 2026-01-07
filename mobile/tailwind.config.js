/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Your existing card colors
        gold: "#625443",
        forest: "#263936",
        plum: "#5E4B56",
        "plum-light": "#B8A4B0",
        "gold-light": "#af8f69",
        "forest-light": "#8B9D98",
        "off-white": "#F5F3F0",
        ocean: "#264872",

        // New background colors for the gradient style
        background: {
          primary: "#1F1D1B", // Darkest - main bg
          secondary: "#2A2826", // Dark charcoal
          tertiary: "#4A4340", // Medium dark
          warm: "#8B7E74", // Warm gray-brown
          cream: "#D4C4B0", // Light cream/beige
        },

        // Text colors for better readability
        text: {
          primary: "#FFFFFF",
          secondary: "#E5E5E5",
          muted: "#A0A0A0",
          dim: "#6B6B6B",
        },

        // Border colors
        border: {
          subtle: "rgba(255, 255, 255, 0.1)",
          medium: "rgba(255, 255, 255, 0.2)",
          light: "rgba(255, 255, 255, 0.3)",
        },
      },
      fontFamily: {
        montserrat: ["Montserrat"],
        quicksand: ["Quicksand"],
        "great-vibes": ["GreatVibes"],
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [],
};
