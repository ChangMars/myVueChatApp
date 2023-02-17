const { defineConfig } = require('@vue/cli-service')
const path = require('path');
module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === 'production'
  ? '/dist/'
  : '/myvuechatapp/dist/',
  transpileDependencies: true,
  lintOnSave: false,
  filenameHashing: false,
})
