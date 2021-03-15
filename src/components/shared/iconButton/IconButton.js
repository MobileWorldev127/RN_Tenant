import React, { PureComponent } from 'react';
import { View, Text, TouchableHighlight, Image } from 'react-native';
import PropTypes from 'prop-types';

import styles from '@src/components/shared/iconButton/styles';
import globalStyles from '@src/styles/styles';
import { colors } from '@src/styles/colors';

/**
 * Component style:
 *
 * style: {
 * 		highlight: style for TouchableHighlight
 * 		button:	style for Button
 * 		title: style for button title text
 * 		description: style for button description text
 * 		type: style for type text (ex. IssueTabs)
 * }
 */
export default class IconButton extends PureComponent {
	static propTypes = {
		index: PropTypes.number,
		id: PropTypes.string,
		icon: PropTypes.any,
		title: PropTypes.string.isRequired,
		type: PropTypes.string,
		updates: PropTypes.number,
		description: PropTypes.any,
		action: PropTypes.func,
		click: PropTypes.func,
		style: PropTypes.object
	};

	constructor(props) {
		super(props);

		this.state = {
			style: this.props.style || {}
		};
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ style: nextProps.style || {} });
	}

	getButtonStyle() {
		return [
			styles.container,
			!!this.props.index && this.props.index !== 0 ? styles.buttonBorder : {},
			this.state.style.button
		];
	}

	getIcon() {
		return (
			<View style={[styles.icon, this.props.icon.container]}>
				<Image style={this.props.icon.style} source={this.props.icon.source} />
			</View>
		);
	}

	getType() {
		return (
			<View style={styles.row}>
				<Text style={[globalStyles.typeLabel, this.state.style.type]} numberOfLines={1}>
					{this.props.type}
				</Text>
				{this.props.updates && (
					<View style={styles.updated}>
						<Text style={[globalStyles.fontDefault, styles.updatedText]}>
							{this.props.updates} UNREAD
						</Text>
					</View>
				)}
			</View>
		);
	}

	getTitle() {
		return (
			<View style={styles.row}>
				<Text
					style={[globalStyles.textBold, globalStyles.fontBold, this.state.style.title]}
					numberOfLines={1}>
					{this.props.title}
				</Text>
				{this.props.updates > 0 &&
					!this.props.type && (
						<View style={styles.updated}>
							<Text style={[globalStyles.fontDefault, styles.updatedText]}>
								{this.props.updates} UNREAD
							</Text>
						</View>
					)}
			</View>
		);
	}

	render() {
		return (
			<TouchableHighlight
				style={[this.state.style.highlight, styles.iconButton]}
				onPress={() => this.props.click(this.props.id)}
				activeOpacity={0.5}
				underlayColor={colors.white}>
				<View style={this.getButtonStyle()}>
					{this.props.icon ? this.getIcon() : null}
					<View style={styles.text}>
						{this.props.type ? this.getType() : null}
						{this.getTitle()}
						{this.props.description ? (
							<Text
								style={[
									globalStyles.description,
									globalStyles.fontRegular,
									styles.description,
									this.state.style.description
								]}
								numberOfLines={2}>
								{this.props.description}
							</Text>
						) : null}
					</View>
				</View>
			</TouchableHighlight>
		);
	}
}
