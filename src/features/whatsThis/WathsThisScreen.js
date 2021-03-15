import React, { Component } from 'react';
import { View, Text, Linking } from 'react-native';
import globalStyles from '@src/styles/styles';
import styles from '@src/features/whatsThis/styles';
import FxButton from '@src/components/shared/button/FxButton';
import ViewBackground from '@src/components/shared/viewBackground/ViewBackground';
import { Routes } from '@src/navigation/screenNames';
import storage from '@src/api/storage';
import AppInfoText from '@src/components/shared/appInfoText/AppInfoText';
import { infoText } from '@src/features/whatsThis/infoText';
import images from '@src/assets/images';

const URL = 'https://www.foxtons.co.uk/auth/enter/?mode=register';

class WathsThisScreen extends Component {
	constructor(props) {
		super(props);
		this.onPressButton = this.onPressButton.bind(this);
		this.onPressLink = this.onPressLink.bind(this);
	}

	/**
	 * Action button
	 */
	onPressButton() {
		storage.save(Routes.INTRO, true);
		this.props.navigation.navigate(Routes.AUTH_NAVIGATOR);
	}

	/**
	 * onPressLink
	 */
	onPressLink() {
		Linking.openURL(URL);
	}

	render() {
		return (
			<ViewBackground styles={styles.container} source={images.background_login}>
				<View style={globalStyles.containerColor}>
					<Text
						style={[
							globalStyles.subTitleTextBold,
							globalStyles.fontBold,
							styles.title
						]}>
						{'Interact with Foxtons anytime, anywhere, with your My Foxtons account'}
						{'\n'}
					</Text>
					<Text style={[globalStyles.text, globalStyles.fontLight, styles.listTitle]}>
						With My Foxtons you can:
					</Text>
					<AppInfoText style={styles.listItems} items={infoText} />

					<View style={[globalStyles.separator, styles.separator]} />

					<Text style={[globalStyles.textBold, globalStyles.fontRegular]}>
						An account should have been created for you as part of registering with us
						to find your new home. If you are not registered with Foxtons you can do so
						now.
						{'\n'}
					</Text>
					<FxButton text="REGISTER WITH FOXTONS" onPress={this.onPressLink} />
				</View>
			</ViewBackground>
		);
	}
}

export default WathsThisScreen;
