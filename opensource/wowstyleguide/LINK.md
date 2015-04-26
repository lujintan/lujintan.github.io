---
layout: post
title: 模块划分&命名
date:   2014-12-03 22:00:00
permalink: /opensource/wowstyleguide/LINK.html
meta: version 0.1.0
---

* 【强制】模块内静态资源引入，资源路径以模块path（在package.json中配置）为起始如：common/src/js/xxx.js
* 【强制】widget资源引入，使用`commonjs`规范使用，资源id：'模块path/src/widget/widget目录名'
* 【强制】代码中资源链入都直接引用源码文件，不可在源码中直接引入打包后的产出文件
* 【强制】静态资源不可以跨模块进行引用
* 【强制】跳转链接的地址必须使用绝对路径以`“/”`起始或者携带host的url（`如：http://www.kkyfj.com/xxx`）
* 【强制】js文件中如需引用本地静态资源，通过__url(xxx)语法进行引用