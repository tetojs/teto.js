[![Build Status](https://travis-ci.org/kagawagao/teto.js.svg?branch=master)](https://travis-ci.org/kagawagao/teto.js)
[![bitHound Overall Score](https://www.bithound.io/github/kagawagao/teto.js/badges/score.svg)](https://www.bithound.io/github/kawagagao/teto.js)
[![bitHound Dependencies](https://www.bithound.io/github/kagawagao/teto.js/badges/dependencies.svg)](https://www.bithound.io/github/kawagagao/teto.js/master/dependencies/npm)
[![bitHound Dev Dependencies](https://www.bithound.io/github/kagawagao/teto.js/badges/devDependencies.svg)](https://www.bithound.io/github/kagawagao/teto.js/master/dependencies/npm)
[![bitHound Code](https://www.bithound.io/github/kagawagao/teto.js/badges/code.svg)](https://www.bithound.io/github/kagawagao/teto.js)
[![Coverage Status](https://coveralls.io/repos/github/kagawagao/teto.js/badge.svg?branch=master)](https://coveralls.io/github/kagawagao/teto.js?branch=master)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](http://standardjs.com/)
[![dependencies](https://david-dm.org/kagawagao/teto.js.svg?style=flat-square)](https://david-dm.org/kagawagao/teto.js)
[![devDependency Status](https://david-dm.org/kagawagao/teto.js/dev-status.svg?style=flat-square)](https://david-dm.org/kagawagao/teto.js#info=devDependencies)

## Installation

```
$ npm install
```

## Running Dev Server

```
$ npm run dev
```

## Tips

- RHL@1.x 会导致 @autobind 不可用，所以采用 2.x
- 除了 decorator，还可以使用操作符 `::` 来实现 autobind，参见：http://babeljs.io/blog/2015/05/14/function-bind/
- 开发时不应使用 extract-text-webpack-plugin，因为它让 CSS 无法热替换
- Object.assign 与 Array.slice 都不是深拷贝
- 组件的 key 参数使用时应避免使用索引值，而应该使用 id 等唯一值
- 标签的嵌套要注意符合 W3C 规范，比如 button 不能嵌套 button、table 需要 tbody
- 所有路由在 `routes` 目录下，为了实现异步加载，对应的 component 以 `.async.js(x)` 结尾
- 关于蚂蚁金服iconfont不能使用的问题，可参考[这里](https://github.com/ant-design/antd-init/tree/master/examples/local-iconfont)和[这里](https://github.com/ant-design/ant-design/issues/1070)

# node-sass

如果收到提示：`ERROR in The `libsass` binding was not found`，则可以尝试：

```
$ npm rebuild node-sass
```

[![](teto.png)](http://seiga.nicovideo.jp/seiga/im2044734)
