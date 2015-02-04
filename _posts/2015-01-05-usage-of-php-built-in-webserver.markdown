---
layout: post
title:  "关于PHP内建webserver的使用"
date:   2014-11-30 22:42:00
categories: php
preview: "/image/post/20141130-2.png"
---

今天使用php内建webserver遇到了一个问题，就是内建的webserver如何实现rewrite。

从PHP5.4开始PHP支持了一个新特性就是“built-in webserver”，具体使用如下：

{% highlight shell %}
#php -S <addr>:<port> -t <docroot>

#doc 默认是命令执行的当前目录
php -S localhost:80 -t /Users/root/Documents/webroot
{% endhighlight %}

关于rewrite，一般情况下，我们使用Apache、lighttpd这样的服务器的时候，会引用`mod_rewrite`模块，然后有一个类似于下面的配置：

{% highlight xml %}
<IfModule mod_rewrite.c>
    Options -MultiViews
    RewriteEngine On
    RewriteRule ^(.*)$ index.php
</IfModule>
{% endhighlight %}

但是对于内建的webserver要怎么搞定呢？截取了一段，官网的代码：

{% highlight shell %}
<?php
    // router.php
    if (preg_match('/\.(?:png|jpg|jpeg|gif)$/', $_SERVER["REQUEST_URI"])) {
        return false;    // serve the requested resource as-is.
    } else { 
        echo "<p>Welcome to PHP</p>";
    }
?>
{% endhighlight %}

{% highlight shell %}
php -S localhost:8000 router.php
{% endhighlight %}

更多内容，参阅：[http://php.net/manual/en/features.commandline.webserver.php](http://php.net/manual/en/features.commandline.webserver.php)