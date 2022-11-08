import * as css from './Console.module.css';

export const Console = (props) => {
	return (
		<div className={css.console}>
			<div>
				Server response &gt; <strong>{props.response}</strong>
			</div>
		</div>
	);
};
