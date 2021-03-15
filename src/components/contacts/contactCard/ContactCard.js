import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, Linking, TouchableOpacity } from 'react-native';

import { Routes } from '@src/navigation/screenNames';
import styles from '@src/components/contacts/contactCard/styles';
import globalStyles from '@src/styles/styles';
import images from '@src/assets/images';
import icons from '@src/assets/icons';

export default class ContactCard extends Component {
	static propTypes = {
		index: PropTypes.number.isRequired,
		contact: PropTypes.object.isRequired
	};

	getFullname() {
		return (
			<Text style={globalStyles.contactName}>
				{(this.props.contact.first_name ? this.props.contact.first_name + ' ' : '') +
					(this.props.contact.last_name ? this.props.contact.last_name : '')}
			</Text>
		);
	}

	getJobTitle() {
		return (
			<Text style={[globalStyles.description, styles.title]}>
				{this.props.contact.job_title}
			</Text>
		);
	}

	getEmail() {
		return (
			<View style={styles.link}>
				<View style={styles.iconContainer}>
					<Image style={styles.emailIcon} source={icons.email} />
				</View>
				<Text
					style={globalStyles.text}
					onPress={() => Linking.openURL('mailto:' + this.props.contact.email_address)}>
					{this.props.contact.email_address}
				</Text>
			</View>
		);
	}

	getPhone() {
		return (
			<View style={styles.link}>
				<View style={styles.iconContainer}>
					<Image style={styles.phoneIcon} source={icons.phone} />
				</View>
				<Text
					style={globalStyles.text}
					onPress={() => Linking.openURL('tel:' + this.props.contact.telephone_number)}>
					{this.props.contact.telephone_number}
				</Text>
			</View>
		);
	}

	getPhoto() {
		return this.props.contact.photo_url ? { uri: this.props.contact.photo_url } : null;
	}

	getDetails() {
		this.props.navigation.navigate(Routes.CONTACT_DETAILS, { contact: this.props.contact });
	}

	render() {
		return (
			<View style={[styles.card, this.props.index === 0 ? styles.first : null]}>
				{this.props.contact.photo_url ? (
					<View style={styles.photo}>
						<TouchableOpacity onPress={() => this.getDetails()}>
							<Image
								style={styles.photo}
								source={{ uri: this.props.contact.photo_url }}
							/>
						</TouchableOpacity>
					</View>
				) : null}

				<View style={styles.information}>
					<TouchableOpacity onPress={() => this.getDetails()}>
						<View>
							{this.getFullname()}
							{this.props.contact.job_title ? this.getJobTitle() : null}
						</View>
					</TouchableOpacity>
					<View style={styles.separator} />
					<View>
						{this.props.contact.telephone_number ? this.getPhone() : null}
						{this.props.contact.email_address ? this.getEmail() : null}
					</View>
				</View>
			</View>
		);
	}
}
