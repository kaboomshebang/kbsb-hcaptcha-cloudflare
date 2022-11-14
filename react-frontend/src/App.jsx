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
					</header>
				</article>

				<Form onResponse={setResponse} header="Contact Form" />

				<Console response={response} />
			</main>
			<footer>Copyright Kaboom Shebang</footer>
		</>
	);
}

export default App;
