# zxshop

> zxshop是一套基于uniapp+uniCloud开发的电商系统，包括单商户与多商户两个版本，通过拖拽可视化组件，生成适用全行业多场景模板，帮商家快速网上开店。同时支持PC端后台管理和移动端后台管理，提高产品全方位用户体验。

## 支持组件
* 基础组件：文本、图片广告、商品、视频、标题、图文导航、商品搜索、公告、辅助空白、辅助线、自由面板
* 系统组件：分类模板、页面导航
* 营销组件：优惠券

## 体验商城PC端管理后台(多商户版本)
[在线预览](https://static-e9be6b26-4836-411a-b7a7-a987467041f7.bspapp.com/)

## 体验商城微信小程序(多商户版本)
<img src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-zxshop/1e0ddc20-1ce7-11eb-81ea-f115fe74321c.jpg" height="255" width="255" >

## 体验商城移动端管理后台(多商户版本)
<img src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-zxshop/a2b68be0-1cdb-11eb-8a36-ebb87efcf8c0.png" height="255" width="255" >

## 如需技术支持，部署指导，定制化开发，请加好友
![微信小程序](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-zxshop/71b98a30-e7a0-11ea-8a36-ebb87efcf8c0.jpg)

## 相关项目

- [zxshop商家前台(小程序)](https://ext.dcloud.net.cn/plugin?id=2620)
- [zxshop商家后台(电脑端)](https://ext.dcloud.net.cn/plugin?id=2680)
- [zxshop商家后台(移动端)](https://ext.dcloud.net.cn/plugin?id=2629)

## 云函数使用说明
前后台统一使用一套云服务空间中的云函数，如需云函数部署请移步[zxshop商家前台(小程序)](https://ext.dcloud.net.cn/plugin?id=2620)

## 部署步骤

```bash
# 导入项目
将项目导入到HBuilderX开发工具中

# 修改根目录下manifest.json
AppID:从微信小程序获取

# 修改根目录下config.js
SPACE_ID:从unicloud服务空间获取SpaceID
CLIENT_SECRET:从unicloud服务空间获取clientSecret

# 运行项目
最后通过HBuilderX菜单栏运行-运行到浏览器，启动项目
```