---
layout: post
title: fs-enhance
date:   2015-01-04 22:00:00
permalink: /opensource/fs-enhance/index.html
meta: version 1.0.3
---

extend file system apis for some more complex operation，[https://github.com/lujintan/fs-enhance](https://github.com/lujintan/fs-enhance)

###Installation

{% highlight bash %}
npm install -g fs-enhance
{% endhighlight %}

###API

####fsEnhance.copyFile

copy file

######parameter:

* `src`: `String` source file path
* `target`: `String` target file path
* `cb`: `Function` the callback for error occur

######example:

{% highlight javascript %}
var fsEnhance = require('fs-enhance');

fsEnhance.copyFile('aaa.js', 'bbb.js', function(err) {
    if (err){
        throw new Error('Error: copy file aaa.js error');
    }
});
{% endhighlight %}

####fsEnhance.mkdir
create folders in folder path, is similar to mkdir -p aaa/bbb/ccc

######parameter:

* `dirpath`: `String` source folder path
* `mode`: `String|Number` folder's file mode, mode defaults to 0777

######example:

{% highlight javascript %}
var fsEnhance = require('fs-enhance');

fsEnhance.mkdir('aaa/bbb/ccc');
{% endhighlight %}

####fsEnhance.readDir
traversal folder then excute the callback

######parameter:

* `src`: `String` source file path
* `cb`: `Function` the callback for each file or folder
{% highlight javascript %}
//cb's arguments
{
    path: filePath,   //file's real path
    type: 1|0    //file's type 1: file  0: folder
}
{% endhighlight %}

######example:

{% highlight javascript %}
var fsEnhance = require('fs-enhance');

fsEnhance.readDir('./test', function(fileInfo){
    console.log(fileInfo.path);
    if (fileInfo.type === 1) {
        //file ...
    } else if (fileInfo.type === 0) {
        //folder ...
    }
});
{% endhighlight %}