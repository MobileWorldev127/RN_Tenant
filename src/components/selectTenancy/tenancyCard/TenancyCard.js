import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavigationActions } from 'react-navigation';
import { PROPERTY_PHOTO_PATTERN } from '@env';
import moment from 'moment';

import { Routes } from '@src/navigation/screenNames';
import { View, Text, TouchableHighlight, Image } from 'react-native';
import styles from '@src/components/selectTenancy/tenancyCard/styles';
import globalStyles from '@src/styles/styles';
import properties from '@src/api/properties';

export default class TenancyCard extends Component {
	static propTypes = {
		item: PropTypes.object.isRequired,
		onPress: PropTypes.func
	};

	getAddress() {
		return (
			<View style={styles.address}>
				<Text style={[globalStyles.fontLight, styles.textAddress]}>
					{this.props.item.property_address.address_line_1 +
						', ' +
						(this.props.item.property_address.address_line_2 || '') +
						(this.props.item.property_address.address_line_3 || '')}
				</Text>
				<Text style={[globalStyles.fontLight, styles.textAddress]}>
					{this.props.item.property_address.address_town +
						', ' +
						this.props.item.property_address.address_postcode}
				</Text>
			</View>
		);
	}

	getTenancyDate() {
		const tenancy = this.props.item.tenancies[0];
		let startDateText = null;
		let endDateText = null;

		if (tenancy) {
			const startDate = new Date(tenancy.tenancy.tenancy_start_date);
			if (startDate) startDateText = 'Starts ' + moment(startDate).format('DD MMM YYYY');

			const endDate = new Date(tenancy.tenancy.tenancy_vacate_date || tenancy.tenancy.tenancy_end_date);
			if (endDate) endDateText = 'Ends ' + moment(endDate).format('DD MMM YYYY');
		}

		return (
			<View style={styles.dates}>
				<Text style={[globalStyles.fontMedium, styles.date]}>{startDateText}</Text>
				<Text style={[globalStyles.fontMedium, styles.date, styles.left]}>
					{endDateText}
				</Text>
			</View>
		);
	}

	getPhoto() {
		let ref = this.props.item.property_reference
			.replace(/^[^0-9]{4}/g, '')
			.split('')
			.reverse();

		ref.splice(4, 0, '/');
		ref.splice(2, 0, '/');

		return PROPERTY_PHOTO_PATTERN.replace('{photoId}', ref.join(''));
	}

	/**
	 * Select tenancy
	 */
	async onPressButton(item) {
		properties.setProperty(item);

		//We need to mark home screen as the main in the routing history
		const resetAction = NavigationActions.reset({
			index: 0,
			actions: [
				NavigationActions.navigate({
					routeName: Routes.HOME,
					params: {
						multiple: true,
						property: item
					}
				})
			]
		});

		this.props.navigation.dispatch(resetAction);
	}

	render() {
		return (
			<TouchableHighlight
				onPress={() => this.onPressButton(this.props.item)}
				style={styles.card}
				key={this.props.item.property_id}>
				<View>
					<View style={styles.photoContainer}>
						<Image style={styles.photo} source={{ uri: this.getPhoto() }} />
					</View>

					<View style={styles.text}>
						{this.getAddress()}
						{this.getTenancyDate()}
					</View>
				</View>
			</TouchableHighlight>
		);
	}
}
