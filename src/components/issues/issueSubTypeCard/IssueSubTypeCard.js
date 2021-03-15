import React, { Component } from 'react';
import { View, Text, TouchableHighlight, Image } from 'react-native';
import PropTypes from 'prop-types';

import styles from '@src/components/issues/issueSubTypeCard/styles';
import globalStyles from '@src/styles/styles';
import icons from '@src/assets/icons';
import { colors } from '@src/styles/colors';

class IssueSubTypeCard extends Component {
	constructor(props) {
		super(props);
		this.onPress.bind(this.onPress);
	}

	static propTypes = {
		item: PropTypes.object.isRequired,
		click: PropTypes.func,
		icon: PropTypes.any,
		styles: PropTypes.any,
		iconStyles: PropTypes.any
	};

	onPress() {
		this.props.click(this.props.item);
	}

	render() {
		return (
			<TouchableHighlight
				style={[styles.card, this.props.styles]}
				onPress={() => this.onPress()}
				activeOpacity={0.5}
				underlayColor={colors.white}>
				<View style={styles.viewCard}>
					<View style={styles.view}>
						<View style={styles.iconView}>
							<Image
								style={[styles.icon, this.props.iconStyles]}
								source={this.props.icon}
							/>
						</View>

						<View style={[styles.info]}>
							<Text style={globalStyles.textBold}>
								{this.props.item.issue_type_name}
							</Text>
							<Text style={globalStyles.description}>
								{this.props.item.issue_type_routing}
							</Text>
						</View>
					</View>
				</View>
			</TouchableHighlight>
		);
	}
}

export default IssueSubTypeCard;
