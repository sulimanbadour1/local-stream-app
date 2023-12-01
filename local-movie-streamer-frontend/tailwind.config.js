/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        flip: "flip 6s infinite steps(2, end)",
        rotate: "rotate 3s linear infinite both",
        "text-gradient": "text 1.5s linear infinite",
      },
      keyframes: {
        flip: {
          to: {
            transform: "rotate(360deg)",
          },
        },
        rotate: {
          to: {
            transform: "rotate(90deg)",
          },
        },
        text: {
          to: {
            backgroundPosition: "200% center",
          },
        },
      },
    },
  },
  plugins: [],
};
