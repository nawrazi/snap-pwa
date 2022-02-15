import { Task, taskMan } from "./TaskManager";

describe("TaskManager", () => {
    test("add task", () => {
        const now = new Date();
        const newTask = new Task("test task", 10, 0, now);

        taskMan.addTask(newTask);

        expect(taskMan.taskList).toStrictEqual([newTask]);
    });

    test("remove task", () => {
        const now = new Date();
        const newTask = new Task("test task", 10, 0, now);

        // purge the list
        taskMan.taskList = [];

        taskMan.addTask(newTask);
        taskMan.removeTask(newTask);
        expect(taskMan.taskList).toStrictEqual([]);
    });

    test("init days", () => {
        const now = new Date(Date.now() + 3 * 24 * 60 *60000);
        const newTask = new Task("test task", 10, 0, now);

        taskMan.addTask(newTask);
        taskMan.saveState();
        taskMan.init();

        taskMan.initDays();

        expect(taskMan.days.length).toBe(3);
    })

    test("allotRoutine", () => {
        const now = new Date(Date.now() + 2 * 24 * 60 *60000);
        const newTask = new Task("test task", 10, 0, now);

        taskMan.addTask(newTask);
        taskMan.saveState();
        taskMan.init();
        taskMan.initDays();

        // expect(taskMan.days).toBe(2);
    })
})