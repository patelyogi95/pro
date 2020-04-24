var graph = require('@microsoft/microsoft-graph-client');

function getAuthenticatedClient(accessToken) {
	// Initialize Graph client
	const client = graph.Client.init({
		// Use the provided access token to authenticate
		// requests
		authProvider: (done) => {
			done(null, accessToken.accessToken);
		},
	});

	return client;
}

async function getUserDetails(accessToken) {
	const client = getAuthenticatedClient(accessToken);

	const user = await client.api('/me').get();
	return user;
}

async function getUserGroups(accessToken) {
	const client = getAuthenticatedClient(accessToken);

	const groups = await client.api('/me/memberOf').get();
	return groups;
}

export { getUserDetails, getUserGroups };
