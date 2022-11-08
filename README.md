# kbsb-hcaptcha-cloudflare

Verify a hCpatcha token with a Cloudflare Worker.

```sh
# test the endpoint with curl
curl https://kbsb-hcaptcha-worker.kaboom.workers.dev/form --request POST
```
```http
# with VSCode REST
POST https://kbsb-hcaptcha-worker.kaboom.workers.dev/form
```

Visit the [React front-end](https://hcaptcha-cloudflare.kbsb.app/) page.

Todos:
- [ ] Add more form fields (checkbox, etc)
- [ ] Add formvalidation (client- and server-side)
- [ ] Finish Light/Dark theme
- [ ] Finish the `<Input />` components
- [ ] Test ReactHookForm / Formik


## About this project

Uses the [react-hcaptcha](https://github.com/hCaptcha/react-hcaptcha) package. And a standard `FormData()` form. The form data is send to a [Cloudflare worker](). A succesful verification results in a `hCaptcha token accepted` server response.

You can find the source code in this repo. The Cloudflare code is located in the `cloudflare-worker` directory. The React code in the `react-frontend` directory.


## Alternative React `<form>` packages

> "Forms are hard. Forms in React are hard."

Alternatives to a regular `<form>`: [Formik](https://formik.org/), [React Hook Form](https://react-hook-form.com/)


## Resources

A helpful learning resource: https://mattboldt.com/2020/05/02/formdata-with-react-hooks-and-fetch/. Thanks Matt Boldt.




------------------------------------------

## Cloudflare Worker

Process a `FormData` hCaptcha token with a Cloudflare Worker. The hCaptcha token is verified with the `glenstack` [cf-workers-hcaptcha](https://github.com/glenstack/glenstack/tree/master/packages/cf-workers-hcaptcha) package.

[Cloudflare docs](https://developers.cloudflare.com/workers/runtime-apis/)



### Install Cloudflare tooling

Set up a Worker project. [Guide](https://developers.cloudflare.com/workers/get-started/guide/)

```sh
# install the Cloudflare Wrangler CLI
npm install -g wrangler

# login to Cloudflare
wrangler login
# or get an API key from the Cloudflare account profile page

# initialize project
wrangler init

# start dev server
wrangler dev # needs auhentication

# deploy to production
wrangler publish
wrangler publish --env staging
wrangler publish --env production
```



### Authentication with API key

If `wrangler login` is not possible you can authenticate with a Cloudflare API key. Create a .env file in the worker root folder.

```env
CLOUDFLARE_API_TOKEN=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```



### Set `wrangler.toml`

Adjust the settings in `wrangler.toml`.

```toml
# for example, set the local host ip/port
[dev]
ip = "100.125.102.16"
port = 8080

# set your CORS policy domain
[env.production.vars]
CORS_ORIGIN = '*' # replace with your frontend domain base-URL including `https://`
```

```js
// use the CORS variable
console.log(env.CORS_ORIGIN); // make sure to pass env
```


### Configure hCaptcha env vars and API secrets

Before you can validate tokens, you have to upload the hCaptcha secret key to the worker. **Get your hCaptcha secret key** from the [dashboard](https://dashboard.hcaptcha.com/settings).

```sh
wrangler secret put HCAPTCHA_SECRET_KEY

# paste your key
0x0D00000000000000000000000000000000000000
```

> From Worker docs: "When deploying a Module Worker, any bindings will not be available as global runtime variables. Instead, they are passed to the handler as a parameter – refer to `env` in Parameters."

```js
// pass env as a parameter to the handler
// the variable is now available in your code
console.log(env.HCAPTCHA_SECRET_KEY);
```

> ⚠️ Also, set the correct hCaptcha allowed domain(s), for example: https://hcaptcha-cloudflare.kbsb.app/


### Retrospective

Cloudflare workers -- in `node_compat` mode -- don't support FormData processing packages like [Formidable](https://www.npmjs.com/package/formidable). Therefore, perhaps, a Node/Express/Docker endpoint (deployed on, for example, Fly.io) is just as easy to set up, and more flexible because of the larger Node package ecosystem.

- [ ] Implement alternative form validation




------------------------------------------


## React frontend

This project uses React.js, with `yarn,` and the Vite bundler.

```sh
# install node_modules
yarn

# run development server
yarn dev

# build the app for production
yarn build
```

### Configure frontend variables

> ⚠️ Set the correct hCaptcha sitekey and Worker endpoint in the `.env` file.


### Retrospective

> "Request has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource."

Don't forget to add the correct header on the Response object!

```js
// React app
const res = await fetch(endpoint, {
	method: 'POST',
	body: formData,
	mode: 'cors',
    // A `no-cors` mode request is restricted, the body can not be read.
});

// Cloudflare worker
return new Response(JSON.stringify(msg: 'unknown endpoint', null, 2), {
	headers: {
        // add the CORS header
		'Access-Control-Allow-Origin': '*',
		'content-type': 'application/json;charset=UTF-8',
	},
});
```

