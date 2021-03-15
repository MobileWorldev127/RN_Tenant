import React, { Component } from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import PropTypes from 'prop-types';

import globalStyles from '@src/styles/styles';
import styles from '@src/components/shared/toggleButton/styles';
import { colors } from '@src/styles/colors';
import icons from '@src/assets/icons';

export default class ToggleButton extends Component {
	constructor(props) {
		super(props);
		this.state = {
			toggleState: false
		};
	}

	static propTypes = {
		icon: PropTypes.any,
		text: PropTypes.string.isRequired,
		onPress: PropTypes.func.isRequired,
		disabled: PropTypes.bool
	};

	getIcon() {
		return (
			<View style={styles.icon}>
				<Image style={this.props.icon.style} source={this.props.icon.source} />
			</View>
		);
	}

	getToggleArrow() {
		return (
			<View style={styles.arrow}>
				<Image
					style={styles.arrowIcon}
					source={this.state.toggleState ? icons.blackUpArrow : icons.blackDownArrow}
				/>
			</View>
		);
	}

	onPressButton(event) {
		this.setState({ toggleState: !this.state.toggleState }, () => {
			this.props.onPress(this.state.toggleState);
		});
	}

	render() {
		return (
			<TouchableOpacity
				onPress={() => this.onPressButton()}
				style={[styles.button, this.props.style]}
				activeOpacity={0.5}
				disabled={this.props.disabled}
				underlayColor={colors.primary}>
				{this.props.icon ? this.getIcon() : null}
				<Text style={[globalStyles.text, styles.text]}>{this.props.text}</Text>
				{this.getToggleArrow()}
			</TouchableOpacity>
		);
	}
}
