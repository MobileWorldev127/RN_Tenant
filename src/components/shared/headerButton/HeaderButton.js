import React, { Component } from 'react';
import { Text, TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';

import globalStyles from '@src/styles/styles';
import styles from '@src/components/shared/headerButton/styles';

export default class HeaderButton extends Component {
	constructor(props) {
		super(props);
	}

	static propTypes = {
		source: PropTypes.any,
		text: PropTypes.string,
		click: PropTypes.func
	};

	render() {
		return (
			<TouchableOpacity
				onPress={() => (this.props.click ? this.props.click() : null)}
				style={[styles.button, this.props.containerStyle]}>
				{this.props.source ? (
					<Image style={[styles.image, this.props.style]} source={this.props.source} />
				) : (
					<Text style={[globalStyles.fontDefault, styles.text, this.props.style]}>
						{this.props.text}
					</Text>
				)}
			</TouchableOpacity>
		);
	}
}
