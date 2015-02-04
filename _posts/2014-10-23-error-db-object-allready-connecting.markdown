---
layout: post
title:  "Error: db object already connecting"
date:   2014-11-25 11:56:10
categories: error_record
preview: "/image/post/20141023.jpg"
---

今天遇到一个问题，在通过node连接mongodb的时候会报错：

    db object already connecting, open cannot be called multiple times

主要原因是，有一个`db`对象已经与数据库连接，就是要求`db.open()`之后必须要`db.close()`才能建立下一个链接。但是在并发请求的情况下，这种情况很难避免。而为每个action单独去创建db对象又比较恶心，所以把主程序的代码改写下，数据库始终保持连接状态，然后把`db`对象传给各个`action`。

代码如下：

{% highlight javascript %}
var express = require('express');
var Db = require('mongodb').Db;
var Server = require('mongodb').Server;
var db_name = 'test';
var db_host =  '127.0.0.1';      // 数据库地址
var db_port =  '27017';   // 数据库端口
var db = new Db(db_name, new Server(db_host, db_port, {}), {w: 1});

var app = express();

//将db对象传入
app.get('/categories', categories.index(db));
app.get('/categories/:_id', categories.index(db));
app.post('/categories/add', categories.add(db, additional));

//打开数据库连接
db.open(function(err, db) {
    if (err) {
        db.close();
        return;
    }
    //启动httpserver
    http.createServer(app).listen(app.get('port'), function(){
        console.log('Express server listening on port ' + app.get('port'));
    });
});
{% endhighlight %}