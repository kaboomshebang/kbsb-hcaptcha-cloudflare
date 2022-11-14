import * as css from './Nav.module.css';

export const Nav = () => {
	return (
		<nav className={css.nav}>
			<h1>Kaboom Shebang</h1>
			<button>Menu</button>
		</nav>

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
	);
};
