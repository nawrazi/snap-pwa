import { repository } from "./Repository";

describe("Repository", () => {
	test("tasks", () => {
		expect(repository.getTasks()).toStrictEqual([]);

		repository.setTasks([Object.create(null)]);

		expect(repository.getTasks().length).toBe(1);
	});


	test("routine", () => {
		expect(repository.getRoutines()).toStrictEqual([]);

		repository.setRoutines([Object.create(null)]);

		expect(repository.getTasks().length).toBe(1);
	});
});
