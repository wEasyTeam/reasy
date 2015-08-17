# fis3-command-inspect
查看文件 match 结果。

## Useage

先安装 `fis3-command-inspect` 插件， 然后进入项目目录以后。

```bash
 Usage: fis3 inspect [media name]

 Options:

   -h, --help     print this help message
   --files        specify files to be inspected.
```

**注意** 当通过 files 指定规则的时候，记得加上双引号，否则系统会把安装自己规则把涮选出来的结果传进程序。

## sample

```bash

fis3 inspect

~ /components/webuploader/widgets/md5.js
 -- release /public/be/components/webuploader/widgets/md5.js `/^\/(?:static\/)?(.*)$/`   (0th)
 -- url /be/components/webuploader/widgets/md5.js `/^\/(?:static\/)?(.*)$/`   (0th)
 -- isMod true `*.js`   (4th)
 -- useSameNameRequire true `*.js`   (4th)
 -- useHash false `**`   (8th)


 ~ /components/webuploader/widgets/queue.js
 -- release /public/be/components/webuploader/widgets/queue.js `/^\/(?:static\/)?(.*)$/`   (0th)
 -- url /be/components/webuploader/widgets/queue.js `/^\/(?:static\/)?(.*)$/`   (0th)
 -- isMod true `*.js`   (4th)
 -- useSameNameRequire true `*.js`   (4th)
 -- useHash false `**`   (8th)

```
