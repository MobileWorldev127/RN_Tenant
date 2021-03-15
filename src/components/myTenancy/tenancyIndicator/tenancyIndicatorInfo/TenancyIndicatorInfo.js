import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import StepIndicator from '@src/components/shared/stepIndicator/StepIndicator';
import ToggleButton from '@src/components/shared/toggleButton/ToggleButton';

import globalStyles from '@src/styles/styles';
import styles from '@src/components/myTenancy/tenancyIndicator/tenancyIndicatorInfo/styles';
import icons from '@src/assets/icons';

export default class TenancyIndicatorInfo extends Component {
	static propTypes = {
		title: PropTypes.string,
		date: PropTypes.string.isRequired,
		amount: PropTypes.string,
		managed: PropTypes.bool,
		detailsDate: PropTypes.string,
		detailsNote: PropTypes.string
	};

	constructor(props) {
		super(props);
		this.state = {
			showDetails: false
		};
	}

	getDetailsButton() {
		return (
			<ToggleButton
				icon={{
					source: this.props.managed ? icons.managedIcon : icons.nonManagedIcon,
					style: styles.buttonIcon
				}}
				style={[styles.button, this.props.managed ? styles.managed : styles.nonmanaged]}
				text={this.props.managed ? 'Managed' : 'Non-managed'}
				onPress={showDetails => this.setState({ showDetails })}
			/>
		);
	}

	getDetails() {
		return this.props.detailsDate || this.props.detailsNote ? (
			<View style={styles.details}>
				<Text style={[globalStyles.textBold, styles.text]}>{this.props.detailsDate}</Text>
				<Text style={[globalStyles.text, styles.text]}>{this.props.detailsNote}</Text>
			</View>
		) : null;
	}

	render() {
		return (
			<View style={styles.container}>
				{this.props.title ? (
					<Text style={[globalStyles.textBold, styles.text]}>
						{this.props.title.toUpperCase()}
					</Text>
				) : null}
				<Text style={[globalStyles.text, styles.text]}>{this.props.date}</Text>
				{this.props.amount ? (
					<Text style={[globalStyles.text, styles.text]}>{this.props.amount}</Text>
				) : null}
				{this.props.managed !== undefined ? this.getDetailsButton() : null}
				{this.state.showDetails ? this.getDetails() : null}
			</View>
		);
	}
}
