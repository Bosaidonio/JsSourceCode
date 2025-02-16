const MyInstanceOf = require('./instanceof')
describe('MyInstanceOf', () => {
	// 测试对象与构造函数的关系
	test('对象与其构造函数的instanceof关系', () => {
		const obj = {};
		const arr = [];
		const date = new Date();

		expect(MyInstanceOf(obj, Object)).toBe(true);
		expect(MyInstanceOf(arr, Array)).toBe(true);
		expect(MyInstanceOf(date, Date)).toBe(true);
	});

	// 测试继承关系
	test('测试继承关系', () => {
		class Animal {}
		class Dog extends Animal {}
		const dog = new Dog();

		expect(MyInstanceOf(dog, Dog)).toBe(true);
		expect(MyInstanceOf(dog, Animal)).toBe(true);
		expect(MyInstanceOf(dog, Object)).toBe(true);
	});

	// 测试原型链上不存在的关系
	test('测试不存在的instanceof关系', () => {
		const obj = {};
		const arr = [];

		expect(MyInstanceOf(obj, Array)).toBe(false);
		expect(MyInstanceOf(arr, Date)).toBe(false);
	});

	// 测试基本数据类型
	test('测试基本数据类型', () => {
		const num = 42;
		const str = 'hello';
		const bool = true;
		expect(MyInstanceOf(num, Number)).toBe(false);
		expect(MyInstanceOf(str, String)).toBe(false);
		expect(MyInstanceOf(bool, Boolean)).toBe(false);
	});

	// 测试null和undefined
	test('测试null和undefined', () => {
		expect(() => MyInstanceOf(null, Object)).toThrow();
		expect(() => MyInstanceOf(undefined, Object)).toThrow();
	});
});
