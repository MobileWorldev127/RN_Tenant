import React, { Component } from 'react';
import { View, WebView } from 'react-native';
import Indicator from '@src/components/shared/indicator/Indicator';

const URL = 'https://www.foxtons.co.uk/apps/tenant_faqs.html';

export default class FaqScreen extends Component {
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
					source={{ uri: URL }}
					onLoadEnd={() => this.setState({ loading: false })}
				/>
				<Indicator visible={this.state.loading} />
			</View>
		);
	}
}
