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

class ResetPasswordScreen extends Component {
	constructor(props) {
		super(props);
		this.onPressSubmit = this.onPressSubmit.bind(this);
		this.state = {
			loading: false
		};
	}

	/**
	 * Redirect back to login screen
	 */
	onPressSubmit() {
		this.props.navigation.navigate(Routes.LOGIN);
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
							<Text style={globalStyles.subTitleTextBold}>
								{'Thank You'}
								{'\n'}
							</Text>
							<Text style={[globalStyles.fontDefault, styles.description]}>
								An email has been sent to your email address with a link to reset
								your password
							</Text>
							<FxButton
								onPress={this.onPressSubmit}
								text="DONE"
								disabled={this.state.loading}
							/>
						</View>
					</ViewBackground>
				</KeyboardAvoidingView>
			</TouchableOpacity>
		);
	}
}

export default ResetPasswordScreen;
