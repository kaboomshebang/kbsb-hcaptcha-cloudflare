import { useState } from 'react';

import * as css from './Input.module.css';

export const Input = (props) => {
	const [focus, setFocus] = useState(false);

	const focusHandler = () => {
		setFocus((prevState) => !prevState);
	};

	const inputHandler = (event) => {
		props.formDataHandler({ ...props.formData, [props.name]: event.target.value });
	};

	return (
		<div className={css.inputWrapper}>
			<label className={css.label} htmlFor={props.name} focus={focus.toString()}>
				{props.label}
			</label>
			<input
				name={props.name}
				placeholder={props.placeholder}
				type={props.type}
				value={props.formData[props.name]}
				className={css.input}
				onChange={inputHandler}
				onFocus={focusHandler}
				onBlur={focusHandler}
			></input>
		</div>
	);
};
