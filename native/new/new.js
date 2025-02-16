// New工作原理：
// 1、创建一个新对象 ：创建一个新的空对象。
// 2、设置原型链 ：将这个新对象的原型 (__proto__) 指向构造函数的 prototype 属性。
// 3、执行构造函数 ：将构造函数的 this 绑定到新创建的对象，并执行构造函数。
// 4、返回对象 ：如果构造函数返回一个对象，则返回该对象；否则返回新创建的对象。
function MyNew(constructor, ...args){
	const obj = Object.create(constructor.prototype)
	const result = constructor.apply(obj, args)
	return typeof result === 'object' && result !== null ? result : obj
}

module.exports = MyNew