import classNames from "classnames";

function InputLine({ label, type, value, setter, error, propName, largeText }) {
	let errMsg = error[propName] || "";
	let isInvalidCls = classNames({ "is-invalid": errMsg != "" });

	return (
		<>
			<InputWrapper>
				<label className="input-name taskname-name">{label}</label>
			</InputWrapper>

			<InputWrapper>
				{!largeText && (
					<input
						className={isInvalidCls}
						type={type}
						value={value}
						onChange={(e) => setter(e.target.value)}
					></input>
				)}

				{largeText && (
					<textarea
						className={isInvalidCls}
						value={value}
						onChange={(e) => setter(e.target.value)}
					></textarea>
				)}

				{errMsg != "" && <span className="error-msg">{errMsg}</span>}
			</InputWrapper>
		</>
	);
}

export function InputWrapper({ children }) {
	return <div className="input-line">{children}</div>;
}

export function SelectInputs({
	label,
	value,
	options,
	setter,
	error,
	propName,
	multiple,
}) {
	let errMsg = error[propName] || "";
	let isInvalidCls = classNames({ "is-invalid": errMsg != "" });

	function handleSelect(newValue) {
		if (multiple) {
			if(value.includes(newValue)){
				setter(value.filter(val => val != newValue))
			}else{
				value.push(newValue);
				setter(value);
			}

			return;
		}

		// if multiple is explicityl set to false

		setter(newValue);
	}

	return (
		<>
			<InputWrapper>
				<label className="input-name taskname-name">{label}</label>
			</InputWrapper>

			<InputWrapper>
				<select
					value={value}
					multiple={multiple ?? true}
					className={isInvalidCls}
					onChange={(e) => handleSelect(e.target.value)}
				>
					{options.map((val, i) => (
						<option value={val.toUpperCase()} key={i}>
							{val}
						</option>
					))}
				</select>

				{errMsg != "" && <span className="error-msg">{errMsg}</span>}
			</InputWrapper>
		</>
	);
}

export function SimpleColorRadio({value, taskColor, handle}) {
	return (
		<>
			<label className="hidden" htmlFor={value}>
				Green
			</label>
			
			<input
				type="radio"
				name="color"
				id={value}
				value={value}
				checked={taskColor == value}
				onChange={handle}
			/>
		</>
	);
}
export default InputLine;
