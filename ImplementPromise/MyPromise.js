// 自定义实现的 Promise 类
class MyPromise {
	// 定义 Promise 的三种状态
	static STATE_PENDING = 'pending'; // 等待中
	static STATE_FULFILLED = 'fulfilled'; // 已成功
	static STATE_REJECTED = 'rejected'; // 已失败

	// 构造函数，接收一个执行器函数 executor
	constructor(executor) {
		// 初始状态是等待中
		this.state = MyPromise.STATE_PENDING;
		this.value = undefined; // 成功时的返回值
		this.reason = undefined; // 失败时的原因
		this.onFulfilledCallbacks = []; // 存储成功回调函数
		this.onRejectedCallbacks = []; // 存储失败回调函数

		// resolve 函数，改变 Promise 状态为 fulfilled
		const resolve = value => {
			// 只有在状态为等待中时才能改变状态
			if (this.state === MyPromise.STATE_PENDING) {
				this.state = MyPromise.STATE_FULFILLED; // 改为已成功
				this.value = value;
				// 执行所有的成功回调
				this.onFulfilledCallbacks.forEach(callback => callback());
			}
		};

		// reject 函数，改变 Promise 状态为 rejected
		const reject = reason => {
			// 只有在状态为等待中时才能改变状态
			if (this.state === MyPromise.STATE_PENDING) {
				this.state = MyPromise.STATE_REJECTED; // 改为已失败
				this.reason = reason;
				// 执行所有的失败回调
				this.onRejectedCallbacks.forEach(callback => callback());
			}
		};

		// 执行 executor 函数，传入 resolve 和 reject
		try {
			executor(resolve, reject);
		} catch (error) {
			// 捕获异常并调用 reject
			reject(error);
		}
	}

	// 静态 resolve 方法，用于返回一个已解决的 Promise
	static resolve(value) {
		// 如果已是 Promise，直接返回
		if (value instanceof MyPromise) return value;
		// 否则，返回一个新的已解决 Promise
		return new MyPromise(resolve => resolve(value));
	}

	// 静态 reject 方法，用于返回一个已拒绝的 Promise
	static reject(value) {
		// 如果已是 Promise，直接返回
		if (value instanceof MyPromise) return value;
		// 否则，返回一个新的已拒绝 Promise
		return new MyPromise((_, reject) => reject(value));
	}

	// 用于处理返回值是否是 Promise 的方法
	resolvePromise(promise2, returnValue, resolve, reject) {
		// 防止循环引用，Promise 不能解决自己
		if (promise2 === returnValue) {
			return reject(new TypeError('返回值重复引用'));
		}

		let isResolved = false; // 标记是否已解决

		// 如果返回值是对象或函数，可能是另一个 Promise
		if (returnValue !== null && (typeof returnValue === 'object' || typeof returnValue === 'function')) {
			const then = returnValue.then; // 获取返回值的 then 方法
			try {
				// 如果 then 是函数，继续处理返回值
				if (typeof then === 'function') {
					then.call(
						returnValue,
						resolveValue => {
							// 如果已解决，跳过
							if (isResolved) return;
							isResolved = true;
							// 递归解析返回值
							this.resolvePromise(promise2, resolveValue, resolve, reject);
						},
						error => {
							// 如果已解决，跳过
							if (isResolved) return;
							isResolved = true;
							// 如果返回值是拒绝的，直接 reject
							reject(error);
						}
					);
				} else {
					// 如果返回值没有 then 方法，直接 resolve
					resolve(returnValue);
				}
			} catch (e) {
				// 捕获异常并 reject
				if (isResolved) return;
				isResolved = true;
				reject(e);
			}
		} else {
			// 如果返回值是普通值，直接 resolve
			resolve(returnValue);
		}
	}

	// then 方法，用于链式调用
	then(onFulfilled, onRejected) {
		// 创建一个新的 Promise
		const promise2 = new MyPromise((resolve, reject) => {
			// 处理成功回调
			const handleFulfilled = () => {
				setTimeout(() => {
					// 异步执行回调
					try {
						// 调用 onFulfilled 函数并处理返回值
						const result = onFulfilled(this.value);
						// 递归处理返回值
						this.resolvePromise(promise2, result, resolve, reject);
					} catch (error) {
						// 如果回调抛出异常，reject
						reject(error);
					}
				});
			};

			// 处理失败回调
			const handleRejected = () => {
				setTimeout(() => {
					// 异步执行回调
					try {
						// 调用 onRejected 函数并处理返回值
						const result = onRejected(this.reason);
						// 递归处理返回值
						this.resolvePromise(promise2, result, resolve, reject);
					} catch (error) {
						// 如果回调抛出异常，reject
						reject(error);
					}
				});
			};

			// 根据当前 Promise 的状态，执行相应的回调
			if (this.state === MyPromise.STATE_FULFILLED) {
				handleFulfilled();
			} else if (this.state === MyPromise.STATE_REJECTED) {
				handleRejected();
			} else if (this.state === MyPromise.STATE_PENDING) {
				// 如果是等待中状态，保存回调，待状态改变后执行
				this.onFulfilledCallbacks.push(handleFulfilled);
				this.onRejectedCallbacks.push(handleRejected);
			}
		});
		return promise2; // 返回新的 Promise
	}

	// catch 方法，用于处理 Promise 的拒绝情况
	catch(onRejected) {
		return this.then(null, onRejected); // 只处理拒绝回调
	}

	// finally 方法，无论成功或失败，都会执行一次回调
	finally(onFinally) {
		// 在执行完成功或失败回调后，都会执行 onFinally
		return this.then(
			value => MyPromise.resolve(onFinally?.()).then(() => value), // 如果成功，执行 onFinally 并返回原值
			reason =>
				MyPromise.resolve(onFinally?.()).then(() => {
					throw reason; // 如果失败，执行 onFinally 并重新抛出拒绝原因
				})
		);
	}

	// 静态 all 方法，用于等待多个 Promise 都完成并返回一个包含结果的数组
	static all(promises) {
		return new MyPromise((resolve, reject) => {
			const result = []; // 存储所有 Promise 的结果
			let count = 0; // 已完成的 Promise 数量

			// 遍历所有 Promise，处理每个 Promise 的结果
			promises.forEach((promise, index) => {
				MyPromise.resolve(promise).then(value => {
					// 将每个 Promise 的结果存储在 result 数组中
					result[index] = value;
					count++;
					// 当所有 Promise 完成时，返回结果数组
					if (count === promises.length) {
						resolve(result);
					}
				}, reject); // 如果有 Promise 拒绝，直接 reject
			});
		});
	}

	// 静态 race 方法，返回第一个完成的 Promise
	static race(promises) {
		return new MyPromise((resolve, reject) => {
			// 遍历所有 Promise，返回第一个完成的 Promise
			promises.forEach(promise => {
				MyPromise.resolve(promise).then(resolve, reject);
			});
		});
	}

	// 静态 allSettled 方法，用于等待所有 Promise 都完成，无论成功或失败
	static allSettled(promises) {
		return new MyPromise((resolve, reject) => {
			const result = []; // 存储所有 Promise 的结果
			let count = 0; // 已完成的 Promise 数量

			// 遍历所有 Promise，处理每个 Promise 的结果
			promises.forEach((promise, index) => {
				MyPromise.resolve(promise)
					.then(
						value => {
							// 如果成功，记录状态和值
							result[index] = {
								status: MyPromise.STATE_FULFILLED,
								value
							};
						},
						reason => {
							// 如果失败，记录状态和原因
							result[index] = {
								status: MyPromise.STATE_REJECTED,
								reason
							};
						}
					)
					.finally(() => {
						count++;
						// 当所有 Promise 都完成时，返回结果数组
						if (count === promises.length) {
							resolve(result);
						}
					});
			});
		});
	}
}
