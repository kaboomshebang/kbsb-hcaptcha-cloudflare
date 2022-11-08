/**
 * Verify a hCaptcha token
 */

// endpoint routes
import { Default } from './routes/Default';
import { Form } from './routes/Form';

// endpoint router
export default {
	async fetch(request, env, ctx) {
		const url = new URL(request.url);
		switch (url.pathname) {
			case '/form':
				return Form(request, env, ctx);
			// default response for requests without a slug
			default:
				return Default(env);
		}
	},
};

// When using module syntax
// the 'fetch' event handler should be declared as an exported function on the root module
// as opposed to using the global addEventListener().
// https://developers.cloudflare.com/workers/learning/migrating-to-module-workers/
