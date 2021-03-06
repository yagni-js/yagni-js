# yagni-dom

Yet another **pure functional** DOM API related frontend library built on top
of [yagni][yagni] library.

**Pure functional** in this context means functional code style - library code is
linted using [eslint-plugin-functional][eslint-plugin-functional] and
[eslint-plugin-better][eslint-plugin-better]. Javascript code is purely
functional.


## Installation

Using `npm`:

```shell

$ npm install --save-dev @yagni-js/yagni-dom

```

Using `yarn`:

```shell

$ yarn add -D @yagni-js/yagni-dom

```

## Usage

Source code is written using [ES6 modules][es6-modules], built using
[rollup][rollup] and distributed in two formats - as CommonJS module and as
ES6 module.

CommonJS usage:

```javascript

const dom = require('@yagni-js/yagni-dom');

```

ES6 module usage:

```javascript

import * as dom from '@yagni-js/yagni-dom';
// or
import { h, hSVG, hText } from '@yagni-js/yagni-dom';

```


## Documentation

Not yet available, please check sources.


## Example

Here is an example of library usage:


```javascript

import { pipe } from '@yagni-js/yagni';
import { h, hText, render, firstChild } from '@yagni-js/yagni-dom';

const doc = window.document;

const renderToBody = pipe([
  render(doc.body),
  firstChild
]);

const layout = h('div', {class: 'root'}, {}, [
  h('div', {class: 'header'}, {}, [hText('Header')]),
  h('div', {class: 'main'}, {}, [
    h('div', {class: 'sidebar'}, {}, [hText('Sidebar')]),
    h('div', {class: 'content'}, {}, [hText('Content')])
  ]),
  h('div', {class: 'footer'}, {}, [hText('Footer')])
]);

const el = renderToBody(layout);

```

which is an equivalent to the following raw DOM API calls:

```javascript

const doc = window.document;

const root = doc.createElement('div');
const header = doc.createElement('div');
const main = doc.createElement('div');
const sidebar = doc.createElement('div');
const content = doc.createElement('div');
const footer = doc.createElement('div');

root.classList.add('root');
header.classList.add('header');
main.classList.add('main');
sidebar.classList.add('sidebar');
content.classList.add('content');
footer.classList.add('footer');

header.appendChild(doc.createTextNode('Header'));
sidebar.appendChild(doc.createTextNode('Sidebar'));
content.appendChild(doc.createTextNode('Content'));
footer.appendChild(doc.createTextNode('Footer'));

main.appendChild(sidebar);
main.appendChild(content);

root.appendChild(header);
root.appendChild(main);
root.appendChild(footer);

doc.body.appendChild(root);

```

## License

[Unlicense][unlicense]


[eslint-plugin-functional]: https://github.com/jonaskello/eslint-plugin-functional
[eslint-plugin-better]: https://github.com/idmitriev/eslint-plugin-better
[es6-modules]: https://hacks.mozilla.org/2015/08/es6-in-depth-modules/
[yagni]: https://github.com/yagni-js/yagni-js/tree/main/packages/yagni
[rollup]: https://rollupjs.org/
[unlicense]: http://unlicense.org/
