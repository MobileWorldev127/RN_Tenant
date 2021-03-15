import React, { Component } from 'react';
import { WebView, View } from 'react-native';
import contacts from '@src/api/contacts';
import properties from '@src/api/properties';
import auth from '@src/api/auth';
import Indicator from '@src/components/shared/indicator/Indicator';

export default class LiveChatScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			url: '',
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
			url: `https://www.foxtons.co.uk/auth/wsi/tenancy/${tenancyId}/appchat`,
			headers: {
				'X-Auth-Token': token,
				'X-Contact-ID': contactId
			}
		});
	}

	render() {
		console.log(this.state.url, 'url')
		console.log(this.state.headers, 'headers')

		return (
			<View style={{ flex: 1 }}>
				{this.state.url.length > 0 &&
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
