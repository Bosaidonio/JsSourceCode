// 编写call函数单元测试
require('./call');
describe('call', () => {
	it('正常情况', () => {
		function greet(name) {
			console.log(`Hello, ${name}! My name is ${this.name}.`);
		}
		const person = { name: 'Alice' };
		greet.myCall(person, 'Bob');
	});
	it('当输入为null或undefined的时候', () => {
		function add(a, b) {
			return a + b;
		}
		const result1 = add.myCall(null, 2, 3);
		const result2 = add.myCall(undefined, 2, 3);
		expect(result1).toBe(5);
		expect(result2).toBe(5);
	});
	it('当call函数被对象调用时', () => {
		const obj = {
			call: Function.prototype.myCall
		};
		expect(() => obj.call(null, 'hello')).toThrow('Call must be called on a function');
	});
});
