// instanceof工作原理：
// left instanceof right
// 1、获取instanceof右侧构造函数的prototype属性
// 2、遍历instanceof左侧对象的原型链，通过__proto__逐级向上进行查找，直到找到与构造函数的 prototype 相匹配的对象，或者到达原型链的顶端（即 null）。
// 3、如果在原型链中找到了与构造函数的 prototype 相匹配的对象，则返回 true；否则返回 false。
function MyInstanceOf(left, right) {
	if (left === null || left === undefined) {
		throw new TypeError("Cannot read property '__proto__' of " + left);
	}

	// 如果是基本数据类型，直接返回false
	if (typeof left === 'number' || typeof left === 'string' || typeof left === 'boolean' || typeof left === 'symbol') {
		return false;
	}

	const prototype = right.prototype;
	let proto = left.__proto__;
	while (true) {
		if (proto === null) return false;
		if (proto === prototype) return true;
		proto = proto.__proto__;
	}
}
module.exports = MyInstanceOf;
