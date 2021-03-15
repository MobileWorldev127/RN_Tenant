import React, { Component } from 'react';
import { Text, TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';

import styles from '@src/components/shared/link/styles';
import globalStyles from '@src/styles/styles';

class Link extends Component {
	constructor(props) {
		super(props);
		this.onPressButton = this.onPressButton.bind(this);
	}

	static propTypes = {
		text: PropTypes.string.isRequired
	};

	/**
	 * Callback to emit the component event
	 */
	onPressButton() {
		this.props.onPress();
	}

	render() {
		return (
			<TouchableHighlight
				onPress={this.onPressButton}
				style={[styles.linkContainer, this.props.style]}
				activeOpacity={0.5}
				underlayColor="rgba(0, 0, 0, 0)">
				<Text style={[globalStyles.text, globalStyles.fontRegular, styles.text]}>
					{this.props.text}
				</Text>
			</TouchableHighlight>
		);
	}
}

export default Link;
