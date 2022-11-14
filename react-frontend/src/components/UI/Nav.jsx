import { useState } from 'react';

import * as css from './Nav.module.css';

export const Nav = () => {
	const [showMenu, setShowMenu] = useState(false);

	const kaboom = 'https://www.kaboomshebang.com';
	const baseUrl = 'https://assets.kbsb.app/svg/';
	const logo = 'kaboom_shebang_logo.svg';
	const burger = 'icon_hamburger.svg';

	const clickHandler = () => {
		setShowMenu((prevState) => !prevState);
	};

	return (
		<div className={css.navWrapper}>
			<nav className={css.nav}>
				<a href={kaboom} target="_blank" rel="noopener noreferrer">
					<img src={baseUrl + logo} alt="Kaboom Shebang" />
				</a>
				<button className={css.button} onClick={clickHandler}>
					<img src={baseUrl + burger} alt="Burger" />
				</button>
			</nav>
			<div className={css.menu} data-show-menu={showMenu}>
				<header>
					<h3>Information</h3>
					<button onClick={clickHandler}>Close</button>
				</header>

				<p>
					Uses the <a href="https://github.com/hCaptcha/react-hcaptcha">react-hcaptcha</a>{' '}
					package. And a standard <code>FormData()</code> form. The form data is send to a
					Cloudflare worker.
				</p>
				<p>
					You can find the source code in the{' '}
					<a href="http://www.github.com/kaboomshebang/kbsb-hcaptcha-cloudflare">
						Github repo
					</a>
					. The Cloudflare code is located in the <code>cloudflare-worker</code>{' '}
					directory. The React code in the <code>react-frontend</code> directory.
				</p>
				<p>
					A succesful verification results in a <code>hCaptcha token accepted</code>{' '}
					server response.
				</p>
			</div>
		</div>
	);
};
