
require('./apply');

describe('myApply', () => {
	it('正常情况', () => {
		const obj = {
			name: 'zhangsan',
			age: 18
		};
		function sayName(age) {
			return this.name + age;
		}
		expect(sayName.myApply(obj, [18])).toBe('zhangsan18');
	});
	it('context为null', () => {
		function sayName(age) {
			return age;
		}
		expect(sayName.myApply(null, [18])).toBe(18);
	});
	it('context为undefined', () => {
		function sayName(age) {
			return age;
		}
		expect(sayName.myApply(undefined, [18])).toBe(18);
	});
	it('context为非对象', () => {
		function sayName(age) {
			return age;
		}
		expect(sayName.myApply(1, [18])).toBe(18);
	});

});
