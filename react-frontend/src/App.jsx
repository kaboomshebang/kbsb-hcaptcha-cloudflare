import { useState } from 'react';

import { Nav } from './components/UI/Nav';
import { Form } from './components/Form/Form';
import { Console } from './components/UI/Console';

import './App.css';

function App() {
	const [response, setResponse] = useState('');

	return (
		<>
			<header>
				<Nav />
			</header>
			<main className="App">
				<article>
					<header>
						<h1>kbsb-hCaptcha-Cloudflare</h1>
						<h2>Verify a hCaptcha token with a Cloudflare Worker.</h2>
						<hr />
						<p>
							Uses the{' '}
							<a href="https://github.com/hCaptcha/react-hcaptcha">react-hcaptcha</a>{' '}
							package. And a standard <code>FormData()</code> form. The form data is
							send to a Cloudflare worker.
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
							A succesful verification results in a{' '}
							<code>hCaptcha token accepted</code> server response.
						</p>
					</header>
				</article>

				<article>
					<Form onResponse={setResponse} header="Contact Form" />
				</article>
				<Console response={response} />
			</main>
			<footer>Copyright Kaboom Shebang</footer>
		</>
	);
}

export default App;
