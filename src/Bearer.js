import React from 'react';
import { Container } from 'reactstrap';

class Bearer extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		if (this.props.isAuthenticated) {
			const message = `Bearer ${this.props.bearerToken}`;
			return (
				<Container className='bearerToken'>
					<code>{message}</code>
				</Container>
			);
		}

		return null;
    }
}

export default Bearer;
