import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import PropTypes from 'prop-types';
import auth from '@src/api/auth';
import contacts from '@src/api/contacts';
import { Routes } from '@src/navigation/screenNames';
import FxButton from '@src/components/shared/button/FxButton';
import ViewBackground from '@src/components/shared/viewBackground/ViewBackground';
import Link from '@src/components/shared/link/Link';

import globalStyles from '@src/styles/styles';
import styles from '@src/features/settings/styles';

export default class SettingsScreen extends Component {
	constructor(props) {
		super(props);
		this.init();
	}

	state = {
		contact: null
	};

	async init() {
		this.setState({
			contact: await contacts.getContact()
		});
	}

	getFullname() {
		if (this.state.contact) {
			const title = this.state.contact.title;
			const firstName = this.state.contact.first_name;
			const lastName = this.state.contact.last_name;

			let fullName = '';

			if (title) fullName += `${title} `;
			if (firstName) fullName += `${firstName} `;
			if (lastName) fullName += `${lastName} `;
			return fullName;
		}
		return null;
	}

	getInfo() {
		return (
			<View style={styles.container}>
				<Text style={[globalStyles.text, globalStyles.fontLight]}>
					You are currently logged in as
				</Text>
				<Text style={[globalStyles.subTitleTextBold, styles.name]}>
					{this.getFullname()}
				</Text>
				<Text style={[globalStyles.fontDefault, styles.username]}>
					{this.state.contact && this.state.contact.web_username}
				</Text>
				<Text style={[globalStyles.textDescription, styles.note]}>
					Need to change your contact details? Please get in touch with your Foxtons
					representative.
				</Text>
				<FxButton style={styles.signout} text="SIGN OUT" onPress={() => this.logout()} />
			</View>
		);
	}

	getLinks() {
		return (
			<View style={styles.container}>
				<Link
					onPress={() => this.props.navigation.navigate(Routes.PRIVACY_POLICY)}
					text={'Privacy Policy'}
					style={styles.link}
				/>
				<Link
					onPress={() => this.props.navigation.navigate(Routes.TERMS_AND_CONDITIONS)}
					text={'Terms of Use'}
				/>
			</View>
		);
	}

	async logout() {
		await contacts.deleteApplicationEndpoint(Platform.OS, DeviceInfo.getUniqueId());
		await auth.resetAccessToken();
		this.props.navigation.navigate(Routes.AUTH_NAVIGATOR);
	}

	render() {
		return (
			<ViewBackground>
				<View style={[globalStyles.containerColor, styles.screen]}>
					{this.getInfo()}
					{this.getLinks()}
				</View>
			</ViewBackground>
		);
	}
}
