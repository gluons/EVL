import evl from '../dist';

describe('Call with arguments', () => {
	const a = 1;
	const b = 2;

	const aArgument = 3;
	const bArgument = 4;
	const cArgument = 5;

	const add = (...args: number[]): number => {
		return args.reduce((acc, value) => acc + value, 0);
	};
	const multiply = (...args: number[]): number => {
		return args.reduce((acc, value) => acc * value, 1);
	};
	const errFunc = (..._: any[]) => {
		throw new Error('An error.');
	};

	describe('Non-function as arguments', () => {
		const args = [aArgument, bArgument];

		it('should return main value when no error', () => {
			expect(evl(a, b)(args, args)).toEqual(a);
		});
		it('should return fallback value when error', () => {
			expect(evl(errFunc, b)([], args)).toEqual(b);
		});
	});
	describe('Function as arguments', () => {
		const args1 = [aArgument, bArgument, cArgument];
		const args2 = [bArgument, cArgument];

		it('should return value from main function when no error', () => {
			expect(evl(add, multiply)(args1, args2)).toEqual(add(...args1));
		});
		it('should return value from fallback function when error', () => {
			expect(evl(errFunc, multiply)(args1, args2)).toEqual(multiply(...args2));
		});
		it('should return "null" when both functions have error', () => {
			expect(evl(errFunc, errFunc)(args1, args2)).toEqual(null);
		});
	});
});
