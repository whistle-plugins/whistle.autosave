# whistle.qpic-autosave

## Feature

- [ ] 微信图文中的图片 自动保存指定的本地目录
- [x] 修改 `mmbiz.qpic.cn referer://https://mp.weixin.qq.com/` ，这个可以非微信域名下加载微信的图片了，方便调试


## 安装
1. 该应用是whistle插件，需要先安装whistle：[https://github.com/avwo/whistle](https://github.com/avwo/whistle)

2. 安装插件：
    ```
    npm i -g whistle.qpic-autosave
    ```
    > 推荐使用淘宝镜像：` npm i -g whistle.qpic-autosave --registry=https://registry.npm.taobao.org`

3. 安装后通过whistle的管理界面打开配置界面：
    ![autosave插件管理界面](https://user-images.githubusercontent.com/11450939/51109605-a9eeb100-1830-11e9-985c-34d1e1b8ee88.gif)

    整个插件 copy了官方的 [whistle-plugins/whistle.autosave: 自动保存指定抓包数据到本地目录 (github.com)](https://github.com/whistle-plugins/whistle.autosave) 修改了针对微信图片SVG场景下的图片自动下载保存和和微信图片的本地开发环境预览效果

## Reference

1. [avwo/whistle: HTTP, HTTP2, HTTPS, Websocket debugging proxy (github.com)](https://github.com/avwo/whistle) 
2. [插件开发 · GitBook (wproxy.org)](https://wproxy.org/whistle/plugins.html) 
3. [whistle-plugins/whistle.autosave: 自动保存指定抓包数据到本地目录 (github.com)](https://github.com/whistle-plugins/whistle.autosave)  


