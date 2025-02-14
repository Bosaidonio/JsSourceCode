Function.prototype.myApply = function (context, ...args) {
	if (typeof this !== 'function') {
		throw new TypeError(`Apply must be called on a function`);
	}
	context = context || globalThis;
	const symbolFn = Symbol('fn');
	context[symbolFn] = this;
	const result = context[symbolFn](...args);
	delete context[symbolFn];
	return result;
};
