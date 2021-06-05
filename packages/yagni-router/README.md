# yagni-router

Yet another **pure functional** router for browser.

**Pure functional** in this context means functional code style - library code is
linted using [eslint-plugin-fp][eslint-plugin-fp] and
[eslint-plugin-better][eslint-plugin-better]. Javascript code of the library is
purely functional.

Source code is written using [ES6 modules][es6-modules], built using
[rollup][rollup] and distributed in two formats - as CommonJS module and as
ES6 module.


## Features

Currently supports hash-based routing only.


## Installation

Using `npm`:

```shell

$ npm install --save-dev @yagni-js/yagni @yagni-js/yagni-dom @yagni-js/yagni-router

```

Using `yarn`:

```shell

$ yarn add -D @yagni-js/yagni @yagni-js/yagni-dom @yagni-js/yagni-router

```

## Usage

CommonJS usage:

```javascript

const url = require('@yagni-js/yagni-router').url;
const hashRouter = require('@yagni-js/yagni-router').hashRouter;

```

ES6 module usage:

```javascript

import { url, hashRouter } from '@yagni-js/yagni-parser';

```


## Documentation

Not yet available, please check sources.


## Example


```javascript

import { url, hashRouter } from '@yagni-js/yagni-parser';


function fooHandler(match) {
    // ...
}

function bazHandler(match) {
    // ...
}

const routes = [
  url(/^foo/, fooHandler),
  url(/^baz\/\d+$/, bazHandler)
];

const router = hashRouter(routes);

window.addEventListener('hashchange', router, false);


```


## License

[Unlicense][unlicense]


[eslint-plugin-fp]: https://github.com/jfmengels/eslint-plugin-fp
[eslint-plugin-better]: https://github.com/idmitriev/eslint-plugin-better
[es6-modules]: https://hacks.mozilla.org/2015/08/es6-in-depth-modules/
[rollup]: https://rollupjs.org/
[unlicense]: http://unlicense.org/
