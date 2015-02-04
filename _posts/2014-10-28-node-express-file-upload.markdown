---
layout: post
title:  "Node, Express的文件上传"
date:   2014-10-28 22:30:00
categories: node
preview: "/image/post/20141028.jpg"
---

* 首先，通过`app.use()`加载`bodyPaser`插件
* 设置上传文件的临时目录
{% highlight javascript %}
app.use(
    express.bodyParser({
        uploadDir: path.join(__dirname, 'uploadtmp')
    })
);
{% endhighlight %}
* 写接收文件的action

{% highlight javascript %}
var fs = require('fs');
exports.uploadPic = function(db){
    return function(req, res){
    if (req.files && req.files.upload) {    //‘upload’为提交表单name
        var tmpPath = req.files.upload.path; //获取临时文件路径
        var targetPath = '../filepath';    //转存到目标文件
        fs.rename(tmpPath, targetPath, function(err){
            if (err){
                throw err;
            } else{}
        });
    }
};
{% endhighlight %}