import React from 'react';
import { Jumbotron } from 'reactstrap';

function WelcomeContent(props) {
	// If authenticated, greet the user
	if (props.isAuthenticated) {
		return (
			<div>
				<h4>Welcome {props.user.displayName}!</h4>
			</div>
		);
	}
	// Not authenticated, present a sign in popup
	if (props.authButtonMethod && props.authButtonMethod !== null)
		props.authButtonMethod();
	return null;
}

export default class Welcome extends React.Component {
	render() {
		return (
			<Jumbotron>
				<h1>Flow V2</h1>
				<WelcomeContent
					isAuthenticated={this.props.isAuthenticated}
					user={this.props.user}
					authButtonMethod={this.props.authButtonMethod}
				/>
			</Jumbotron>
		);
	}
}
