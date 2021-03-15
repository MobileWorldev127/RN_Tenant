import React, { Component } from 'react';
import { View, WebView } from 'react-native';
import { PRIVACY_POLICY_URL } from '@env';

import Indicator from '@src/components/shared/indicator/Indicator';

export default class PrivacyPolicyScreen extends Component {
	constructor() {
		super();
		this.state = {
			loading: true
		};
	}

	render() {
		return (
			<View style={{ flex: 1 }}>
				<WebView
					source={{ uri: PRIVACY_POLICY_URL }}
					onLoadEnd={() => this.setState({ loading: false })}
				/>
				<Indicator visible={this.state.loading} />
			</View>
		);
	}
}
