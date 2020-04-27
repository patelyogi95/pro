import React from 'react';
import { Container } from 'reactstrap';

let Setting = function (props) {
	return (
		<li>
			<code>{JSON.stringify(props.value)}</code>
		</li>
	);
};

let Settings = function (props) {
	if (props.isAuthenticated && props.settings) {
		console.log(props.settings);
		let listSettings = props.settings.map((setting) => (
			<Setting key={setting.key} value={setting} />
		));
		//let message = JSON.stringify(props.settings);
		return (
			<Container>
				<ul>
					<p>{listSettings}</p>
				</ul>
			</Container>
		);
	}

	return null;
};

export { Settings as default };
