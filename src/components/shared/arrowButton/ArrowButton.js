import React, { Component } from 'react';
import { View, Text, TouchableHighlight, Image } from 'react-native';
import PropTypes from 'prop-types';

import styles from '@src/components/shared/arrowButton/styles';
import globalStyles from '@src/styles/styles';
import { colors } from '@src/styles/colors';
import icons from '@src/assets/icons';

export default class ArrowButton extends Component {
	static propTypes = {
		index: PropTypes.number.isRequired,
		id: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		description: PropTypes.string,
		style: PropTypes.any,
		click: PropTypes.func
	};

	getButtonStyle() {
		return [
			styles.container,
			this.props.index !== 0 ? styles.buttonBorder : {},
			this.props.style
		];
	}

	getDescription() {
		return (
			<Text style={[globalStyles.description, styles.description]} numberOfLines={2}>
				{this.props.description}
			</Text>
		);
	}

	render() {
		return (
			<TouchableHighlight
				onPress={() => this.props.click(this.props.id)}
				activeOpacity={0.5}
				underlayColor={colors.white}
				style={styles.arrowButton}
			>
				<View style={this.getButtonStyle()}>
					<View style={styles.text}>
						<Text style={[globalStyles.textBold, globalStyles.fontBold, styles.title]}>
							{this.props.title.toUpperCase()}
						</Text>
						{this.props.description ? this.getDescription() : null}
					</View>
					<View style={styles.arrow}>
						<Image style={styles.arrowIcon} source={icons.arrow} />
					</View>
				</View>
			</TouchableHighlight>
		);
	}
}
