import React, { Component } from 'react';
import { View, Text, TouchableHighlight, Image } from 'react-native';
import PropTypes from 'prop-types';

import styles from '@src/components/vouchers/VoucherCard/styles';
import globalStyles from '@src/styles/styles';
import { colors } from '@src/styles/colors';

export default class VoucherCard extends Component {
	constructor(props) {
		super(props);
	}

	static propTypes = {
		click: PropTypes.func,
		icon: PropTypes.any,
		styles: PropTypes.any
	};

	capitalize = text => {
		if (text) return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
	};

	render() {
		return (
			<TouchableHighlight
				style={[styles.card, this.props.styles]}
				onPress={this.props.onPress}
				activeOpacity={0.5}
				underlayColor={colors.white}>
				<Image style={styles.icon} source={{ uri: this.props.icon }} />
			</TouchableHighlight>
		);
	}
}
