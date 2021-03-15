import React, { Component } from 'react';
import {
	KeyboardAvoidingView,
	Text,
	Button,
	TextInput,
	TouchableOpacity,
	Alert,
	Keyboard,
	View
} from 'react-native';
import NetInfo from "@react-native-community/netinfo";


import globalStyles from '@src/styles/styles';
import auth from '@src/api/auth';
import ViewBackground from '@src/components/shared/viewBackground/ViewBackground';
import styles from '@src/features/forgottenPassword/styles';
import FxButton from '@src/components/shared/button/FxButton';
import Input from '@src/components/shared/input/Input';
import Indicator from '@src/components/shared/indicator/Indicator';
import images from '@src/assets/images';
import { Routes } from '@src/navigation/screenNames';

var requestTimer;

class ForgottenPasswordScreen extends Component {
	constructor(props) {
		super(props);
		this.onPressSubmit = this.onPressSubmit.bind(this);
		this.navigateToResetPasswordScreen = this.navigateToResetPasswordScreen.bind(this);
		this.handleFirstConnectivityChange = this.handleFirstConnectivityChange.bind(this);
		this.state = {
			loading: false,
			connectionType: ''
		};
	}

	componentDidMount() {
		NetInfo.fetch().then(connectionInfo => {
			this.setState({
				connectionType: connectionInfo.type
			});
		});

			NetInfo.addEventListener(this.handleFirstConnectivityChange);
	}

	componentWillUnmount() {
		if (requestTimer != null) clearTimeout(requestTimer);

		NetInfo.addEventListener(this.handleFirstConnectivityChange);
	}

	/**
	 * Handle internet connection change
	 */
	handleFirstConnectivityChange = (connectionInfo) => {
		this.setState({ connectionType: connectionInfo.type });
	}

	/**
	 * Redirect back to login screen
	 */
	onPressSubmit() {
		this.setState({ loading: true });

		if (this.state.connectionType == 'none' || this.state.connectionType == 'unknown') {
			thisObj.showError('No internet connection');
			return;
		}

		var thisObj = this;
		this.requestTimeout(10000, auth.forgottenPassword(this.state))
			.then(res => {
				if (!!res.verification_token) {
					thisObj.navigateToResetPasswordScreen();
				} else {
					thisObj.showError('There is a problem with your email, please try again');
				}
			})
			.catch(error => {
				console.log('ForgottenPasswordScreen Error ::', error);

				NetInfo.getConnectionInfo().then(connectionInfo => {
					if (connectionInfo.type == 'none' || connectionInfo.type == 'unknown') {
						thisObj.showError('No internet connection');
					} else {
						thisObj.showError(error.message);
					}
				});
			});
	}

	/**
	 * Start request after x seconds
	 */
	requestTimeout(ms, promise) {
		return new Promise((resolve, reject) => {
			if (requestTimer != null) clearTimeout(requestTimer);

			requestTimer = setTimeout(() => {
				var e = new Error('No response from server, please try again');
				reject(e);
			}, ms);
			promise.then(resolve, reject);
		});
	}

	navigateToResetPasswordScreen() {
		this.setState({ loading: false });
		this.props.navigation.navigate(Routes.RESET_PASSWORD);
	}

	showError(msg) {
		Alert.alert('Error Message', msg, [
			{
				text: 'Close',
				style: 'cancel',
				onPress: () => {
					this.setState({ loading: false });
				}
			}
		]);
	}

	render() {
		return (
			/* Use TouchableOpacity to enable the hiding of the
				keyboard when clicking away */
			<TouchableOpacity
				activeOpacity={1}
				style={styles.keyboardHide}
				onPress={Keyboard.dismiss}>
				<KeyboardAvoidingView style={{ flex: 1 }}>
					<ViewBackground source={images.background_login}>
						<Indicator visible={this.state.loading} />
						<View style={globalStyles.containerColor}>
							<Text style={[globalStyles.fontDefault, styles.description]}>
								Please enter the email address associated with your Foxtons account
								and we will email you a link to reset your password
							</Text>
							<Text style={[globalStyles.label, styles.label]}>
								{'Email Address'}
							</Text>
							<Input
								onChange={item => this.setState({ webUsername: item })}
								type={'email-address'}
								styles={styles.emailContainer}
							/>
							<FxButton
								onPress={this.onPressSubmit}
								text="SUBMIT"
								disabled={this.state.loading}
							/>
						</View>
					</ViewBackground>
				</KeyboardAvoidingView>
			</TouchableOpacity>
		);
	}
}

export default ForgottenPasswordScreen;
