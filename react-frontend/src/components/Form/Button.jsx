import * as css from './Button.module.css';
import cn from 'classnames';

export const Button = (props) => {
	return (
		<button
			accept="true"
			className={cn(css.button, css[props.btnStyle])}
			onClick={props.onClick}
			type={props.btnType}
		>
			{props.label}
		</button>
	);
};

/* type: button, reset, submit */
