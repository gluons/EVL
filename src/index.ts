/**
 * Call main function and return value when successfully call.
 * Otherwise, call and return value from fallback function (or value).
 *
 * (`null` will be return when both functions are unsuccessfully called.)
 *
 * @exports
 * @template A1 Arguments of main function
 * @template A2 Arguments of fallback function
 * @template R1 Value of main function
 * @template R2 Value of fallback function
 * @param {(((...args1: A1) => R1) | R1)} mainFunction Main function or value
 * @param {(((...args2: A2) => R2) | R2)} fallbackFunction Fallback function or value
 * @returns A function that return value from either of given functions
 */
function evl<A1 extends any[], A2 extends any[], R1, R2>(
	mainFunction: ((...args1: A1) => R1) | R1,
	fallbackFunction: ((...args2: A2) => R2) | R2
) {
	return (mainArgs: A1 = [] as A1, fallbackArgs: A2 = [] as A2) => {
		try {
			if (typeof mainFunction !== 'function') {
				return mainFunction;
			}

			return (mainFunction as (...args1: A1) => R1)(...mainArgs);
		} catch (_) {
			if (typeof fallbackFunction !== 'function') {
				return fallbackFunction;
			}

			try {
				return (fallbackFunction as (...args2: A2) => R2)(
					...fallbackArgs
				);
			} catch (_) {
				return null;
			}
		}
	};
}

export = evl;
