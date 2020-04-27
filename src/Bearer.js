import React from 'react';
import { Container } from 'reactstrap';

function Bearer(props) {
	if (props.isAuthenticated) {
		let message = `Bearer ${props.bearerToken}`;
		return (
			<Container className='bearerToken'>
				<code>{message}</code>
			</Container>
		);
	}

	return null;
}

export { Bearer as default };
