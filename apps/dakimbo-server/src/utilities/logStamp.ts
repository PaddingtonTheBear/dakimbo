const log = console.log;
console.log = function() {
	const firstParameter = arguments[0];
	const otherParameters = Array.prototype.slice.call(arguments, 1);
	log.apply(console, [`${dateFormat()} ${firstParameter}`.concat(otherParameters)]);
};

const error = console.error;
console.error = function() {
	const firstParameter = arguments[0];
	const otherParameters = Array.prototype.slice.call(arguments, 1);
	error.apply(console, [`${dateFormat()} ${firstParameter}`.concat(otherParameters)]);
};

const dateFormat = () => {
	return `[\x1b[34m${new Date().toISOString()}\x1b[0m]`;
};
