import { taskMan } from "./TaskManager";
import { Interval } from "./Routine";

class Schedule {
	constructor(task, interval, date) {
		this.task = task;
		this.time = interval;
		this.date = date;
	}
}

class Scheduler {
	constructor() {
		this.schedules = [];
	}

	createSchedule() {
		while (!taskMan.tasks.isEmpty()) {
			let task = taskMan.tasks.dequeue();
			const deadline = new Date(task.deadline);

			if(deadline.getTime() > Date.now()){
				this.assignTask(task);
			}
		}
	}

	assignTask(task) {
		for (let day of taskMan.days) {
			
			for (let interval of day.intervals) {
				const length = Number(task.duration);

				if (interval.length >= length) {
					// console.log("Got a space")
					// break;
					let time = new Interval(
						interval.start,
						interval.start + length
					);

					day.removeInterval(time);

					this.schedules.push(new Schedule(task, time, day.date));

					return;
				}
			}
		}
	}

	tasksAvailable() {
		let tasks = taskMan.tasks;

		return !tasks.isEmpty();
	}
}

export const scheduler = new Scheduler();

