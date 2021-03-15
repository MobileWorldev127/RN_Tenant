import React, { Component } from 'react';
import { View, Text } from 'react-native';

import globalStyles from '@src/styles/styles';
import styles from '@src/features/myTenancy/makeChanges/styles';
import FxButton from '@src/components/shared/button/FxButton';
import { issueType } from '@src/features/issues/constants/issueType';
import { Routes } from '@src/navigation/screenNames';

class MakeChangesConfirmScreen extends Component {
	constructor(props) {
		super(props);
		this.onPressBackHome = this.onPressBackHome.bind(this);
		this.state = {
			type: this.props.navigation.state.params.type
		};

		this.getText();
	}

	getText() {
		switch (this.state.type) {
			case issueType.RENEWALS:
				return 'renewal';
			case issueType.END_OF_TENANCY:
				return 'intention to break';
			case issueType.CHANGE_OF_OCCUPANCY:
				return 'change to the occupancy';
		}
	}

	onPressBackHome() {
		this.props.navigation.popToTop();
	}

	render() {
		return (
			<View style={globalStyles.containerColor}>
				<Text style={globalStyles.subTitleText}>Thank you</Text>
				<Text style={[globalStyles.description, styles.margin]}>
					We will be in touch soon to discuss your {this.getText()}.
					{'\n'}
					{'\n'}
				</Text>

				<FxButton
					onPress={this.onPressBackHome}
					text="BACK TO HOME"
					style={styles.margin}
				/>
			</View>
		);
	}
}

export default MakeChangesConfirmScreen;
