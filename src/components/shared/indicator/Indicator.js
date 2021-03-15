import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

import styles from '/src/components/shared/indicator/styles';
import { colors } from '/src/styles/colors';

export default class Indicator extends Component {
	static propTypes = {
		visible: PropTypes.bool,
		text: PropTypes.string
	};

	render() {
		return (
			this.props.visible &&
				<View style={{ flex: 1, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 100}}>
					<View style={styles.container}>
						<View style={styles.panel}>
							<ActivityIndicator
								style={styles.indicator}
								size="large"
								color={colors.primary}
							/>
							{this.props.text ? (
								<Text style={styles.text}>{this.props.text}</Text>
							) : null}
						</View>
					</View>
				</View>
		);
	}
}
