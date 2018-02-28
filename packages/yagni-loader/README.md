# yagni-loader

[Webpack][webpack] loader to convert `.html` or `.svg` files to
[yagni-dom][yagni-dom] compatible hyperscript dialect ES6 modules
(uses [yagni-parser][yagni-parser] under the hood).


```html
<!-- layout.html -->
<div class="body">
    <div class="sidebar">Sidebar</div>
    <div class="content">Hello, {{ ctx.username }}!</div>
</div>
```

```js
// main.js
import { view as layoutView } from './html/layout.html';

const tree = layoutView({username: 'John Smith'});
console.log(tree);

// tree is an object of the following structure, suitable for render by
// yagni-dom render function

// const tree = {
//   tagName: 'div',
//   attrs: {'class': 'body'},
//   props: {},
//   children: [
//     {
//       tagName: 'div',
//       attrs: {'class': 'sidebar'},
//       props: {},
//       children: ['Sidebar']
//     },
//     {
//       tagName: 'div',
//       attrs: {'class': 'content'},
//       props: {},
//       children: ['Hello, John Smith!']
//     }
//   ]
// };

```

For an example of generated javascript code please check
[yagni-parser][yagni-parser].


## Installation

Using `npm`:

```shell

$ npm install --save-dev @yagni-js/yagni-loader @yagni-js/yagni-dom @yagni-js/yagni

```

Using `yarn`:

```shell

$ yarn add -D @yagni-js/yagni-loader @yagni-js/yagni-dom @yagni-js/yagni

```

## Usage

```js
// webpack.config.js
module.exports = {
  //...
  module: {
    rules: [
      {
        test: /\.(svg|html)$/,
        loader: 'yagni-loader'
      }
    ]
  },
  //...
};
```


## License

[Unlicense][unlicense]


[yagni-dom]: https://github.com/ysegorov/yagni-dom
[yagni-parser]: https://github.com/ysegorov/yagni-parser
[webpack]: https://webpack.js.org/
[unlicense]: http://unlicense.org/
