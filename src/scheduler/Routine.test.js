import { Interval, TimeInterval } from "./Routine";

describe("timeInterval", () => {
	test("create a day", () => {
		const day = new TimeInterval(new Date());
		expect(day.intervals.length).toBe(1);
	});

	test("remove a portion", () => {
		const day = new TimeInterval(new Date(), 0);

		day.removeInterval(new Interval(150, 250));
		expect(day.intervals.length).toBe(2);
        day.removeInterval(new Interval(50, 200));
	});
});
