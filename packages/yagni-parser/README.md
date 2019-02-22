# yagni-parser


HTML to Javascript compiler. Generated code is compatible with
[yagni-dom][yagni-dom] hyperscript dialect.

Library code is linted using [eslint-plugin-fp][eslint-plugin-fp] and
[eslint-plugin-better][eslint-plugin-better]. The code is almost purely
functional with one exception - `src/sax.js` module which contains parsing
logic (this module is excluded from linting).

Parsing logic is based on [parse5][parse5] library, on [SAXParser][SAXParser].

This library is **not expected** to be used on it's own but as an engine for
[rollup plugin][rollup-plugin-yagni] and [webpack loader][yagni-loader].


## Features

TBD


## Installation

Using `npm`:

```shell

$ npm install --save-dev @yagni-js/yagni-parser @yagni-js/yagni-dom

```

Using `yarn`:

```shell

$ yarn add -D @yagni-js/yagni-parser @yagni-js/yagni-dom

```

## Usage

Source code is written using [ES6 modules][es6-modules], built using
[rollup][rollup] and distributed in two formats - as CommonJS module and as
ES6 module.

CommonJS usage:

```javascript

const yp = require('@yagni-js/yagni-parser');

```

ES6 module usage:

```javascript

import * as yp from '@yagni-js/yagni-parser';
// or
import { parse } from '@yagni-js/yagni-parser';

```


## Documentation

Not yet available, please check sources.


## Example

Suppose we have the following HTML template:

```html

<div class="root">
    <div class="header">
        <h1>Header</h1>
        <partial src="./login-form.html" p-if-not="ctx.user.isLoggedIn"></partial>
        <partial src="./logout-form.html" p-if="ctx.user.isLoggedIn"></partial>
    </div>
    <div class="main">
        <div class="sidebar">
            <nav class="mainmenu">
                <partial src="./menu/item.html" p-map="ctx.mainmenu"></partial>
            </nav>
        </div>
        <div class="content" id="content">
            <div class="content-body" id="content-body">Content</div>
            <nav class="relatedmenu">
                <partial src="./menu/item.html" p-if="ctx.showRelatedMenu" p-map="ctx.relatedmenu" related="yes"></partial>
            </nav>
        </div>
    </div>
    <div class="footer">Footer</div>
</div>

```

After compilation it will be translated into the following code:

```javascript

import { isArray, merge, pipe } from "@yagni-js/yagni";
import { h } from "@yagni-js/yagni-dom";
import { view as loginFormView } from "./login-form.html";
import { view as logoutFormView } from "./logout-form.html";
import { view as itemView } from "./menu/item.html";


export function view(ctx) {
  return h("div", {"class": "root"}, {}, [
    h("div", {"class": "header"}, {}, [
      h("h1", {}, {}, [
        "Header"
      ]),
      !(ctx.user.isLoggedIn) ? (loginFormView(ctx)) : "",
      (ctx.user.isLoggedIn) ? (logoutFormView(ctx)) : ""
    ]),
    h("div", {"class": "main"}, {}, [
      h("div", {"class": "sidebar"}, {}, [
        h("nav", {"class": "mainmenu"}, {}, [
          isArray(ctx.mainmenu) ? ctx.mainmenu.map(itemView) : ""
        ])
      ]),
      h("div", {"class": "content", "id": "content"}, {}, [
        h("div", {"class": "content-body", "id": "content-body"}, {}, [
          "Content"
        ]),
        h("nav", {"class": "relatedmenu"}, {}, [
          (ctx.showRelatedMenu) ? (isArray(ctx.relatedmenu) ? ctx.relatedmenu.map(pipe([merge({"related": "yes"}), itemView])) : "") : ""
        ])
      ])
    ]),
    h("div", {"class": "footer"}, {}, [
      "Footer"
    ])
  ]);
}

```


## License

[Unlicense][unlicense]


[eslint-plugin-fp]: https://github.com/jfmengels/eslint-plugin-fp
[eslint-plugin-better]: https://github.com/idmitriev/eslint-plugin-better
[es6-modules]: https://hacks.mozilla.org/2015/08/es6-in-depth-modules/
[yagni-dom]: https://github.com/yagni-js/yagni-dom
[yagni-loader]: https://github.com/yagni-js/yagni-loader
[rollup-plugin-yagni]: https://github.com/yagni-js/rollup-plugin-yagni
[parse5]: http://inikulin.github.io/parse5/
[SAXParser]: http://inikulin.github.io/parse5/classes/saxparser.html
[rollup]: https://rollupjs.org/
[webpack]: https://webpack.js.org/
[unlicense]: http://unlicense.org/
