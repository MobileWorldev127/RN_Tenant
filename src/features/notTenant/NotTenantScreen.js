import React, { Component } from 'react';
import { View, Text, Linking, Alert } from 'react-native';

import { GET_IN_TOUCH_TEL } from '@env';
import globalStyles from '@src/styles/styles';
import ViewBackground from '@src/components/shared/viewBackground/ViewBackground';
import styles from '@src/features/notTenant/styles';
import contacts from '@src/api/contacts';

class NotTenantScreen extends Component {
	constructor(props) {
		super(props);

		const contact = this.props.navigation.state.params && this.props.navigation.state.params.contact;

		this.state = { contact: contact };

	}

	componentDidMount() {
		if (!this.state.contact) this.init();
	}


	async init() {
		this.setState({ contact: await contacts.getContact() });
	}

	getFullname() {
		if (this.state.contact) {
			const title = this.state.contact.title;
			const firstName = this.state.contact.first_name;
			const lastName = this.state.contact.last_name;

			return firstName || title + ' ' + lastName;
		}

		return null;
	}

	getInTouch() {
		const url = `tel:${GET_IN_TOUCH_TEL}`;
		Linking.canOpenURL(url)
			.then(supported => {
				if (!supported) {
					console.log("Can't handle url: " + url);
				} else {
					this.showCallAlert(url);
				}
			})
			.catch(err => console.error('An error occurred', err));
	}

	showCallAlert = url => {
		Alert.alert('', GET_IN_TOUCH_TEL, [
			{ text: 'Cancel', style: 'cancel' },
			{ text: 'Call', onPress: () => Linking.openURL(url) }
		]);
	};

	render() {
		return (
			<ViewBackground>
				<View style={globalStyles.containerColor}>
					<Text style={globalStyles.titleText}>
						Hi {this.getFullname()}
						{'\n'}
					</Text>
					<Text style={globalStyles.advice}>
						It doesn’t appear that you have a tenancy agreement with us yet.
						{'\n'}
						{'\n'}
					</Text>
					<Text style={globalStyles.advice}>
						If you think this is a mistake, then please{' '}
						<Text
							style={[globalStyles.fontDefault, styles.getInTouch]}
							onPress={() => this.getInTouch()}>
							get in touch.
						</Text>
					</Text>
				</View>
			</ViewBackground>
		);
	}
}

export default NotTenantScreen;
