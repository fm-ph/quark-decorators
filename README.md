# [<img src="logo.png" alt="quark-decorators" width="200">](https://github.com/fm-ph/quark-decorators)

[![build status][travis-image]][travis-url]
[![stability][stability-image]][stability-url]
[![npm version][npm-image]][npm-url]
[![js-standard-style][standard-image]][standard-url]
[![semantic-release][semantic-release-image]][semantic-release-url]

Simple [decorators](https://medium.com/google-developers/exploring-es7-decorators-76ecb65fb841) (ES2016) based on [__Decorator__](https://en.wikipedia.org/wiki/Decorator_pattern) design pattern.

___This package is part of `quark` framework but it can be used independently.___

## Installation

[![NPM](https://nodei.co/npm/quark-decorators.png)](https://www.npmjs.com/package/quark-decorators)

```sh
npm install quark-decorators --save
```

___Note___ : In order to use __decorators__ properly, you need a compiler like [__Babel 6__](https://babeljs.io/).

Also, you need to install [Babel legacy decorator plugin](https://github.com/loganfsmyth/babel-plugin-transform-decorators-legacy) :

```sh
npm install babel-plugin-transform-decorators-legacy --save-dev
```

And add the following line to your __Babel__ configuration :

```json
{
  "plugins": ["transform-decorators-legacy"]
}
```

## Usage

### Bind

___Method only___

Binds a class method to the current context.

```js
import { bind } from 'quark-decorators'

class Test {
  @bind
  test () {
    return this
  }
}

const testInstance = new Test()
const { test } = testInstance

console.log(test() === testInstance) // = true
```

### Mixin

___Class only___

Mixes object(s) with a class prototype.

#### Single mixin

```js
import { mixin } from 'quark-decorators'

const TestMixin = {
  test() {
    return true
  }
}

@mixin(TestMixin)
class Test { }

const testInstance = new Test()
console.log(testInstance.test()) // = true
```

#### Multiple mixins

```js
import { mixin } from 'quark-decorators'

const Test1Mixin = {
  test() {
    return true
  }
}

const Test2Mixin = {
  test() {
    return false
  }
}

@mixin(Test1Mixin, Test2Mixin)
class Test { }

const testInstance = new Test()
console.log(testInstance.test()) // = false (last mixin method value)
```

#### Mixin with multiple types property

```js
import { mixin } from 'quark-decorators'

const TestMixin = {
  foo: 'bar',
  foo() {
    return 'bar'
  }
}

@mixin(TestMixin)
class Test { }

const testInstance = new Test()
console.log(testInstance.foo) // = 'bar'
console.log(testInstance.foo()) // = 'bar'
```

## API

See [https://fm-ph.github.io/quark-decorators/](https://fm-ph.github.io/quark-decorators/)

## Build

To build the sources with `babel` in `./lib` directory :

```sh
npm run build
```

## Documentation

To generate the `JSDoc` :

```sh
npm run docs
```

To generate the documentation and deploy on `gh-pages` branch :

```sh
npm run docs:deploy
```

## Testing

To run the tests, first clone the repository and install its dependencies :

```sh
git clone https://github.com/fm_ph/quark-decorators.git
cd quark-decorators
npm install
```

Then, run the tests :

```sh
npm test
```

To watch (test-driven development) :

```sh
npm run test:watch
```

For coverage :

```sh
npm run test:coverage
```

## License

MIT [License](LICENSE.md) © [Patrick Heng](http://hengpatrick.fr/) [Fabien Motte](http://fabienmotte.com/) 

[travis-image]: https://img.shields.io/travis/fm-ph/quark-decorators/master.svg?style=flat-square
[travis-url]: http://travis-ci.org/fm-ph/quark-decorators
[stability-image]: https://img.shields.io/badge/stability-stable-brightgreen.svg?style=flat-square
[stability-url]: https://nodejs.org/api/documentation.html#documentation_stability_index
[npm-image]: https://img.shields.io/npm/v/quark-decorators.svg?style=flat-square
[npm-url]: https://npmjs.org/package/quark-decorators
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[standard-url]: https://github.com/feross/standard
[semantic-release-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square
[semantic-release-url]: https://github.com/semantic-release/semantic-release
