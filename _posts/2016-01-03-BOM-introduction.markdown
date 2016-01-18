---
layout: post
title:  "关于BOM头的解释"
date:   2016-01-03 16:00:30
categories: php
preview: "/image/bg_bd.jpg"
---

##关于BOM头
BOM(Byte Order Mark)，字节顺序标记，另外一种叫法为"Zero Width No-Break Space"(零宽无间断间隔)，Unicode编码标准中用于标识文件的编码方式。

##BOM头主要用途
在UTF编码的文件中经常会在文件的头部放置几个字节（UTF-8为3个、UTF-16为2个、UTF-32为4个）来标识文件的编码方式或者字节顺序。

UTF-16和UTF-32的字节顺序有两种：

* 大端字节序(Big-endian)，低位存放有效字节
* 小端字节序(Little-endian)，高位存放有效字节

比如一个UTF-16编码的文件，只有字符aaa:

|16进制数据|文件内容|BOM头|字节序
|-----------------------|--------|-----|--------------
|ff fe 61 00 61 00 61 00|..a.a.a.|ff fe|Little-endian
|fe ff 00 61 00 61 00 61|..a.a.a.|fe ff|Big-endian

UTF-8编码是通过边长的方式进行存储，所以不需要考虑字节序的问题，BOM头主要用来标识编码方式：

|16进制数据|文件内容|BOM头
|-----------------|------|---------
|ef bb bf 61 61 61|...aaa|ef bb bf

##为什么，各种编码规范都要求在文件存储时不能带BOM头

很多语言读取时不会忽略BOM，如果将文件内容进行输出经常会造成意向不到的问题。在web开发当中有人会在一些老的浏览器下遇到“top padding”的问题（即使给页面设置了top padding为0，也不能是网页紧贴浏览器顶部），就是因为UTF-8 BOM头所占的3个字节。
