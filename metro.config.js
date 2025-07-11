const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// Gunakan minifier lebih optimal untuk mempercepat bundling
config.transformer.minifierPath = "metro-minify-terser";
config.transformer.minifierConfig = {
  keep_classnames: true,
  keep_fnames: true,
  mangle: {
    keep_classnames: true,
    keep_fnames: true,
  },
};

// Batasi jumlah worker untuk menghindari konsumsi memori berlebihan
config.maxWorkers = 2;

// Pastikan module `react-native` di-resolve dengan benar
config.resolver.resolverMainFields = ["react-native", "browser", "main"];

module.exports = withNativeWind(config, { input: "./global.css" });
