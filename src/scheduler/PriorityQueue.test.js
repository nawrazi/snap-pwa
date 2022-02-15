const {TaskQueue} = require("./PriorityQueue")
const { Task } = require("./TaskManager")

describe("TaskQueue Consturctor Test", () =>

    test("Task Queue with null tasks", () => {
        // with no task
        let taskQue = new TaskQueue()

        expect(taskQue.tasks).toBe(undefined);
    }),

    test("Task Queue with empty task", () => {
        let taskQue = new TaskQueue([])

        expect(taskQue.tasks.length).toBe(0);
    })
);


describe("TaskQue enque test", () => {
    test("enque with empty object", () => {
        let taskQue = new TaskQueue([])
        let newTask = {};

        taskQue.enqueue(newTask);
        expect(taskQue.tasks[0]).toBe(newTask);
    }),

    test("enque with already existing Item", () => {
        let taskQue = new TaskQueue([])
        let newTask = {};

        taskQue.enqueue(new Task(
            "Task Name",
            "",
            10,
            new Date(),
            5
        ));

        taskQue.enqueue(newTask)
        expect(taskQue.tasks[0]).toBe(newTask);
    })
})

describe("TaskQueue dequeque test", () => {
    test("dequeue with empty otasks", () => {
        let taskQue = new TaskQueue([])

        expect(taskQue.dequeue()).toBe(undefined);
    }),

    test("dequeque with already existing Item", () => {
        let taskQue = new TaskQueue([])
        let newTask = new Task(
            "Task Name",
            "",
            10,
            new Date(),
            5
        )

        taskQue.enqueue(newTask);

        
        expect(taskQue.dequeue()).toBe(newTask);
    })
})

describe("TaskQueue ", () => {
    
})