import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

import globalStyles from '@src/styles/styles';
import styles from '@src/components/shared/appInfoText/styles';

export default class AppInfoText extends Component {
	static propTypes = {
		items: PropTypes.array.isRequired,
		pointStyle: PropTypes.any
	};
	/**
	 * The function generates the Text component
	 * @param {*} text
	 * @param {*} key
	 */
	generateTextList(text, key) {
		return (
			<View key={key} style={styles.listItem}>
				<Text style={[globalStyles.text, styles.listItemPoint, this.props.pointStyle]}>
					•{' '}
				</Text>
				<Text style={[globalStyles.text, styles.text, globalStyles.fontLight]}>{text}</Text>
			</View>
		);
	}

	render() {
		return (
			<View style={this.props.style}>
				{this.props.items.map((item, i) => this.generateTextList(item.text, i))}
			</View>
		);
	}
}
