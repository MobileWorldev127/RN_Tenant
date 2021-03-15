import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';

import globalStyles from '@src/styles/styles';
import styles from '@src/components/home/dayCounter/styles';
import { colors } from '@src/styles/colors';

export default class DayCounter extends Component {
	static propTypes = {
		days: PropTypes.number.isRequired
	};

	render() {
		return (
			<TouchableHighlight
				style={styles.counter}
				activeOpacity={0.5}
				underlayColor={colors.white}>
				<View style={styles.container}>
					<View style={styles.dayContainer}>
						<Text style={[globalStyles.fontLight, styles.days]}>{this.props.days}</Text>
					</View>

					<View>
						<Text style={[globalStyles.textBold, styles.description]}>
							{(this.props.days > 1 ? 'DAYS' : 'DAY') +
								'\n' +
								'UNTIL YOU GET THE KEYS'}
						</Text>
					</View>
				</View>
			</TouchableHighlight>
		);
	}
}
