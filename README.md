[![Build Status](https://img.shields.io/travis/tetojs/teto.js.svg?style=flat-square)](https://travis-ci.org/tetojs/teto.js)
![David](http://img.shields.io/david/tetojs/teto.js.svg?style=flat-square)
![David](http://img.shields.io/david/dev/tetojs/teto.js.svg?style=flat-square)
![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)

## Installation

```
$ npm install
```

## Running Dev Server

```
$ npm start
```

## Tips

- route 对应的组件存放于 ./components 目录下，似乎结构可读性更好
- RHL@1.x 会导致 @autobind 不可用，所以采用 2.x 
- 除了 decorator，还可以使用操作符 `::` 来实现 autobind，参见：http://babeljs.io/blog/2015/05/14/function-bind/
- 开发时不应使用 extract-text-webpack-plugin，因为它让 CSS 无法热替换
- Object.assign 与 Array.slice 都不是深拷贝

[![](teto.png)](http://seiga.nicovideo.jp/seiga/im2044734)

