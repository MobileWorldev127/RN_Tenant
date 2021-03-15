import React, { Component } from 'react';
import { WebView, View } from 'react-native';
import contacts from '@src/api/contacts';
import auth from '@src/api/auth';
import Indicator from '@src/components/shared/indicator/Indicator';

export default class MyFoxtonsScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			url: 'https://www.foxtons.co.uk/auth/wsi',
			headers: null,
			loading: true
		};
	}

	async componentDidMount() {
		const [token, contactId] = await Promise.all([
			auth.getAccessToken(),
			contacts.getContactId()
		]);

		this.setState({
			headers: {
				'X-Auth-Token': token,
				'X-Contact-ID': contactId
			}
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
