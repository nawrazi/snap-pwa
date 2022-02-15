import { TaskQueue } from "./PriorityQueue";
import { repository } from "./Repository";
import { TimeInterval } from "./Routine";
import { routineManager } from "./RoutineManager";
import { v4 as uuidv4 } from "uuid";

const DAYINMILL = 1000 * 3600 * 24;

export class Task {
	constructor(name, desc, duration, deadline, priority, location, color) {
		this.id = uuidv4();

		this.name = name;
		this.desc = desc;
		this.duration = duration;
		this.deadline = deadline;
		this.priority = priority;
		this.location = location;
		this.color = color;
	}
}

class TaskManager {
	constructor() {
		this.init();
	}

	init() {
		this.completedTask = repository.getTasks(true);
		this.taskList = repository.getTasks();
		this.tasks = new TaskQueue(repository.getTasks());

		this.days = [];
	}

	initDays() {
		if (!this.tasks.isEmpty()) {
			let now = new Date(); //

			let lastDay = this.tasks.farthestDeadline();

			// console.log(lastDay);
			if (typeof lastDay == "string") {
				lastDay = new Date(lastDay);
			}
			let daysInBetWeen = lastDay.getTime() - now.getTime();

			daysInBetWeen = Math.ceil(daysInBetWeen / DAYINMILL);

			this.days.push(new TimeInterval(new Date(Date.now() + 15 * 60000)));

			if (daysInBetWeen >= 2) {
				for (let i = 1; i < daysInBetWeen - 1; i++) {
					// get the time the date
					let cur = new Date(now.getTime() + i * DAYINMILL);
					// set the time to 00:00:00
					let day = new TimeInterval(new Date(cur), 0);

					this.days.push(day);
				}
			}

			// TODO
			if (daysInBetWeen > 2) {
				this.days.push(new TimeInterval(lastDay, 0, true));
			}
		}
	}

	allotRoutines() {
		this.days.forEach((day) => {
			routineManager.allocateRoutine(day);
		});
	}

	removeTask(task) {
		const result = this.taskList.filter((t) => {
			return t.id != task.id;
		});

		this.taskList = result;
		this.saveState();
	}

	addTask(task) {
		this.taskList.push(task);
	}

	addCompletedTask(task) {
		this.completedTask.push(task);
	}

	saveState() {
		repository.setTasks(this.taskList);
		repository.setTasks(this.completedTask, true);
	}
}

export const taskMan = new TaskManager();
