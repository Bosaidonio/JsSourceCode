const MyPromise = require('./promise');

describe('MyPromise', () => {
	it('正常resolve', () => {
		const promise = new MyPromise((resolve, reject) => {
			resolve('success');
		});
		return promise.then(value => {
			expect(value).toBe('success');
		});
	});
	it('正常reject', () => {
		const promise = new MyPromise((resolve, reject) => {
			reject('failed');
		});
		return promise.catch(reason => {
			expect(reason).toBe('failed');
		});
	});
	it('当then返回一个promise', () => {
		const p1 = new MyPromise((resolve, reject) => {
			resolve('p1');
		});
		const p2 = new MyPromise((resolve, reject) => {
			resolve('p2');
		});

		return p2
			.then(value => {
				return p1;
			})
			.then(value => {
				expect(value).toBe('p1');
			});
	});
	it('当then的返回值为调用者时', () => {
		const p1 = new MyPromise((resolve, reject) => {
			resolve('p1');
		});
		return p1
			.then(value => {
				return p1;
			})
			.then(value => {
				expect(value).toBe('p1');
			});
	});
	it('当then的返回值为then返回值本身时', () => {
		const p1 = new MyPromise((resolve, reject) => {
			resolve('p1');
		});
		const p2 = p1.then(value => {
			return p2;
		});
		return p2.catch(error => {
			expect(error).toBeInstanceOf(TypeError);
			expect(error.message).toBe('返回值重复引用');
		});
	});
});
