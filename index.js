'use strict';

function evl(mainFunction, fallbackFunction, callNow = true) {
	if (typeof mainFunction !== 'function') {
		let mainValue = mainFunction;
		mainFunction = () => mainValue;
	}
	if (typeof fallbackFunction !== 'function') {
		let fallbackValue = fallbackFunction;
		fallbackFunction = () => fallbackValue;
	}

	if (callNow) {
		try {
			return mainFunction();
		} catch (e) {
			return fallbackFunction();
		}
	} else {
		return function invoke() {
			if ((arguments.length == 2) && Array.isArray(arguments[0]) && Array.isArray(arguments[1])) {
				try {
					return mainFunction.apply(this, arguments[0]);
				} catch (e) {
					return fallbackFunction.apply(this, arguments[1]);
				}
			} else {
				try {
					return mainFunction.apply(this, arguments);
				} catch (e) {
					return fallbackFunction.apply(this, arguments);
				}
			}
		};
	}
}

module.exports = evl;
