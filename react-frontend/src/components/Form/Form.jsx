import { useRef, useState } from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';

import classNames from 'classnames';

import * as cssForm from './Form.module.css';
import * as cssBtn from './Button.module.css';
import * as cssInput from './Input.module.css';

const siteKey = import.meta.env.VITE_HCAPTCHA_SITEKEY;
const endpoint = import.meta.env.VITE_ENDPOINT;

export const Form = (props) => {
	// you can use state to manually store the hCaptcha token (instead of FormData)
	// const [token, setToken] = useState({});
	const form = useRef(null);

	const submitHandler = async (event) => {
		event.preventDefault();
		const formData = new FormData(form.current);

		const res = await fetch(endpoint, {
			method: 'POST',
			body: formData,
			mode: 'cors',
		});
		const data = await res.json();

		// pass server response up to the console
		props.onResponse(data.msg);
	};

	return (
		<article className={cssForm.article}>
			<header className={cssForm.header}>
				<h1>{props.header}</h1>
			</header>
			<form ref={form} className={cssForm.form} onSubmit={submitHandler}>
				<div className={cssInput.inputWrapper}>
					<label className={cssInput.label} htmlFor="contact[name]">
						Name
					</label>
					<input required name="contact[name]" className={cssInput.input} type="text" />
				</div>
				<div className={cssInput.inputWrapper}>
					<label className={cssInput.label} htmlFor="contact[email]">
						Email
					</label>
					<input required name="contact[email]" className={cssInput.input} type="email" />
				</div>
				<div className={cssForm.btnWrapper}>
					<button className={classNames(cssBtn.button, cssBtn.submit)} type="submit">
						Submit
					</button>
					<button className={classNames(cssBtn.button, cssBtn.neutral)} type="reset">
						Reset
					</button>
				</div>
				<HCaptcha sitekey={siteKey} onVerify={() => {}} />

				{/* 
				You can use onVerify attribute when using state to store the token. (instead of FormData)
				<HCaptcha
					sitekey={siteKey}
					onVerify={(token, ekey) => setToken({ token: token, ekey: ekey })}
				/> */}
			</form>
		</article>
	);
};
