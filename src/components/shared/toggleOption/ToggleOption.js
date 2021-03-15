import React, { Component } from 'react';
import ReactNative, { TouchableOpacity, View, Text, Image, findNodeHandle, Dimensions, Platform } from 'react-native';
import PropTypes from 'prop-types';

import globalStyles from '@src/styles/styles';
import styles from '@src/components/shared/toggleOption/styles';
import { colors } from '@src/styles/colors';
import icons from '@src/assets/icons';

export default class ToggleOption extends Component {
	constructor(props) {
		super(props);
		this.state = {
			toggleState: false
		};
	}

	static propTypes = {
		parent: PropTypes.object,
		parentHeight: PropTypes.number,
		text: PropTypes.string.isRequired,
		content: PropTypes.any.isRequired
	};

	getToggleArrow() {
		return (
			<View style={styles.arrow}>
				<Image
					style={styles.arrowIcon}
					source={this.state.toggleState ? icons.collapseCarot : icons.expandCarot}
				/>
			</View>
		);
	}

	onPressButton(event) {
		this.setState({ toggleState: !this.state.toggleState }, () => {
			if (this.state.toggleState && this.props.parent) {
				const parent = ReactNative.findNodeHandle(this.props.parent);
				this.optionView.measureLayout(parent, (x, y, w, h) => {
					if (Platform.OS === 'ios') {
						setTimeout(() => {
							const { height } = Dimensions.get('window');
							const scroll = (height + y) > (this.props.parentHeight + 30) ? (this.props.parentHeight - height) : y;
							this.props.parent.scrollTo({ y: scroll < 0 ? 0 : scroll });
						});
					} else {
						this.props.parent.scrollTo({ y: y });
					}
				});
			}
		});
	}

	render() {
		return (
			<View
				ref={ref => (this.optionView = ref)}
				renderToHardwareTextureAndroid={true}
				collapsable={false}>
				<TouchableOpacity
					onPress={event => this.onPressButton(event)}
					style={[styles.button, this.props.style]}
					activeOpacity={0.5}
					disabled={this.props.disabled}
					underlayColor={colors.primary}>
					<Text style={[globalStyles.advice, styles.text]}>{this.props.text}</Text>
					{this.getToggleArrow()}
				</TouchableOpacity>
				<View style={styles.content}>
					{this.state.toggleState ? this.props.content : null}
				</View>
			</View>
		);
	}
}
