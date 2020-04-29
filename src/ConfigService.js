import { GetHeaders } from './utils';
import EndPoints from './Endpoints.json';

const GetSettings = async function (accessToken) {
	const apiResponse = null;
	const headers = GetHeaders(accessToken.accessToken);

	const endpoint = EndPoints.ConfigService.url;

	const options = {
		method: 'GET',
		headers: headers,
	};

	const response = await fetch(endpoint, options);
	if (response.status === 200) {
		apiResponse = await response.json();
	}

	return apiResponse;
};

export { GetSettings };
