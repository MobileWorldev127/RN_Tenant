import React, { Component } from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import PropTypes from 'prop-types';

import ViewBackground from '@src/components/shared/viewBackground/ViewBackground';
import FxButton from '@src/components/shared/button/FxButton';
import IssueTabs from '@src/components/issues/IssueTabs/IssueTabs';
import { Routes } from '@src/navigation/screenNames';
import properties from '@src/api/properties';

import globalStyles from '@src/styles/styles';
import styles from '@src/features/issues/styles';

export default class IssuesScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isManaged: true
		};

		this.init();
	}

	onPressButton = () => {
		this.props.navigation.navigate(Routes.NEW_ISSUE);
	};

	async init() {
		this.setState({ isManaged: await properties.isManaged() });
	}

	getLandlordManage() {
		if (!this.state.isManaged) {
			return (
				<View style={styles.description}>
					<Text style={[globalStyles.text, styles.text]}>
						<Text style={[globalStyles.textBold, styles.text]}>
							{'Your landlord has opted to manage this property themselves. '}
						</Text>
						{'All issues will be sent directly to your landlord.'}
					</Text>
				</View>
			);
		}
	}

	render() {
		return (
			<ViewBackground styles={[globalStyles.container, styles.screen]}>
				<ScrollView style={styles.scrollView}>
					<FxButton
						onPress={this.onPressButton}
						text="RAISE A NEW ISSUE"
						style={styles.button}
					/>
					{this.getLandlordManage()}
					<IssueTabs {...this.props} />
				</ScrollView>
			</ViewBackground>
		);
	}
}
