import { Routine, TimeInterval } from "./Routine";
import { RoutineManager } from "./RoutineManager";

describe("Routine Manager", () => {
	test("constructor", () => {
		const routineManager = new RoutineManager();

		expect(routineManager._routines).toStrictEqual([]);
	});

	test("add routine", () => {
		const routineManager = new RoutineManager();

		routineManager.addRoutine(new Routine(0, 150, "test routine", ["MON"]));

		expect(routineManager._routines.length).toBe(1);
	});

	test("add routine", () => {
		const routineManager = new RoutineManager();
		const routine = new Routine(0, 150, "test routine", ["MON"]);

		routineManager.addRoutine(routine);
		routineManager.removeRoutine(routine);

		expect(routineManager._routines.length).toBe(0);
	});

	test("allocateRoutine", () => {
		const routineManager = new RoutineManager();
		const routine = new Routine(0, 150, "test routine", ["TUE"]);
		let now = new Date();
		const day = new TimeInterval(now);

		routineManager.addRoutine(routine);

		routineManager.allocateRoutine(day);

		console.log(day.intervals)

		expect(day.intervals[0].start).toBe(150);
	});
});
