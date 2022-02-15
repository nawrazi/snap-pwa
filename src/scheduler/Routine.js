import { days, createEnumProperty } from "./utils";
import { v4 as uuidv4} from "uuid"; 

// enum object to describe daily or weekly repeation
export const Repeat = Object.create(null);

for (let key in days) {
	// each property is final
	createEnumProperty.call(Repeat, key, days[key]);
}

export class Routine {
	constructor(startTime, endTime, name, repeat) {
		this.id = uuidv4();
		
		this.start = startTime;
		this.end = endTime;
		this.name = name;
		this.repeat = repeat;
	}
}

export class Interval {
	constructor(start = 0, end = 1440) {
		this.start = start;
		this.end = end;
	}

	get length() {
		return this.end - this.start;
	}
}

export class TimeInterval {
	constructor(date, start, end) {
		this.date = date;

		if (typeof start == "undefined")
			start = date.getHours() * 60 + date.getMinutes();

		if (end) {
			end = date.getHours() * 60 + date.getMinutes();
			start = 0;
		}

		this.intervals = [new Interval(start, end)];
	}

	removeInterval(newInterval) {
		for (let [index, interval] of this.intervals.entries()) {
			// slice
			if (
				interval.start <= newInterval.start &&
				interval.end >= newInterval.end
			) {
				// this.intervals.splice(index, i);
				const unBookedIntervals = [];

				if (interval.start != newInterval.start)
					unBookedIntervals.push(
						new Interval(interval.start, newInterval.start)
					);

				if (interval.end != newInterval.end)
					unBookedIntervals.push(
						new Interval(newInterval.end, interval.end)
					);

				this.intervals.splice(index, 1, ...unBookedIntervals);

				break;
			}else if(interval.start > newInterval.start &&  newInterval.end > interval.start && newInterval.end < interval.end){

				const unBookedIntervals = [];

				unBookedIntervals.push(
					new Interval(newInterval.end, interval.end)
				);

				this.intervals.splice(index, 1, ...unBookedIntervals);

			}else if(interval.start < newInterval.start && interval.end < newInterval.end){
				const unBookedIntervals = [];

				unBookedIntervals.push(
					new Interval(interval.start, newInterval.start)
				);

				this.intervals.splice(index, 1, ...unBookedIntervals);
			}
		}
	}
}
