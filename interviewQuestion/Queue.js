// 要求用JS实现一个带并发限制的异步调度器Scheduler，保证同时运行的任务最多有两个。
class Scheduler {
	constructor(maxValue) {
		// 最大并发数
		this.maxValue = maxValue
		// 存储异步任务队列
		this.queueList = []
		// 当前正在运行的异步任务个数
		this.runningCount = 0
	}

	add(time,name){
		const taskItem = () => {
			return new Promise((resolve,reject) => {
				setTimeout(() => {
					console.log(name);
					resolve()
				},time)
			})
		}
		this.queueList.push(taskItem)
	}
	run(){
		// 当队列清空或当前异步任务执行数量大于指定异步任务个数时返回
		if(this.queueList.length < 1 || this.runningCount >= this.maxValue){
			return
		}
		this.runningCount++
		// 从队列中取出异步任务
		const task = this.queueList.shift()
		task().finally(() => {
			this.runningCount--
			this.run()
		})
	}
	start(){
		for(let i = 0; i < this.maxValue; i++){
			this.run()
		}
	}
}
const scheduler = new Scheduler(2);
const addTask = (time, name) => {
	scheduler.add(time, name);
};

addTask(1000,"1"); // 1000ms后输出1
addTask(500,"2");  // 500ms后输出2
addTask(600,"3"); // 1100ms后输出3
addTask(400,"4"); // 1400ms后输出4
scheduler.start();
