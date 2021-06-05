# yagni-parser


HTML to Javascript compiler. Generated code is compatible with
[yagni-dom][yagni-dom] hyperscript dialect.

Library code is linted using [eslint-plugin-fp][eslint-plugin-fp] and
[eslint-plugin-better][eslint-plugin-better]. The code is almost purely
functional with the following exceptions:

- it throws an error if source html has multiple root elements
- it throws an error if opening/closing tags differ somewhere in html
- it throws an error if unclosed tags exist in html
- it uses `new` keyword to create new tokenizer to parse html
- it uses `node` `path` module to extract partial filename

The library uses `Tokenizer` from an excellent [parse5][parse5] library to
tokenize source html and convert it to [yagni-dom][yagni-dom] compatible ES6
module.

This library is **not expected** to be used on it's own, please use
[rollup plugin][rollup-plugin-yagni] or [webpack loader][yagni-loader] to
convert html to ES6 module.


## Features

- transforms source html to javascript function (so called `view` function),
    which can be called later to produce a factory function which when called
    will generate proper DOM tree
- generates unary `view` function - it accepts only one argument named `ctx`
    which is expected to be an object holding context to render view (perfectly
    suited for [yagni-dom][yagni-dom] library)
- supports concept of partials using `partial` tag (see below)
- supports `{{ ctx.foo }}` syntax in attribute/property value definition and in
    static text to allow access to passed into view function context (this
    syntax will be transpiled to ES6 template literal syntax - **be aware of
    supported browsers**)
- allows only single root tag in html template
- checks for dom tree structure simple errors
- strips whitespace from html
- allows to set tag properties values (use `prop-foo` attribute to set `foo`
    property value on tag)
- allows to set tag attribute or property value by reference using `@` as
    a prefix of attribute/property name: `@prop-onclick="ctx.onlick"` (useful
    to set tag event handlers)
- allows to use newline in attribute value definition (useful for readability
    sometimes)
- normalizes whitespace in tag attributes/properties values and in static text
    (replaces newlines to single whitespace, replaces multiple consecutive
    whitespace characters to single whitespace character)


## Partials

Partial is an html template which can be reused by html templates or other
partials.

To include partial in template you should use `partial` tag and specify path to
source using `src` attribute:

```html

<partial src="./foo.html"></partial>

```

Generated javascript module will be the following:

```js

import { view as fooView } from "./foo.html";

export function view(ctx) {
  return fooView(ctx);
}

```

Tag `partial` doesn't support any nested declarations (such as text or other
tags inside), they will be silently dropped.

Partial can be conditionally included using `p-if` or `p-if-not` tag
attributes:

```html

<div class="user-menu">
    <partial src="./login-form.html" p-if-not="ctx.user.isLoggedIn"></partial>
    <partial src="./logout-form.html" p-if="ctx.user.isLoggedIn"></partial>
</div>

```

Partial can me mapped over an array of items using `p-map` tag attribute:

```html

<nav class="mainmenu">
    <partial src="./menu/item.html" p-map="ctx.mainmenu"></partial>
</nav>

```

Partial can use `p-map` and `p-if/p-if-not` attributes simultaneously, which
means partial will be mapped over an array of items only if `p-if/p-if-not`
condition evaluates to `true`:

```html

<nav class="relatedmenu">
    <partial src="./menu/item.html" p-if="ctx.showRelatedMenu" p-map="ctx.relatedmenu" related="yes"></partial>
</nav>

```


## Installation

Using `npm`:

```shell

$ npm install --save-dev @yagni-js/yagni-parser @yagni-js/yagni-dom @yagni-js/yagni

```

Using `yarn`:

```shell

$ yarn add -D @yagni-js/yagni-parser @yagni-js/yagni-dom @yagni-js/yagni

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
import { h, hText, hSkip } from "@yagni-js/yagni-dom";
import { view as loginFormView } from "./login-form.html";
import { view as logoutFormView } from "./logout-form.html";
import { view as itemView } from "./menu/item.html";


export function view(ctx) {
  return h("div", {"class": "root"}, {}, [
    h("div", {"class": "header"}, {}, [
      h("h1", {}, {}, [
        hText("Header")
      ]),
      !(ctx.user.isLoggedIn) ? (loginFormView(ctx)) : hSkip(),
      (ctx.user.isLoggedIn) ? (logoutFormView(ctx)) : hSkip()
    ]),
    h("div", {"class": "main"}, {}, [
      h("div", {"class": "sidebar"}, {}, [
        h("nav", {"class": "mainmenu"}, {}, [
          isArray(ctx.mainmenu) ? ctx.mainmenu.map(itemView) : hSkip()
        ])
      ]),
      h("div", {"class": "content", "id": "content"}, {}, [
        h("div", {"class": "content-body", "id": "content-body"}, {}, [
          hText("Content")
        ]),
        h("nav", {"class": "relatedmenu"}, {}, [
          (ctx.showRelatedMenu) ? (isArray(ctx.relatedmenu) ? ctx.relatedmenu.map(pipe([merge({"related": "yes"}), itemView])) : hSkip()) : hSkip()
        ])
      ])
    ]),
    h("div", {"class": "footer"}, {}, [
      hText("Footer")
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
[parse5]: https://github.com/inikulin/parse5/blob/master/packages/parse5/docs/index.md
[rollup]: https://rollupjs.org/
[webpack]: https://webpack.js.org/
[unlicense]: http://unlicense.org/
