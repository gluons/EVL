'use strict';

const assert = require('assert');
const evl = require('../index');

describe('Immediately call', () => {
	let a = 1;
	let b = 2;

	let aFunc = () => a;
	let bFunc = () => b;
	let errFunc = () => {
		throw new Error('An error.');
	};

	describe('Non-function as arguments', () => {
		it('should return main value when no error', () => {
			let result = evl(a, b);
			assert.strictEqual(result, a);
		});
		it('should return fallback value when error', () => {
			let result = evl(errFunc, b);
			assert.strictEqual(result, b);
		});
	});
	describe('Function as arguments', () => {
		it('should return value from main function when no error', () => {
			let result = evl(aFunc, bFunc);
			assert.strictEqual(result, a);
		});
		it('should return value from fallback function when error', () => {
			let result = evl(errFunc, bFunc);
			assert.strictEqual(result, b);
		});
	});
});

describe('Passing arguments', () => {
	let a = 1;
	let b = 2;

	let aArgument = 3;
	let bArgument = 4;
	let cArgument = 5;

	let add = function () {
		return Array.prototype.reduce.call(arguments, (acc, elem) => acc + elem, 0);
	};
	let multiply = function () {
		return Array.prototype.reduce.call(arguments, (acc, elem) => acc * elem, 1);
	};
	let errFunc = () => {
		throw new Error('An error.');
	};

	describe('Non-function as arguments', () => {
		it('should return main value when no error', () => {
			let result = evl(a, b, false)(aArgument, bArgument);
			assert.strictEqual(result, a);
		});
		it('should return fallback value when error', () => {
			let result = evl(errFunc, b, false)(aArgument, bArgument);
			assert.strictEqual(result, b);
		});
	});
	describe('Function as arguments', () => {
		describe('Same arguments', () => {
			it('should return value from main function when no error', () => {
				let result = evl(add, multiply, false)(aArgument, bArgument);
				assert.strictEqual(result, add(aArgument, bArgument));
			});
			it('should return value from fallback function when error', () => {
				let result = evl(errFunc, multiply, false)(aArgument, bArgument);
				assert.strictEqual(result, multiply(aArgument, bArgument));
			});
		});
		describe('Different arguments', () => {
			it('should return value from main function when no error', () => {
				let result = evl(add, multiply, false)([aArgument, bArgument, cArgument], [bArgument, cArgument]);
				assert.strictEqual(result, add(aArgument, bArgument, cArgument));
			});
			it('should return value from fallback function when error', () => {
				let result = evl(errFunc, multiply, false)([aArgument, bArgument, cArgument], [bArgument, cArgument]);
				assert.strictEqual(result, multiply(bArgument, cArgument));
			});
		});
	});
});
