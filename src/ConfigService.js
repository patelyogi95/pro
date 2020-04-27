import { headerFactory } from './utils';
let callConfigService = async function (accessToken) {
	const headers = headerFactory(accessToken);

	const endpoint = 'https://localhost:44322/api/Setting/';

	const options = {
		method: 'GET',
		headers: headers,
	};

	return (response = await fetch(endpoint, options));
};

export { callConfigService as default };
