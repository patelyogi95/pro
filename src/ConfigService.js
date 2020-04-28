import { headerFactory } from './utils';
import settings from './servicesettings.json';

let callConfigService = async function (accessToken) {
	const headers = headerFactory(accessToken.accessToken);

	const endpoint = settings.ConfigService.endpoint;

	const options = {
		method: 'GET',
		headers: headers,
	};

	let response = await fetch(endpoint, options);

	let data = await response.json();

	return data;
};

export { callConfigService };
