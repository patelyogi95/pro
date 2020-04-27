import { headerFactory } from './utils';
let callConfigService = async function (accessToken) {
	const headers = headerFactory(accessToken.accessToken);

	const endpoint = 'https://localhost:44322/api/Setting/';

	const options = {
		method: 'GET',
		headers: headers,
	};

	console.log('calling remote config');

	let response = await fetch(endpoint, options);

	let data = await response.json();

	return data;
};

export { callConfigService };
