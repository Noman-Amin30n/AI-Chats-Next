module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
        keyframes: {
            "music-bar": {
                "0%, 100%": { height: "20%" },
                "50%": { height: "80%" },
            }
        },
        animation: {
            "music-bar": "music-bar 1s ease-in-out infinite",
        }
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("@tailwindcss/typography")],
};
