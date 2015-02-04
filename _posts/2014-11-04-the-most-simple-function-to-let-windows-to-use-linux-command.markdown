---
layout: post
title:  "最简单的方式，让windows支持Linux命令"
date:   2014-11-01 22:42:00
categories: other
preview: "/image/post/20141101.jpg"
---

今天临时换到`windows`办公，最不习惯的一点，习惯了mac下的`Terminal`下操作文件，突然换到`windows`的`cms`，各种操作指令对不上
在网上查了一些相关的解决方案（比如：[Cygwin](http://www.cygwin.com/)），最后还是选择自己写一个映射，解决一些基本问题：

{% highlight bash %}
@echo off
@doskey ls=dir /b $*
@doskey ll=dir /od/p/q/tw $*
@doskey clear = cls
@doskey touch = copy nul $*
@doskey sub = "C:\\...\\sublime_text.exe" $*
@doskey mongodb = "C:\\...\\mongod.exe" --dbpath "C:\\...\\mongodb\\data"
@doskey conmongo = "C:\\...\\mongo.exe" $*

:任意命令直接添加

chcp 65001
cd C:\\...\\mycode

cmd
{% endhighlight %}

保存成一个`.bat`文件，直接打开，方便使用