import React, { Component } from 'react';
import { Text, TouchableHighlight, FlatList, View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Routes } from '@src/navigation/screenNames';

import globalStyles from '@src/styles/styles';
import styles from '@src/features/selectTenancy/styles';
import TenancyCard from '@src/components/selectTenancy/tenancyCard/TenancyCard';
import auth from '@src/api/auth';
import propertiesApi from '@src/api/properties';
import PropTypes from 'prop-types';
import ViewBackground from '@src/components/shared/viewBackground/ViewBackground';
import Indicator from '@src/components/shared/indicator/Indicator';

class SelectTenancyScreen extends Component {
	constructor(props) {
		super(props);

		const properties =
			this.props.navigation.state.params && this.props.navigation.state.params.properties;

		this.state = {
			properties: properties,
			loading: false
		};
	}

	componentDidMount() {
		if (!this.state.properties) this.init()
	}

	/**
	 * Init contact_id and properties, get property list
	 */
	init = async () => {
		const contactId = await auth.getContactId();
		this.setState({ properties: await propertiesApi.getProperties(contactId), loading: false });
	};

	render() {
		return (
			<ViewBackground styles={[globalStyles.containerHeader, styles.screen]}>
				<Indicator visible={this.state.loading} />
				<FlatList
					data={this.state.properties}
					keyExtractor={item => item.property_id}
					renderItem={({ item, index }) => (
						<View>
							<TenancyCard {...this.props} item={item} />
						</View>
					)}
				/>
			</ViewBackground>
		);
	}
}

export default SelectTenancyScreen;
