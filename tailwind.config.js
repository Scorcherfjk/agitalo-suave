module.exports = {
  content: ["./src/**/*.{astro,html,js,ts,mdx}"],
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        black: "#2F2E41",
        background: "#fdfaf6",
        text: "#2e2e2e",
        "background-alt": "#fff4eb",
        "accent-1": "#f08a5d",
        "accent-2": "#b83b5e",
        complementary: "#6a0572",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
