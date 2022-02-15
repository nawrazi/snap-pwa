import { scheduler } from "./Scheduler";
import { taskMan, Task } from "./TaskManager";

describe("Scheduler test", () => {
	test("task available", () => {
		expect(scheduler.tasksAvailable()).toBe(false);
	});

	test("scheudle with empty tasks", () => {
		scheduler.createSchedule();
		expect(scheduler.schedules).toStrictEqual([]);
	});

	test("scheudle with a tasks", () => {
		const now = new Date(Date.now() + 2 * 24 * 60 * 60000);
		const newTask = new Task("test task", 10, 0, now);

		taskMan.addTask(newTask);
		taskMan.saveState();
		taskMan.init();

		taskMan.initDays();

		scheduler.createSchedule();
		expect(scheduler.schedules.length).toBe(1);
	});

	test("scheudle with a missed task", () => {
        taskMan.taskList= [];
        scheduler.schedules = [];
		const now = new Date(Date.now() - 10 * 24 * 60 * 60000);
		const newTask = new Task("test task", 10, 0, now);

		taskMan.addTask(newTask);
		taskMan.saveState();
		taskMan.init();

		taskMan.initDays();

		scheduler.createSchedule();
		expect(scheduler.schedules.length).toBe(0);
	});
});
