import React, { Component } from 'react';
import { View, WebView } from 'react-native';
import properties from '@src/api/properties';
import Indicator from '@src/components/shared/indicator/Indicator';

class LocalLifeScreen extends Component {
	constructor() {
		super();
		this.state = {
			loading: true,
			url: '',
		};
	}

	componentDidMount() {
		this.generateURL();
	}

	generateURL = async () => {
		const property = await properties.getProperty();
		// Trim the last 3 characters, remove spaces and make sure its lowercase
		const postalCode = property.property_address.address_postcode.replace(/\d\w\w/, '').trim().toLowerCase();
		const url = `https://www.foxtons.co.uk/local-life/${postalCode}/app/place`;

		this.setState({ url })
	}

	render() {
		return (
			<View style={{ flex: 1 }}>
				<WebView
					source={{ uri: this.state.url }}
					onLoadEnd={() => this.setState({ loading: false })}
				/>
				<Indicator visible={this.state.loading} />
			</View>
		);
	}
}


export default LocalLifeScreen;
