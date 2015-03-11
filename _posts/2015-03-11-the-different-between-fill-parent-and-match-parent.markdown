---
layout: post
title:  "fill-parent & match-parent 的区别"
date:   2015-03-11 21:42:00
categories: android
preview: "/image/post/20141011.jpg"
---

RT，在写android应用的时候，思考一个问题：

`android:layout_height="fill_parent"`和`android:layout_height="match_parent"`两者之间有什么区别？

答案是：`没区别！`

Android2.2以前是没有match_parent的，因为match_parent比fill_parent描述起来更加贴切，所以在Android2.2之后两种写法都支持。
