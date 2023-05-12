const path = require("path");
const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: "/archimate/",
  outputDir: path.resolve(__dirname, "../../dist/archimate")
})
