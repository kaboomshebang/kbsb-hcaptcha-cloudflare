// hCaptcha Cloudflare worker project
// created by github.com/glenstack
// https://github.com/glenstack/glenstack/tree/master/packages/cf-workers-hcaptcha

const VERIFY_URL = 'https://hcaptcha.com/siteverify';

export class HCaptchaError extends Error {
	constructor({ message = 'An unknown hCaptcha error occurred.', code }) {
		super(message);
		this.name = `hCaptcha Error${code ? ` (${code})` : ''}`;
		this.code = code;
	}
}

const extractTokenFromRequest = async (request) => {
	const data = await request.formData();
	return data.get('h-captcha-response').toString();
};

const extractIPFromRequest = async (request) =>
	Promise.resolve(request.headers.get('CF-Connecting-IP') || undefined);

export const createVerifier =
	(secret) =>
	async (request, { tokenExtractor } = { tokenExtractor: extractTokenFromRequest }) => {
		const remoteip = await extractIPFromRequest(request);
		const token = await tokenExtractor(request);

		const response = await fetch(VERIFY_URL, {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: new URLSearchParams({ secret, response: token, remoteip }),
		});

		try {
			const data = await response.json();
			if (data.success) {
				return data;
			} else {
				const errorCodes = data['error-codes'];
				switch (errorCodes[0]) {
					case 'missing-input-secret':
						throw new HCaptchaError({
							message: 'Your secret key is missing.',
							code: 'missing-input-secret',
						});
					case 'invalid-input-secret':
						throw new HCaptchaError({
							message: 'Your secret key is invalid or malformed.',
							code: 'invalid-input-secret',
						});
					case 'missing-input-response':
						throw new HCaptchaError({
							message: 'The response parameter (verification token) is missing.',
							code: 'missing-input-response',
						});
					case 'invalid-input-response':
						throw new HCaptchaError({
							message:
								'The response parameter (verification token) is invalid or malformed.',
							code: 'invalid-input-response',
						});
					case 'bad-request':
						throw new HCaptchaError({
							message: 'The request is invalid or malformed.',
							code: 'bad-request',
						});
					case 'invalid-or-already-seen-response':
						throw new HCaptchaError({
							message:
								'The response parameter has already been checked, or has another issue.',
							code: 'invalid-or-already-seen-response',
						});
					case 'sitekey-secret-mismatch':
						throw new HCaptchaError({
							message: 'The sitekey is not registered with the provided secret.',
							code: 'sitekey-secret-mismatch',
						});
				}
			}
		} catch (e) {
			if (e instanceof HCaptchaError) throw e;
		}

		throw new HCaptchaError();
	};
