# EVL
[![license](https://img.shields.io/github/license/gluons/EVL.svg?style=flat-square)](https://github.com/gluons/EVL/blob/master/LICENSE)
[![npm](https://img.shields.io/npm/v/evl.svg?style=flat-square)](https://www.npmjs.com/package/evl)
[![npm](https://img.shields.io/npm/dt/evl.svg?style=flat-square)](https://www.npmjs.com/package/evl)
[![Travis](https://img.shields.io/travis/gluons/EVL.svg?style=flat-square)](https://travis-ci.org/gluons/EVL)
[![Dependency Status](https://dependencyci.com/github/gluons/EVL/badge?style=flat-square)](https://dependencyci.com/github/gluons/EVL)
[![ESLint Gluons](https://img.shields.io/badge/code%20style-gluons-9C27B0.svg?style=flat-square)](https://github.com/gluons/eslint-config-gluons)

😈 Function fallback when error.

> Likes [NVL](https://github.com/gluons/NVL) but for **Error** fallback.

## Installation

**Via [NPM](https://www.npmjs.com/):**

[![NPM](https://nodei.co/npm/nvl.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/evl)

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

let err = () => {
	throw new Error('An error. 😱');
};
let one = () => 1;
let two = () => 2;
let add = (a, b) => a + b;
let multiply = (a, b) => a * b;

/*
 * Simple usage
 */
let a = evl(one, two); // a is 1
let b = evl(err, two); // b is 2

/*
 * With same arguments
 */
// To call add(1, 2) or multiply(1, 2)
let c = evl(add, multiply, false)(1, 2); // c is 3 (1 + 2 from add function)
// To call err(1, 2) or multiply(1, 2)
let d = evl(err, multiply, false)(1, 2); // d is 2 (1 * 2 from multiply function)

/*
 * With different arguments
 */
// To call add(1, 2) or multiply(3, 4)
let e = evl(add, multiply, false)([1, 2], [3, 4]); // e is 3 (1 + 2 from add function)
// To call err(1, 2) or multiply(3, 4)
let f = evl(err, multiply, false)([1, 2], [3, 4]); // f is 12 (3 * 4 from multiply function)
```

You can also pass **non-function** as argument.

```javascript
const evl = require('evl');
let err = () => {
	throw new Error('An error. 💩');
};

evl(err, 'I am fallback value.') // -> 'I am fallback value.'
```

## API

### evl(mainFunction, fallbackFunction, [noArguments])

#### mainFunction
Type: `Function`

A **main function** that you expect it to work.

> If you pass **non-function** value to this parameter, `evl` will return it back.
  Because it can't be called. So it can't throw an error.

#### fallbackFunction
Type: `Function`

A **fallback function** that will work when **main function** throw an error.

> If you pass **non-function** value to this parameter, `evl` will return that value back when **main function** not work.

#### noArguments
Type: `Boolean`  
Default: `true`

If `true`, `evl` will call the **main function** or **fallback function** and return the value back instantly.  
If `false`, `evl` will return the `invoke` function.

---

### Invoke Function

- #### invoke([args...])
  Return: `Any`

  Call **main function** or **fallback function** with all `arguments` from `invoke` function and return the value back.

- #### invoke(args)
  Return: `Any`

  Call **main function** or **fallback function** with its own arguments and return the value back.

  ##### args
  Type: `Array`

  The arguments for **main function** and **fallback function**.
  - First element of `args` is the arguments of **main function**.
  - Second element of `args` is the arguments of **fallback function**.
