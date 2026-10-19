const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,   //关闭eslint校验
  pages: {
    index: {
      entry: "src/main.js",
      title: "心灵放假"
    }
  }
})
