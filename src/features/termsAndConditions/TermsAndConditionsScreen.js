import React, { Component } from 'react';
import { View, WebView } from 'react-native';
import { TERMS_OF_US_URL } from '@env';

import Indicator from '@src/components/shared/indicator/Indicator';

export default class TermsAndConditionsScreen extends Component {
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
					source={{ uri: TERMS_OF_US_URL }}
					onLoadEnd={() => this.setState({ loading: false })}
				/>
				<Indicator visible={this.state.loading} />
			</View>
		);
	}
}
