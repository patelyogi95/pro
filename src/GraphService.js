var graph = require('@microsoft/microsoft-graph-client');

const GraphService = {
	getAuthenticatedClient: (accessToken) => {
		// Initialize Graph client
		const client = graph.Client.init({
			// Use the provided access token to authenticate
			// requests
			authProvider: (done) => {
				done(null, accessToken.accessToken);
			},
		});

		return client;
	},
	getUserDetails: async (accessToken) => {
		const client = GraphService.getAuthenticatedClient(accessToken);

		const user = await client.api('/me').get();
		return user;
	},
	getUserGroups: async (accessToken) => {
		const client = GraphService.getAuthenticatedClient(accessToken);

		const groups = await client.api('/me/memberOf').get();
		return groups;
	}
};

export default GraphService;
