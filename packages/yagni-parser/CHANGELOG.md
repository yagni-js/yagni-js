# Changelog


## 0.4.1 (2019-07-25)

- [*] fixed parsing bug introduced after switching from SAXParser to Tokenizer
    (context variables within text nodes were processed as text)


## 0.4.0 (2019-07-21)

- [*] production dependency has been updated: parse5@5.1.0
- [*] peer dependencies have been updated: @yagni-js/yagni@0.7.1,
    @yagni-js/yagni-dom@2.2.0
- [*] dev dependencies have been updated: @yagni-js/yagni@0.7.1,
    @yagni-js/yagni-dom@2.2.0, eslint@6.1.0, eslint-plugin-import@2.18.2,
    mocha@6.2.0, reify@0.20.12, rollup@1.17.0, rollup-plugin-commonjs@10.0.1,
    rollup-plugin-eslint@7.0.0, rollup-plugin-node-resolve@5.2.0
- [*] license file has been added to distribution tarball
- [*] parsing logic has been updated to use Tokenizer instead of SAXParser


## 0.3.0 (2018-03-10)

- updated peer dependency `@yagni-js/yagni-dom@0.3.0`


## 0.2.1 (2018-03-09)

- fixed package dependencies (`parse5` moved to dependencies in `package.json`)


## 0.2.0 (2018-03-06)

- updated peer dependencies `@yagni-js/yagni@0.3.0`,
    `@yagni-js/yagni-dom@0.2.0`


## 0.1.1 (2018-02-24)

- moved `@yagni-js/yagni` to peer dependencies in `package.json`


## 0.1.0 (2018-02-19)

- initial release
