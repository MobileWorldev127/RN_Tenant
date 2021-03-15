import React, { Component } from 'react';
import { WebView, View } from 'react-native';
import contacts from '@src/api/contacts';
import properties from '@src/api/properties';
import auth from '@src/api/auth';
import Indicator from '@src/components/shared/indicator/Indicator';

export default class MyDepositScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			url: 'https://www.foxtons.co.uk/auth/wsi/tenancy/TENANCY_ID/app_deposits',
			headers: null,
			loading: true
		};
	}

	async componentDidMount() {
		const [token, contactId, tenancyId] = await Promise.all([
			auth.getAccessToken(),
			contacts.getContactId(),
			properties.getTenancyId()
		]);

		this.setState({
			headers: {
				'X-Auth-Token': token,
				'X-Contact-ID': contactId
			},
			url: this.state.url.replace('TENANCY_ID', tenancyId)
		});
	}

	render() {
		return (
			<View style={{ flex: 1 }}>
				{this.state.url &&
					this.state.headers && (
						<WebView
							onLoadEnd={() => this.setState({ loading: false })}
							source={{
								uri: this.state.url,
								headers: this.state.headers,
								method: 'POST'
							}}
						/>
					)}
				<Indicator visible={this.state.loading} />
			</View>
		);
	}
}
