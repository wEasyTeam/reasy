## use-mod.js

- framework `mod.js`
- fis3 plugin
    - fis3-hook-module 本地解析替换路径，为合并做准备
    - fis3-postpackager-loader 解析 fis3 的 {
    "res": {
        "a.css": {
            "uri": "/a.css",
            "type": "css"
        },
        "static/mod.js": {
            "uri": "/static/mod.js",
            "type": "js"
        },
        "modules/1-0/1-0.js": {
            "uri": "/modules/1-0/1-0.js",
            "type": "js",
            "deps": [
                "/static/require.js"
            ]
        },
        "modules/2-0/2-0.js": {
            "uri": "/modules/2-0/2-0.js",
            "type": "js"
        },
        "modules/cal/cal.js": {
            "uri": "/modules/cal/cal.js",
            "type": "js",
            "deps": [
                "static/mod.js"
            ]
        }
    },
    "pkg": {}
} 来加载 js 组件
- command
    - fis3 release  组件分散预览
    - fis3 release prod 资源或者组件进行了合并处理