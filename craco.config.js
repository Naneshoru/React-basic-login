var path = require("path");

module.exports = {
  webpack: {
    alias: {
      "react/jsx-runtime": "react/jsx-runtime.js",
      "react/jsx-dev-runtime": "react/jsx-dev-runtime.js",
      "@": path.resolve(__dirname, "src/"),
      "@components": path.resolve(__dirname, "src/components/"),
      "@lib": path.resolve(__dirname, "src/lib/"),
      "@hooks": path.resolve(__dirname, "src/hooks/"),
      "@ui": path.resolve(__dirname, "src/components/ui/"),
      "@contexts": path.resolve(__dirname, "src/contexts/"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@styles": path.resolve(__dirname, "src/styles/"),
    },
  },
};