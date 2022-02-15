import classNames from "classnames";
import ImageButton from "./Buttons";
import options from "../images/options.svg";
import location from "../images/location.svg";
import edit from "../images/edit.svg";
import del from "../images/delete.svg";
import done from "../images/done.svg";
import pin from "../images/pin.svg";

import { scheduler } from "../scheduler/Scheduler";
import { useState } from "react";
import { reload } from "./utils";
import ClickAwayListener from "react-click-away-listener";
import { taskMan } from "../scheduler/TaskManager";


function formatTime(minutes) {
	let hour = Math.floor(Number(minutes) / 60);
	const minute = Number(minutes) % 60;

	const AMPM = (hour >= 12 && hour <=23) ? "PM" : "AM";

	if(AMPM == "PM" && hour != 12){
		hour -= 12;
	}

	if(hour == 0) hour += 12

	return `${hour.toString().padStart(2,0)}:${minute.toString().padStart(2,0)} ${AMPM}`;
}

async function createNotification(schedule) {
	if (!"Notification" in window) {
		// console.log("Called")
		// console.log(routineManager._routines);
		// console.log(taskMan.days)
		// console.log(scheduler.schedules)
		return;
	}

	if (Notification.permission !== "denied") {
		await Notification.requestPermission();
	}

	let timeStamp = schedule.date;

	if(typeof schedule.date == "string"){
		timeStamp = new Date(schedule.date) 
	}

	console.log(timeStamp);

	const hour = Math.floor(schedule.time.start  /60)
	const minute = schedule.time.start % 60;

	timeStamp.setHours(hour, minute, 0);

	timeStamp = timeStamp.getTime() - Date.now()

	console.log(timeStamp);
	
	setTimeout(() => {
		new Notification(`Hey! its time to ${schedule.task.name}`, {
			body: schedule.task.desc,
			timestamp: timeStamp,
		});
	}, timeStamp);
}

export function TaskItem({ schedule, task, refreshSchedules, navigator }) {
	const [popupShown, setPopupShown] = useState(false);

	const cls = classNames({
		task: true,
		yellow: task.color == "yellow",
		green: task.color == "green",
		red: task.color == "red",
		blue: task.color == "blue",
	});

	function removeTask() {
		taskMan.removeTask(task);
		// reload all schedules and tasks from repository
		reload();
		// set the new schdules to be rendered schedules
		refreshSchedules(scheduler.schedules);
	}

	function markTaskComplete() {
		removeTask();
		// add the task to the list of completed tasks
		taskMan.addCompletedTask(task);
	}

	function redirect() {
		// redirect to another page
		navigator(`/task/${task.id}`);
	}

	return (
		<div className={cls}>
			<div className="tasks__time-col">
				<span className="time start">
					{formatTime(schedule.time.start)}
				</span>
				<span className="time end">
					{formatTime(schedule.time.end)}
				</span>
			</div>

			<div className="tasks__task-col task__card">
				<h1 className="task__title">{task.name}</h1>
				<article className="task__description">{task.desc}</article>

				<section className="task__location">
					<ImageButton image={location} alt="location">
						{task.location}
					</ImageButton>
				</section>

				<ImageButton
					image={options}
					cls="btn__ctx"
					alt="context"
					onClick={() => setPopupShown(!popupShown)}
				/>
			</div>
			{popupShown && (
				<ClickAwayListener
					onClickAway={() => setPopupShown(!popupShown)}
				>
					<div className={"popup"}>
						<li>
							<ImageButton
								image={pin}
								onClick={() => createNotification(schedule)}
							>
								Pin
							</ImageButton>
						</li>

						<li>
							<ImageButton image={edit} onClick={redirect}>
								Edit
							</ImageButton>
						</li>

						<li>
							<ImageButton image={del} onClick={removeTask}>
								Delete
							</ImageButton>
						</li>

						<li>
							<ImageButton
								image={done}
								onClick={markTaskComplete}
							>
								Mark Done
							</ImageButton>
						</li>
					</div>
				</ClickAwayListener>
			)}
		</div>
	);
}
