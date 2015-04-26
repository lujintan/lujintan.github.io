---
layout: post
title: 图片文件开发规范
date:   2014-12-03 22:00:00
permalink: /opensource/wowstyleguide/IMAGE.html
meta: version 0.1.0
---

* 【强制】图片类型仅可以使用一下文件类型：png,jpg,gif,ico,cur
* 【强制】文件命名规范如下：

    ```
    spr_xxx     //sprite类型图片
    ico_xxx     //图标类型图片
    logo_xxx    //logo类型图片
    bg_xxx      //背景类型图片
    ```

* 【强制】通过Photoshop生成的图片，必须选用web格式并且不可带任何元信息
* 【建议】ico类图片一般选用png格式
    * 只包含全透明效果不包含半透明效果图片，选用png8
    * 包含半透明效果图片，选用png24
* 【建议】编译时引入图片压缩功能，上线之前统一进行图片压缩
