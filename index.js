'use strict';

module.exports = function (mainFunction, fallbackFunction) {
	try {
		return mainFunction();
	} catch (err) {
		return fallbackFunction();
	}
};
