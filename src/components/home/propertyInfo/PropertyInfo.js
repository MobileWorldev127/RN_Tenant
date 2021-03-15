import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';
import styles from '@src/components/home/propertyInfo/styles';

import globalStyles from '@src/styles/styles';

export default class PropertyInfo extends Component {
	static propTypes = {
		homeType: PropTypes.string.isRequired,
		contact: PropTypes.object,
		property: PropTypes.object
	};

	/**
	 * Get property info
	 */
	getPropertyInfo() {
		const address = this.props.property.property_address;
		return (
			<View>
				<Text style={[globalStyles.text, globalStyles.fontLight]}>
					{address.address_line_1 +
						(address.address_line_2 || address.address_line_3 ? ', ' : ' ') +
						(address.address_line_2 || '') +
						(address.address_line_3 || '') +
						'\n' +
						address.address_town +
						', ' +
						address.address_postcode}
				</Text>
			</View>
		);
	}

	/**
	 * Get user info
	 */
	getContact() {
		return (
			<Text
				style={[globalStyles.titleText, globalStyles.fontBold, styles.name]}
				numberOfLines={2}>
				Hi{' '}
				{this.props.contact.first_name ||
					this.props.contact.title + ' ' + this.props.contact.last_name}
			</Text>
		);
	}

	render() {
		return (
			<View style={[styles.propertyInfo, this.props.style]}>
				{this.props.contact ? this.getContact() : null}
				{this.props.property ? this.getPropertyInfo() : null}
			</View>
		);
	}
}
