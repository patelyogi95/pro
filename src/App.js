import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'reactstrap';
import { UserAgentApplication } from 'msal';
import NavBar from './NavBar';
import ErrorMessage from './ErrorMessage';
import Welcome from './Welcome';
import Bearer from './Bearer';
import Settings from './Settings';
import config from './Config';
import GraphService from './GraphService';
import { GetSettings } from './ConfigService';
import 'bootstrap/dist/css/bootstrap.css'
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.userAgentApplication = new UserAgentApplication({
			auth: {
				clientId: config.appId,
				redirectUri: config.redirectUri,
				authority: `${config.authority}${config.tenantId}/`,
			},
			cache: {
				cacheLocation: 'localStorage',
				storeAuthStateInCookie: true,
			},
		});

		let user = this.userAgentApplication.getAccount();

		this.state = {
			isAuthenticated: user !== null,
			user: {},
			error: null,
			accessToken: '',
			settings: null,
		};

		if (user) {
			// Enhance user object with data from Graph
			this.getUserProfile();
		}
	}

	parseError = (err) => {
		let error = {};
		if (typeof err === 'string') {
			console.log('error is string');
			let errParts = err.split('|');
			error =
				errParts.length > 1
					? { message: errParts[1], debug: JSON.parse(errParts[0]) }
					: { message: err };
		} else {
			error = {
				message: err.message,
				debug: err,
			};
		}

		this.setState({
			isAuthenticated: false,
			user: {},
			error: error,
			accessToken: '',
		});

		return error;
	}

	//getRemoteConfig = async () => {
	//	try {
	//		const accessToken = await this.userAgentApplication.acquireTokenSilent({
	//			scopes: config.configScopes,
	//		});

	//		this.setState({ accessToken: accessToken.accessToken });

	//		const data = await GetSettings(accessToken);

	//		this.setState({ settings: data.settings });
	//	} catch (err) {
	//		this.parseError(err);
	//	}
	//}

	render() {
		let error = null;
		let errorCode = null;
		if (this.state.error) {
			error = (
				<ErrorMessage
					message={this.state.error.message}
					debug={JSON.stringify(this.state.error.debug)}
				/>
			);
			errorCode = this.state.error.debug.errorCode;
		}

		return (
			<Router>
				<div>
					<NavBar
						isAuthenticated={this.state.isAuthenticated}
						authButtonMethod={
							this.state.isAuthenticated
								? this.logout.bind(this)
								: this.login.bind(this)
						}
						user={this.state.user}
					/>
					<Container>
						{error}
						<Route
							exact
							path='/'
							render={(props) => (
								<Welcome
									{...props}
									isAuthenticated={this.state.isAuthenticated}
									user={this.state.user}
									authButtonMethod={
										errorCode === 'user_cancelled'
											? null
											: this.login.bind(this)
									}
								/>
							)}
						/>
						<Settings
							isAuthenticated={this.state.isAuthenticated}
							settings={this.state.settings}
						/>
						<Bearer
							isAuthenticated={this.state.isAuthenticated}
							bearerToken={this.state.accessToken}
						/>
					</Container>
				</div>
			</Router>
		);
	}

	setErrorMessage = (message, debug) => {
		this.setState({
			error: { message: message, debug: debug },
		});
	}

	login = async () => {
		try {
			await this.userAgentApplication.loginPopup({
				scopes: config.scopes,
				prompt: 'select_account',
			});
			await this.getUserProfile();
			//await this.getRemoteConfig();
		} catch (err) {
			this.parseError(err);
		}
	}

	logout = () => {
		this.userAgentApplication.logout();
		// TODO: Set logout state to be checked on auto login.
	}

	getUserProfile = async () => {
		try {
			// Get the access token silently
			// If the cache contains a non-expired token, this function
			// will just return the cached token. Otherwise, it will
			// make a request to the Azure OAuth endpoint to get a token

			var accessToken = await this.userAgentApplication.acquireTokenSilent({
				scopes: config.scopes,
			});

			if (accessToken) {
				// Get the user's profile from Graph
				const user = await GraphService.getUserDetails(accessToken);
				const settings = await GetSettings(accessToken);

				this.setState({
					isAuthenticated: true,
					user: {
						displayName: user.displayName,
						email: user.mail || user.userPrincipalName,
					},
					error: null,
					accessToken: accessToken.accessToken,
					settings: settings !== null ? settings.settings : settings,
				});
			}
		} catch (err) {
			this.parseError(err);
		}
	}
}

export default App;
