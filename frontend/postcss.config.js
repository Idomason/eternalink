module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {
      // Disable browserslist query
      overrideBrowserslist: ["defaults", "not IE 11"],
    },
  },
};
