import React, { Component } from 'react';
import { Text, View, Image, Linking } from 'react-native';
import PropTypes from 'prop-types';

import { Routes } from '@src/navigation/screenNames';
import globalStyles from '@src/styles/styles';
import styles from '@src/features/contacts/contactDetails/styles';
import images from '@src/assets/images';
import icons from '@src/assets/icons';

export default class ContactDetailsScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			contact: this.props.navigation.state.params
				? this.props.navigation.state.params.contact
				: null
		};
	}

	getJobTitle() {
		return (
			<Text style={[globalStyles.text, styles.title]}>{this.state.contact.job_title}</Text>
		);
	}

	getEmail() {
		return (
			<View style={styles.link}>
				<Image style={styles.emailIcon} source={icons.email} />
				<Text
					style={globalStyles.text}
					onPress={() => Linking.openURL('mailto:' + this.state.contact.email_address)}>
					{this.state.contact.email_address}
				</Text>
			</View>
		);
	}

	getPhone() {
		return (
			<View style={styles.link}>
				<Image style={styles.phoneIcon} source={icons.phone} />
				<Text
					style={globalStyles.text}
					onPress={() => Linking.openURL('tel:' + this.state.contact.telephone_number)}>
					{this.state.contact.telephone_number}
				</Text>
			</View>
		);
	}

	getPhoto() {
		return this.state.contact.photo_url ? { uri: this.state.contact.photo_url } : null;
	}

	render() {
		return this.state.contact ? (
			<View style={styles.container}>
				{this.state.contact.photo_url ? (
					<Image
						style={[styles.photo, this.state.contact.photo_url ? styles.fit : null]}
						source={this.getPhoto()}
					/>
				) : null}
				<View style={styles.information}>
					<Text style={globalStyles.contactDetailsName}>
						{(this.state.contact.first_name
							? this.state.contact.first_name + ' '
							: '') +
							(this.state.contact.last_name ? this.state.contact.last_name : '')}
					</Text>
					{this.state.contact.job_title ? this.getJobTitle() : null}
					<Text style={[globalStyles.fontDefault, styles.separator]} />
					{this.state.contact.telephone_number ? this.getPhone() : null}
					{this.state.contact.email_address ? this.getEmail() : null}
				</View>
			</View>
		) : null;
	}
}
