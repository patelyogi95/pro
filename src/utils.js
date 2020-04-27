let headerFactory = function (token) {
	const header = new Headers();
	const bearer = `Bearer ${token}`;

	header.append('Authorization', bearer);

	return header;
};

export { headerFactory };
