import { repository } from "../scheduler/Repository";
import { useState } from "react";
import ImageButton from "./Buttons";

import del from "../images/delete.svg";
import { routineManager } from "../scheduler/RoutineManager";
import classNames from "classnames";

function RoutineList() {
	const [routines, setRoutines] = useState(routineManager._routines);

	return (
		<>
			<div>
				{routines.map((routine) => (
					<Routine
						routine={routine}
						key={routine.id}
						setRoutines={setRoutines}
					/>
				))}
			</div>
		</>
	);
}

function Routine({ routine, setRoutines }) {
	function removeRoutine() {
		console.log("called");
		routineManager.removeRoutine(routine);
		setRoutines(routineManager._routines);
		routineManager.saveState()
	}

	return (
		<div className="routine--line">
			<section>
				<div className="routine--name">{routine.name}</div>
				<div>
					{routine.repeat.map((r, i) => {
						const className = classNames({
							"day-tag": true,
							"week-day": r == "SUN" || r == "SAT",
						});

						return (
							<span className={className} key={i}>
								{r}
							</span>
						);
					})}
				</div>
			</section>

			<ImageButton image={del} onClick={removeRoutine} />
		</div>
	);
}

export default RoutineList;
