# EVL
[![license](https://img.shields.io/github/license/gluons/EVL.svg?style=flat-square)](https://github.com/gluons/EVL/blob/master/LICENSE)
[![npm](https://img.shields.io/npm/v/evl.svg?style=flat-square)](https://www.npmjs.com/package/evl)
[![npm](https://img.shields.io/npm/dt/evl.svg?style=flat-square)](https://www.npmjs.com/package/evl)
[![Travis](https://img.shields.io/travis/gluons/EVL.svg?style=flat-square)](https://travis-ci.org/gluons/EVL)
[![TSLint](https://img.shields.io/badge/TSLint-gluons-15757B.svg?style=flat-square)](https://github.com/gluons/tslint-config-gluons)

😈 Function fallback when error.

> Likes [NVL](https://github.com/gluons/NVL) but for **Error** fallback.

## Installation

**Via [npm](https://www.npmjs.com/):**

[![NPM](https://nodei.co/npm/evl.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/evl)

```
npm install evl
```

**Via [Yarn](https://yarnpkg.com):**

```
yarn add evl
```

## Usage

```javascript
const evl = require('evl');

const err = () => {
	throw new Error('An error. 😱');
};
const one = () => 1;
const two = () => 2;
const add = (a, b) => a + b;
const multiply = (a, b) => a * b;

/*
 * Simple usage
 */
const a = evl(one, two)(); // a is 1
const b = evl(err, two)(); // b is 2

/*
 * With arguments
 */
// To call add(1, 2) or multiply(3, 4)
const c = evl(add, multiply)([1, 2], [3, 4]); // c is 3 (1 + 2 from add function)
// To call err(1, 2) or multiply(3, 4)
const d = evl(err, multiply)([1, 2], [3, 4]); // d is 12 (3 * 4 from multiply function)
```

You can also pass **non-function**.

```javascript
const evl = require('evl');

const err = () => {
	throw new Error('An error. 💩');
};

evl(err, 'I am fallback value.') // -> 'I am fallback value.'
```

## API

### `evl(mainFunction, fallbackFunction)`

Create an invoke function that will return the value from either of given functions.

#### mainFunction
Type: `Function`

A **main function** that you expect it to work.

> If you pass **non-function** value to this parameter, `evl` will return it back from **invoke** function.

#### fallbackFunction
Type: `Function`

A **fallback function** that will work when **main function** throw an error.

> If you pass **non-function** value to this parameter, `evl` will return it back from **invoke** function when **main function** not work.

---

### `invoke(mainFuncArgs, fallbackFuncArgs)` - Invoke Function

Return a value of either of given functions with given arguments.

> If both `mainFunction` and `fallbackFunction` have error, `invoke` will return `null`.

#### mainFuncArgs
Type: `Array`  
Default: `[]`

Arguments of `evl`'s `mainFunction`.

#### fallbackFuncArgs
Type: `Array`  
Default: `[]`

Arguments of `evl`'s `fallbackFunction`.
