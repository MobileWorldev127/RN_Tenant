import React, { Component } from 'react';
import { View, Text, TouchableHighlight, Image } from 'react-native';
import PropTypes from 'prop-types';

import styles from '@src/components/issues/issueTypeCard/styles';
import globalStyles from '@src/styles/styles';
import icons from '@src/assets/icons';
import { colors } from '@src/styles/colors';

class IssueTypeCard extends Component {
	constructor(props) {
		super(props);
		this.onPress.bind(this.onPress);
		this.getStyleDes.bind(this.getStyleDes);
	}

	static propTypes = {
		item: PropTypes.object.isRequired,
		click: PropTypes.func,
		icon: PropTypes.any,
		styles: PropTypes.any,
		iconStyles: PropTypes.any,
		isSubIssue: PropTypes.bool
	};

	onPress() {
		this.props.click(this.props.item);
	}

	getStyleDes() {
		return this.props.isSubIssue ? styles.infoCentered : null;
	}

	capitalize = text => {
		if (text) return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
	};

	render() {
		return (
			<TouchableHighlight
				style={[styles.card, this.props.styles]}
				onPress={() => this.onPress()}
				activeOpacity={0.5}
				underlayColor={colors.white}>
				<View style={styles.viewCard}>
					<View style={styles.iconView}>
						<Image
							style={[styles.icon, this.props.iconStyles]}
							source={this.props.icon}
						/>
					</View>
					<View style={[styles.info, this.getStyleDes()]}>
						<Text style={[globalStyles.text, globalStyles.fontMedium]}>
							{this.props.item.issue_type_name}
						</Text>
						<Text style={[globalStyles.description, styles.description]}>
							{this.capitalize(this.props.item.issue_type_routing)}
						</Text>
					</View>
				</View>
			</TouchableHighlight>
		);
	}
}

export default IssueTypeCard;
