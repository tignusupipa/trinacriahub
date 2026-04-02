/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FAFAFA",
        foreground: "#09090B",
        primary: "#8C1D18",
        "primary-foreground": "#FFFFFF",
        secondary: "#E5E5E5",
        "secondary-foreground": "#09090B",
        accent: "#D4AF37",
        muted: "#F4F4F5",
        "muted-foreground": "#71717A",
        border: "#E4E4E7"
      },
      fontFamily: {
        heading: ["Cormorant Garamond", "serif"],
        body: ["Outfit", "sans-serif"],
      },
      animation: {
        "fade-up": "fadeInUp 0.6s ease-out",
        "scale-in": "scaleIn 0.3s ease-out",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
}
