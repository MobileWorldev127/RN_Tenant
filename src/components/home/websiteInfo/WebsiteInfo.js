import React, { Component } from 'react';
import { View, Text, Button, Linking } from 'react-native';
import PropTypes from 'prop-types';
import FxButton from '@src/components/shared/button/FxButton';
import { Routes } from '@src/navigation/screenNames';
import globalStyles from '@src/styles/styles';
import styles from '@src/components/home/websiteInfo/styles';
import { FOXTONS_WEBSITE } from '@env';

export default class WebsiteInfo extends Component {
	static propTypes = {
		contact: PropTypes.object
	};

	getContact() {
		return (
			<Text style={[globalStyles.titleText, styles.name]}>
				Hi {this.props.contact.first_name}
			</Text>
		);
	}

	onPressButton() {
		onPressButton = () => {
			this.props.navigation.navigate(Routes.MY_FOXTONS)
		};
	}

	getWebsite() {
		return (
			<View>
				<Text style={[globalStyles.advice, styles.description]}>
					We’re just finalising everything needed for you to move in. {'\n\n'}
					Please visit{' '}
					<Text
						style={[globalStyles.fontDefault, styles.highlight]}
						onPress={() => this.onPressButton()}>
						My Foxtons
					</Text>{' '}
					to check on progress and to see if there’s anything you still need to do:
				</Text>
				<FxButton
					style={styles.linkButton}
					text="MY FOXTONS"
					onPress={() => this.onPressButton()}
				/>
				<View style={globalStyles.separator} />
			</View>
		);
	}

	render() {
		return (
			<View style={styles.websiteInfo}>
				{this.props.contact ? this.getContact() : null}
				{this.getWebsite()}
			</View>
		);
	}
}
