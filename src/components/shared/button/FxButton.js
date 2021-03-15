import React, { Component } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';
import globalStyles from '@src/styles/styles';
import styles from '@src/components/shared/button/styles';
import { colors } from '@src/styles/colors';

class FxButton extends Component {
	constructor(props) {
		super(props);
		this.onPressButton = this.onPressButton.bind(this);
	}

	static propTypes = {
		text: PropTypes.string.isRequired,
		onPress: PropTypes.func.isRequired,
		disabled: PropTypes.bool
	};

	/**
	 * Callback to emit the component event
	 */
	onPressButton(event) {
		this.props.onPress(event);
	}

	render() {
		return (
			<TouchableOpacity
				onPress={event => this.onPressButton(event)}
				style={[styles.button, this.props.style]}
				activeOpacity={0.5}
				disabled={this.props.disabled}
				underlayColor={colors.primary}>
				<Text style={[styles.buttonText, globalStyles.fontBold]}>{this.props.text}</Text>
			</TouchableOpacity>
		);
	}
}

export default FxButton;
