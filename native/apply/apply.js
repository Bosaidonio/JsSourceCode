Function.prototype.myApply = function (context, args) {
	// 检查调用myApply的是否为函数
	if (typeof this !== 'function') {
		throw new TypeError(`Apply must be called on a function`);
	}
	// 判断context是否为基本数据类型
	context = context ? Object(context) : globalThis;

	// 创建唯一的Symbol属性名，避免属性名冲突
	const symbolFn = Symbol('fn');

	// 将函数作为context的方法
	context[symbolFn] = this;
	// 判断参数是否为数组
	args =  Array.isArray(args) ? args : [];
	const result = context[symbolFn](...args);

	// 删除临时添加的方法
	delete context[symbolFn];

	// 返回函数执行结果
	return result;
};

