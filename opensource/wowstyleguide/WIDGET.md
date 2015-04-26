---
layout: post
title: 组件书写规范
date:   2014-12-03 22:00:00
permalink: /opensource/wowstyleguide/WIDGET.html
meta: version 0.1.0
---

组件标示一组js+css+image来完成一项扩展功能。

* 【强制】组件必须放置于src/widget目录下
* 【强制】组件中必须有main.js|main.less文件作为组件的入口文件，放于同一目录，目录名为组件名
* 【强制】组件js书写符合commonjs规范，在编译时编译脚本自动进行`amd`包裹，amdId: '模块目录/src/widget/组件目录名'
    {% highlight javascript %}
    //main.js
    var xxx = require('common/src/widget/xxx');
    var _init = function(){
        //...
    };
    module.exports = {
        init: _init
    };
    
    //-->
    define("common/src/widget/xxx", 
        ["require", "exports", "module", "css!common/src/widget/back2top/main"], 
        function(require, exports, module){
        var xxx = require('common/src/widget/xxx');
        var _init = function(){
            //...
        };
        module.exports = {
            init: _init
        };
    });
    {% endhighlight %}
* 【强制】组件外部资源的require必须在文件最顶部完成，exports必须在文件最底部
* 【强制】组件目录下需要有使用markdown语法书写的README.md文件，来进行组件使用方面的相关描述
* 【强制】widget组件可以被其他widget引用，也可以被外部异步引用，引用方式如下：
    * var xxx = require('xxx(组件ID)');
    * require(['xxx'], function(xxx){});
    * css或者其他类型那个文件按照如下方式引入ID：
        * css!common/src/widget/xxx
        * tpl!common/src/widget/xxx
* 【强制】组件内除main.less文件外的其他样式文件引入，直接使用less的import语法引入至main.less
* 【强制】各模块不可以加载除common和自身模块以外其他模块的组件
* 【强制】组件中js禁止修改全局定义变量
* 【强制】组件中css文件必须以`".w-组件名-xxx"`作为最外层选择器，以免单页面结构出现样式覆盖
* 【建议】分功能进行组件名区分，例如：
    * ui_xxx        : 表示展示类型组件
    * ext_xxx       : 功能扩展类组件
    * overlap_xxx   : 遮罩层类
    
