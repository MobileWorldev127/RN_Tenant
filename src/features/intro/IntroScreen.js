import React, { Component } from 'react';
import { View, Text, ImageBackground } from 'react-native';
import globalStyles from '@src/styles/styles';
import { colors } from '@src/styles/colors';
import styles from '@src/features/intro/styles';
import FxButton from '@src/components/shared/button/FxButton';
import ViewBackground from '@src/components/shared/viewBackground/ViewBackground';
import { Routes } from '@src/navigation/screenNames';
import storage from '@src/api/storage';
import AppInfoText from '@src/components/shared/appInfoText/AppInfoText';
import images from '@src/assets/images';

import { infoText } from '@src/features/intro/infoText';
class IntroScreen extends Component {
	constructor(props) {
		super(props);
		this.onPressButton = this.onPressButton.bind(this);
	}

	/**
	 * Action button
	 */
	onPressButton() {
		storage.save(Routes.INTRO, true);
		this.props.navigation.navigate(Routes.AUTH_NAVIGATOR);
	}

	render() {
		return (
			<ViewBackground styles={[styles.container]} source={images.background_login}>
				<View style={styles.introPanel}>
					<Text style={styles.header}>
						<Text style={[globalStyles.titleText, globalStyles.fontBold, styles.title]}>
							{'Welcome \nto the Foxtons Tenant App'}
						</Text>
					</Text>
					<AppInfoText
						style={styles.listItems}
						pointStyle={styles.point}
						items={infoText}
					/>
					<FxButton text="LET'S GO" onPress={this.onPressButton} />
				</View>
			</ViewBackground>
		);
	}
}

export default IntroScreen;
