import { createVerifier } from '../package/hcaptcha/hcaptcha';

// verify the hCaptcha token
const verifyToken = async (request, env) => {
	const verify = createVerifier(env.HCAPTCHA_SECRET_KEY);

	try {
		const payload = await verify(request);

		return new Response('Verified!');
	} catch (e) {
		return new Response(`Could not verify hCaptcha token: ${e.message}`, {
			status: 401,
		});
	}
};

// placeholder function to validate the HTML input fields
const formValidation = () => {
	console.log('Here goes code for the FormData processing.');
};

export const Form = async (request, env, ctx) => {
	// response headers
	const responseHeaders = new Headers();
	responseHeaders.set('Access-Control-Allow-Origin', env.CORS_ORIGIN);
	responseHeaders.set('content-type', 'application/json;charset=UTF-8');

	// call the hCaptcha verification
	const res = await verifyToken(request, env);

	if (res.status === 200) {
		console.log('succesful hCaptcha token verification');

		// validate the form data
		formValidation();

		const json = JSON.stringify({ msg: '✅ hCaptcha token accepted' }, null, 2);
		return new Response(json, {
			headers: responseHeaders,
		});
	}

	if (res.status === 401) {
		console.log('hCaptcha token verification failed');
		const json = JSON.stringify({ msg: '❌ illegal hCaptcha token' }, null, 2);
		return new Response(json, {
			headers: responseHeaders,
		});
	}
};
