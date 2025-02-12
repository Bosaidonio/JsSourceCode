// bind函数实现注意细节：
// (1)bind函数本身可能被当做对象属性，直接调用
// (2)bind返回的函数可能被当做构造函数，进行实例化操作(new)
// (3)bind返回的函数需要继承原函数(greet)的原型链(prototype)，且为了操作返回函数时，不影响原函数，创建中间函数实例对象，进行中转
Function.prototype.myBind = function (context, ...args) {
	// (1) 防止bind函数被当做对象属性调用
	if (typeof this !== 'function') {
		throw new TypeError('Bind must be called on a function');
	}
	//
	const _self = this;
	const bound = function (...newArgs) {
		// (2) 通过this instanceof bound判断调用者是否在实例化返回函数，如果是，则让greet函数内部this失效，同时创建的实例对象继承greet的prototype属性
		const thisArrow = this instanceof bound ? this : context;
		return _self.apply(thisArrow, args.concat(newArgs));
	};
	// (3) 通过创建中间函数，并实例化，充当返回函数bound与调用者函数greet的中间人，防止修改bound函数时影响greet函数
	const tempFn = function () {};
	tempFn.prototype = _self.prototype;
	bound.prototype = new tempFn();
	return bound;
};

function greet(name, age) {
	console.log(`Hello, ${name}! My name is ${this.name}, age is ${age}!`);
}
const person = { name: 'Alice' };

greet.myBind(person, 'Bob')(18);
