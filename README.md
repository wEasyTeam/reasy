# reasy  [![NPM version](https://badge.fury.io/js/reasy.png)](https://www.npmjs.org/package/reasy)

[![NPM Download](https://nodei.co/npm-dl/reasy.png?months=1)](https://www.npmjs.org/package/reasy)

> 基于fis3的纯前端工程自动化工具




## 安装

    $npm install -g reasy
    
    //recommend install from npm
    //or use git

    $git clone https://github.com/wEasyTeam/reasy
    $cd reasy
    $npm install
    

## 用法

> 详见： [FIS3官网](http://fis.baidu.com/)

> 注：项目默认配置文件不是`fis-conf.js`而是`reasy-conf.js`


## 新增功能使用说明

### 新增API

 为了确保一致性，reasy对FSI3的API进行了无侵略拓展。

 * reasy.extend(ruleName)
   该方法可以实现对配置的继承，可继承的配置在reasy的rules目录下，你也可以在项目rules目录下添加自己的可复用规则，采用`module.exports`导出
 * ...
 

#### 内置规则

现有的内置规则有: 

* base 将绝对路径转化为相对路径
* autoprefix  可以实现css自动添加私有前缀
* compress 对css,js,png进行压缩
* parse 对sass,less,art-template进行编译
* md5 将文件名修改为md5形式
* cmd 对seajs进行封装

你也可以自己编写规则放置在工程目录下的rules目录下，如：`workdir/myconf.js`,则调用方法为：`reasy.extend('myconf', [args])`。
rule文件书写示例：
```
module.exports = function(args) {
    return this.match('**', {
        // ...  写法请参考FIS3配置文件写法
    });
};
```


### 新增命令

 为了减少不必要的配置文件的书写，本工具在`release`命令上拓展了一个`-m`(或`--media`)命令，使用方法示例: `reasy release -m parse,compress,md5 -d ../output` 。表示编译时会将parse, compress, 和 md5规则应用上去，而不需要编写`reasy-conf.js`




## 关于reasy

> reasy前端自动化工具基于FIS3构建，并在其基础上对纯前端开发模式进行了一定的优化，使用更为轻便。主要特点有：

 1. 对前端默认的编译插件集进行了打包，实现一键安装即可使用
 2. 实现配置继承，并对常用的功能（如压缩，md5，sass编译，模版编译等）进行了封装，可以在一定程度上减少配置文件的书写量
 3. 增加了`-m`配置实现无配置实现基础的压缩，md5等功能
 4. 更改FIS3内置Server为[`web-debug`](https://github.com/lwdgit/web-debug/),增加了移动端调试功能
 5. 更多功能正在进一步添加...

    
    