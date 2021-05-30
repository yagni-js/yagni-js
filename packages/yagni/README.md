# yagni

Yet another **pure functional** frontend library.

**Pure functional** in this context means functional code style - library code is
linted using [eslint-plugin-functional][eslint-plugin-functional] and
[eslint-plugin-better][eslint-plugin-better]. Javascript code is purely
functional with some exceptions:

- `tap()` function, used for controllable side effects,
- `mutate()` function, used for controllable mutations,
- `always()` function, used to always return the same value,
- `lazy()` function, used for lazy calculations,
- `promise()` function, used to create new Promise instance.


## Installation

Using `npm`:

```shell

$ npm install --save-dev @yagni-js/yagni

```

Using `yarn`:

```shell

$ yarn add -D @yagni-js/yagni

```

## Usage

Source code is written using [ES6 modules][es6-modules], built using
[rollup][rollup] and distributed in two formats - as CommonJS module and as
ES6 module.

CommonJS usage:

```javascript

const _ = require('@yagni-js/yagni');

```

ES6 module usage:

```javascript

import * as _ from '@yagni-js/yagni';
// or
import { pipe, transform, map } from '@yagni-js/yagni';

```


## Documentation

Not yet available, please check sources.


## Example

Here is a function to convert an array of objects to http request query string:


```javascript

import * as _ from '@yagni-js/yagni';


const toQuery = _.pipe([
  _.map(
    _.pipe([
      _.transformArr([
        _.pick('key'),
        _.pipe([
          _.pick('value'),
          encodeURIComponent
        ])
      ]),
      _.join('=')
    ])
  ),
  _.join('&'),
  _.concat('?')
]);

```

Having input as:

```javascript

const params = [
  {key: 'name', value: 'John Smith'},
  {key: 'age', value: 35},
  {key: 'country', value: 'UK'}
];


```

the result will be the following:

```javascript

const query = toQuery(params);
// query === '?name=John%20Smith&age=35&country=UK'

```


## License

[Unlicense][unlicense]


[eslint-plugin-functional]: https://github.com/jonaskello/eslint-plugin-functional
[eslint-plugin-better]: https://github.com/idmitriev/eslint-plugin-better
[es6-modules]: https://hacks.mozilla.org/2015/08/es6-in-depth-modules/
[rollup]: https://rollupjs.org/
[unlicense]: http://unlicense.org/
