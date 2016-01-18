---
layout: post
title:  "关于换行符(LF)和回车符(CR)"
date:   2016-01-05 10:00:45
categories: php
preview: "/image/bg_bd.jpg"
---

LF(line feed) & CR(carriage return)是表示换行的两种字符，分别表示换行和回车。

顾名思义：

* LF 表示换到了新的一行  十六进制是 0x0a，用符号'\n'表示
* CR 表示回到输入行的起始位置  十六进制是 0x0d，用符号'\r'表示

主要起源于打字机时代，当时打字机每秒钟可以打10个字，而每次换行都需要0.2s，正好可以打两个字。
于是就在\r\n，表示回到行首并新换一行。

目前 
* Window 版本依然采用这种方式，在行尾加入CR + LF表示换行。
* Mac 早起版本使用 CR 进行换行，当前版本使用LF
* Unix 使用 LF 进行换行

所以如果在mac下编辑一个文本，在window下看是没有换行的。
现在主流的IDE，一般都会采用LF作为换行。
