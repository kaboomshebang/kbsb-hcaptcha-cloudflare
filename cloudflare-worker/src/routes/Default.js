export const Default = (env) => {
	const data = {
		msg: 'unknown endpoint',
	};

	const json = JSON.stringify(data, null, 2);
	return new Response(json, {
		headers: {
			'Access-Control-Allow-Origin': env.CORS_ORIGIN,
			'content-type': 'application/json;charset=UTF-8',
		},
	});
};
