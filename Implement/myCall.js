Function.prototype.myCall = function (context, ...args) {
	// 当context为null或undefined时 设置为全局对象
	context = context || globalThis;
	// 通过Symbol创建唯一属性名
	const fnSymbol = Symbol('fn');
	// 缓存调用的函数(这里的this指向greet函数,因为greet函数调用了myCall)
	context[fnSymbol] = this;
	// 调用缓存的函数，并传入参数
	const result = context[fnSymbol](...args);
	// 移除临时添加的属性
	delete context[fnSymbol];
	return result;
};
function greet(name) {
	console.log(`Hello, ${name}! My name is ${this.name}.`);
}
const person = { name: 'Alice' };

greet.myCall(person, 'Bob');
