require('./bind.js');
describe('myBind', () => {
	test('正常使用bind函数', () => {
		const obj = { name: 'Alice' };
		const greet = function (greeting) {
			return `${greeting}, ${this.name}`;
		};
		const boundGreet = greet.myBind(obj);
		expect(boundGreet('Hello')).toBe('Hello, Alice');
	});
	test('在对象中调用bind函数', () => {
		const obj = {
			bind: Function.prototype.myBind
		};
		expect(() => obj.bind()).toThrow('Bind must be called on a function');
	});
	test('对返回的函数进行实例化操作', () => {
		const person = {
			name: 'Alice'
		};
		function greet(name, age) {
			this.money = 20;
			console.log(`Hello, ${name}! My name is ${this.name}, age is ${age}!`);
		}
		greet.prototype.carPrice = 10;
		const constructorFn = greet.myBind(person, 'Bob');
		const obj = new constructorFn(18);
		expect(obj.money).toBe(20);
		expect(obj.carPrice).toBe(10);
	});
});
