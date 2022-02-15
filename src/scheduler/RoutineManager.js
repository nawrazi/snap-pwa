import { repository } from "./Repository";
import { Repeat, Interval } from "./Routine";

export class RoutineManager {
	constructor() {
		this.init();
	}

	init() {
		this._routines = repository.getRoutines();
	}

	allocateRoutine = function (day) {
		const inOnRepeat = (day, routine) => {
			return routine.repeat.some((repeat) => Repeat[repeat] == day);
		};

		for (let routine of this._routines) {
			if (inOnRepeat(day.date.getDay(), routine)) {
				// remove a specified time interval from the 
				const booked = new Interval(routine.start, routine.end);
				day.removeInterval(booked);
			}
		}
	};

	addRoutine = function (routine) {
		this._routines.push(routine);
	};

	removeRoutine = function (routine) {
		this._routines = this._routines.filter((item) => routine.id != item.id);
	};

	saveState() {
		repository.setRoutines(this._routines);
	}
}

export const routineManager = new RoutineManager();

