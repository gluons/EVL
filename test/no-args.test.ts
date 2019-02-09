import evl from '../dist';

describe('Call without arguments', () => {
	const a = 1;
	const b = 2;

	const aFunc = () => a;
	const bFunc = () => b;
	const errFunc = () => {
		throw new Error('An error.');
	};

	describe('Non-function as arguments', () => {
		it('should return main value when no error', () => {
			expect(evl(a, b)()).toEqual(a);
		});
		it('should return fallback value when error', () => {
			expect(evl(errFunc, b)()).toEqual(b);
		});
	});
	describe('Function as arguments', () => {
		it('should return value from main function when no error', () => {
			expect(evl(aFunc, bFunc)()).toEqual(a);
		});
		it('should return value from fallback function when error', () => {
			expect(evl(errFunc, bFunc)()).toEqual(b);
		});
		it('should return "null" when both functions have error', () => {
			expect(evl(errFunc, errFunc)()).toEqual(null);
		});
	});
});
