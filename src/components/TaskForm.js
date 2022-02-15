import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Task, taskMan } from "../scheduler/TaskManager";
import InputLine, { SelectInputs, SimpleColorRadio } from "./Inputs";
import validate from "validate.js";

function validateTaskForm(form) {
	const notNull = {
		allowEmpty: false,
	};

	let constraint = {
		taskName: {
			presence: notNull,
		},

		taskDesc: {
			presence: notNull,
			length: {
				minimum: 8,
				maximum: 200,
			},
		},

		taskDeadline: {
			presence: notNull,
			dateTime: true
		},

		taskLocation: {
			presence: notNull,
		},

		taskDuration: {
			presence: notNull,
			numericality: {
				onlyInteger: true,
				greaterThan: 5,
			},
		},
	};

	return validate(form, constraint);
}
export function TaskForm({ object, title }) {
	const [inputErrs, setInputErrs] = useState({});

	const [taskName, setTaskName] = useState(object?.name || "");
	const [taskDesc, setTaskDesc] = useState(object?.desc || "");
	const [taskDeadline, setTaskDeadline] = useState(object?.deadline || "");
	const [taskColor, setTaskColor] = useState(object?.color || "");
	const [taskDuration, setTaskDuration] = useState(object?.duration || "");
	const [taskPriority, setTaskPriority] = useState(object?.priority || 1);
	const [taskLocation, setTaskLocation] = useState(object?.location || "");

	const handle = (e) => setTaskColor(e.target.value);
	let navigator = useNavigate();

	const priority = ["Casual", "Normal", "Crucial", "High Priority"];

	function submitform() {
		const task = new Task(
			taskName,
			taskDesc,
			taskDuration,
			taskDeadline,
			taskPriority,
			taskLocation,
			taskColor
		);

		console.log(task);

		let err = validateTaskForm({
			taskName,
			taskDesc,
			taskDuration,
			taskDeadline,
			taskPriority,
			taskLocation,
			taskColor,
		});

		if (err) {
			setInputErrs(err);
			console.log(err);
			return;
		}

		if (object) {
			// remove the object to be added later its modifed in the edit mode
			taskMan.removeTask(object);
		}

		taskMan.addTask(task);

		navigator("/", { replace: true });
	}

	const colors = ["blue", "red", "green", "yellow"];

	return (
		<form id="routines-form" className="mt-1">
			<InputLine
				label="Name"
				propName="taskName"
				type="text"
				value={taskName}
				setter={setTaskName}
				error={inputErrs}
			/>

			<InputLine
				label="Description"
				propName="taskDesc"
				value={taskDesc}
				largeText={true}
				setter={setTaskDesc}
				error={inputErrs}
			/>

			<InputLine
				label="Duration"
				propName="taskDuration"
				type="number"
				value={taskDuration}
				setter={setTaskDuration}
				error={inputErrs}
			/>

			<InputLine
				label="Location"
				propName="taskLocation"
				type="text"
				value={taskLocation}
				setter={setTaskLocation}
				error={inputErrs}
			/>

			<InputLine
				label="Deadline"
				propName="taskDeadline"
				type="datetime-local"
				value={taskDeadline}
				setter={setTaskDeadline}
				error={inputErrs}
			/>

			<SelectInputs
				value={taskPriority}
				options={priority}
				propName={"taskPriority"}
				setter={setTaskPriority}
				error={inputErrs}
				multiple={false}
				label="Priority"
			/>

			<div className="input-line">
				<label>Color</label>
			</div>

			<div className="input-line">
				{colors.map((c, i) => (
					<SimpleColorRadio
						handle={handle}
						taskColor={taskColor}
						value={c}
						key={i}
					/>
				))}
			</div>

			<div className="input-line">
				<button
					type="button"
					className="mt-4 btn btn__img add-routine"
					onClick={() => submitform()}
				>
					{title}
				</button>
			</div>
		</form>
	);
}
