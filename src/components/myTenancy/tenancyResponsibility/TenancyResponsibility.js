import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image } from 'react-native';

import globalStyles from '@src/styles/styles';
import styles from '@src/components/myTenancy/tenancyResponsibility/styles';
import icons from '@src/assets/icons';
import responsibilityText from '@src/components/myTenancy/tenancyResponsibility/responsibilityText';

export default class TenancyResponsibility extends Component {
	static propTypes = {
		offer: PropTypes.object.isRequired
	};

	getResponsibility() {
		return Object.keys(responsibilityText).map((key, index) => {
			return this.props.offer[key] ? (
				<View key={index} style={styles.row}>
					<View style={styles.icon}>
						<Image style={styles.iconImage} source={icons.check} />
					</View>

					<Text style={[globalStyles.text, styles.text]}>{responsibilityText[key]}</Text>
				</View>
			) : null;
		});
	}

	render() {
		const visible = Object.keys(responsibilityText).some(key => this.props.offer[key]);
		return visible ? (
			<View style={[globalStyles.containerColor, styles.screen]}>
				<Text style={[globalStyles.advice, globalStyles.fontMedium, styles.title]}>You are responsible for</Text>
				{this.getResponsibility()}
			</View>
		) : null;
	}
}
