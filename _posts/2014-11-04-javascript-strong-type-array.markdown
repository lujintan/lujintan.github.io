---
layout: post
title:  "Javascript 强类型数组实际应用"
date:   2014-11-04 21:08:00
categories: javascript
preview: "/image/post/20141104.jpg"
---

之前一直知道Javascript有强类型数组这个东西，但是一直没有实际的用过，今天用webgl写了一个立方体，算是真真正正的用了一回。
JavaScript平时使用的数组Array，其实是`哈希表`的扩展，这样的实现有利于数组长度的改变，以及对各种数据类型的支持。但相应的就会牺牲一些性能。
其实JavaScript是可以支持强类型数组的。

那强类型数组有什么用呢？

现在Js的应用场景越来越多，有时候会涉及到一些底层数据的操作，这时就会涉及到数据的对接问题，而散列的Js Array是没法完成这项任务的，像比如下面例子：

当我们写一个webgl程序的时候，我们需要通过Js给webgl的着色器指定顶点数据源和颜色数据源，而这些数据源提供的数据会直接通过浏览器去调用opengl的API来操控显卡渲染。

那问题来了！opengl的API需要的强类型数组数据没法跟Js的Array进行对接。

于是，强类型数组出现拯救世界：
{% highlight javascript %}
var po = webgl.getAttribLocation(program, 'po');
var co = webgl.getAttribLocation(program, 'co');
webgl.enableVertexAttribArray(po);
webgl.enableVertexAttribArray(co);
var dat = new Float32Array([
    -1,-1,1,        1,-1,1,         1,1,1,      -1,1,1,
    -1,-1,-1,       1,-1,-1,        1,1,-1,     -1,1,-1,
    -1,-1,-1,       -1,1,-1,        -1,1,1,     -1,-1,1,
    1,-1,-1,        1,1,-1,         1,1,1,      1,-1,1,
    -1,1,-1,        1,1,-1,         1,1,1,      -1,1,1,
    -1,-1,-1,       1,-1,-1,        1,-1,1,     -1,-1,1
]);
{% endhighlight %}

强类型数组主要包含以下几种：

![/image/post/20141104.jpg](/image/post/20141104.jpg)

关于强类型的更多使用，详见：[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays)