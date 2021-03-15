import React, { Component } from 'react';
import { Text, KeyboardAvoidingView, TouchableOpacity, Keyboard, View, Alert } from 'react-native';
import { TransitionManager, NavigationActions } from 'react-navigation';
import TouchID from 'react-native-touch-id';
import globalStyles from '@src/styles/styles';
import styles from '@src/features/login/styles';
import { Routes } from '@src/navigation/screenNames';
import Link from '@src/components/shared/link/Link';
import auth from '@src/api/auth';
import contacts from '@src/api/contacts';
import properties from '@src/api/properties';
import ViewBackground from '@src/components/shared/viewBackground/ViewBackground';
import FxButton from '@src/components/shared/button/FxButton';
import { colors } from '@src/styles/colors';
import Input from '@src/components/shared/input/Input';
import Indicator from '@src/components/shared/indicator/Indicator';
import images from '@src/assets/images';
import Modal from 'react-native-modal';
import storage from '@src/api/storage';

const optionalConfigObject = {
  title: "Authentication Required", // Android
  imageColor: "#e00606", // Android
  imageErrorColor: "#ff0000", // Android
  sensorDescription: "Touch sensor", // Android
  sensorErrorDescription: "Failed", // Android
  cancelText: "Cancel", // Android
  backgroundMode: false, // Android
  fallbackLabel: "Show Passcode", // iOS (if empty, then label is hidden)
  unifiedErrors: false, // use unified error messages (default false)
	passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
	isModalVisible: false,
	isEnableModalVisible: false,
};

class LoginScreen extends Component {
	constructor(props) {
		super(props);
		this.onPressWhatsThis = this.onPressWhatsThis.bind(this);
		this.onPressForgottenPassword = this.onPressForgottenPassword.bind(this);
		this.onPressLogin = this.onPressLogin.bind(this);

		this.state = {
			loading: false,
			web_username: null,
			web_password: null
		};
	}

	/**
	 * Action button
	 */
	onPressWhatsThis() {
		Keyboard.dismiss();
		this.props.navigation.navigate(Routes.WHATS_THIS);
	}

	/**
	 * Redirect to Forgotten Password screen
	 */
	onPressForgottenPassword() {
		Keyboard.dismiss();
		this.props.navigation.navigate(Routes.FORGOTTEN_PASSWORD);
	}

	/**
	 * Action button
	 */
	onPressLogin = async () => {
		Keyboard.dismiss();
		const authInfo = {
			web_username: this.state.web_username,
			web_password: this.state.web_password
		};

		this.setState({ loading: true });

		try {
			const res = await auth.login(authInfo);

			if (!res || !!res.code) {
				this.showError('The email or password provided is incorrect');
			} else {
			var faceIDModalViewEnable = await storage.get(Routes.FACEID_MODAL_VIEW_ENABLE);
			var faceIDEnable = await storage.get(Routes.FACEID_ENABLE);
				if (faceIDModalViewEnable) {
					this.setState({ loading: false })
					if (!faceIDEnable) {
						const contact = await contacts.getContactById(res.contact_id);
						this.props.navigation.navigate(Routes.APP_NAVIGATOR);
					} else {
						TouchID.authenticate('to demo this react-native component', optionalConfigObject)
							.then(async success => {
								// Alert.alert('Authenticated Successfully');
								// Store user information in storage
								const contact = await contacts.getContactById(res.contact_id);
								this.props.navigation.navigate(Routes.APP_NAVIGATOR);
							})
							.catch(error => {
								Alert.alert('Authentication Failed');
							});
					}
				} else {
					this.setState({ isModalVisible: true, loading: false });
					return;
				}

			}
		} catch (e) {
			this.showError(e.message);
		}
	};

	showError = (msg = '') => {
		Alert.alert('', msg, [
			{
				text: 'Okay',
				onPress: () => this.setState({ loading: false })
			}
		]);
	};

	onPressFaceEnable = () => {
		this.setState({
			isModalVisible: false,
			// isEnableModalVisible: true
		})
		storage.save(Routes.FACEID_MODAL_VIEW_ENABLE, true);
	}

	onPressFaceDisable = () => {
		this.setState({
			isModalVisible: false,
			isEnableModalVisible: false
		})
		storage.save(Routes.FACEID_MODAL_VIEW_ENABLE, true);
		this.props.navigation.navigate(Routes.APP_NAVIGATOR);
	}

	onPressEnableOK = () => {
		this.setState({ isEnableModalVisible: false });
		storage.save(Routes.FACEID_ENABLE, true);
		this.props.navigation.navigate(Routes.APP_NAVIGATOR);
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
							<Text style={[globalStyles.label, globalStyles.fontRegular]}>
								Log in to your My Foxtons account
							</Text>
							<Link onPress={this.onPressWhatsThis} text="What's this?" />

							<Text
								style={[
									globalStyles.label,
									globalStyles.fontRegular,
									styles.label
								]}>
								{'Email Address'}
							</Text>
							<Input
								type={'email-address'}
								onChange={item => this.setState({ web_username: item })}
								styles={styles.emailAddress}
							/>

							<Text
								style={[
									globalStyles.label,
									globalStyles.fontRegular,
									styles.label
								]}>
								{'Password'}
							</Text>
							<Input
								onChange={item => this.setState({ web_password: item })}
								secureTextEntry={true}
								styles={styles.password}
							/>

							<View style={styles.forgottenPassword}>
								<Link
									onPress={this.onPressForgottenPassword}
									text="Forgot Password"
								/>
							</View>

							<FxButton
								onPress={() => this.onPressLogin()}
								text="LOGIN"
								disabled={this.state.loading}
							/>
						</View>
					</ViewBackground>

					<Modal
						isVisible={this.state.isModalVisible}
						onModalHide={() => {
							if (!this.state.isEnableModalVisible) {
								this.setState({isEnableModalVisible: true})
							}
						}}
						style={{ margin: 0, justifyContent: 'flex-end' }}
					>
						<View style={styles.touchIDView}>
							<FxButton
								onPress={() => this.onPressFaceEnable()}
								text="Enable TouchID/FaceID"
							/>
							<FxButton
								onPress={() => this.onPressFaceDisable()}
								text="Disable FaceID/TouchID"
							/>
						</View>
					</Modal>
					<Modal
						isVisible={this.state.isEnableModalVisible}
						style={{ margin: 0, justifyContent: 'flex-end' }}
					>
						<View style={styles.touchIDSuccessView}>
							<Text style={styles.label1}>
								FaceID/TouchID is enrolled & enabled for the Tenancy Tracker. Next time when you access application FaceID/TouchID Authentication will be necessary
							</Text>
							<FxButton
								onPress={() => this.onPressEnableOK()}
								text="OK"
							/>
						</View>
					</Modal>

				</KeyboardAvoidingView>
			</TouchableOpacity>
		);
	}
}

export default LoginScreen;
