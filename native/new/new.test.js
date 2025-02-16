const MyNew = require('./new');
describe('MyNew', () => {
	// 测试基本构造函数调用
	it('应该正确创建基本对象', () => {
		function Person() {
			this.name = 'default';
		}
		Person.prototype.sayHi = function () {
			return 'Hi';
		};

		const person = MyNew(Person);

		expect(person instanceof Person).toBe(true);
		expect(person.name).toBe('default');
		expect(person.sayHi()).toBe('Hi');
	});

	// 测试带参数的构造函数
	it('应该正确处理构造函数参数', () => {
		function Person(name, age) {
			this.name = name;
			this.age = age;
		}

		const person = MyNew(Person, 'Alice', 25);

		expect(person.name).toBe('Alice');
		expect(person.age).toBe(25);
	});

	// 测试构造函数返回对象的情况
	it('当构造函数返回对象时应该返回该对象', () => {
		function SpecialPerson() {
			return { special: true };
		}

		const person = MyNew(SpecialPerson);

		expect(person instanceof SpecialPerson).toBe(false);
		expect(person.special).toBe(true);
	});

	// 测试构造函数返回原始值的情况
	it('当构造函数返回原始值时应该返回新创建的对象', () => {
		function ReturnPrimitive() {
			this.value = 'object value';
			return 42;
		}

		const obj = MyNew(ReturnPrimitive);

		expect(obj instanceof ReturnPrimitive).toBe(true);
		expect(obj.value).toBe('object value');
	});
});
