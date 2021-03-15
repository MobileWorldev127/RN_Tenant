import React, { Component } from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import PropTypes from 'prop-types';

import ViewBackground from '@src/components/shared/viewBackground/ViewBackground';
import TenancyMenu from '@src/components/myTenancy/tenancyMenu/TenancyMenu';
import TenancyIndicator from '@src/components/myTenancy/tenancyIndicator/TenancyIndicator';
import TenancyResponsibility from '@src/components/myTenancy/tenancyResponsibility/TenancyResponsibility';
import TenancyClauses from '@src/components/myTenancy/tenancyClauses/TenancyClauses';

import globalStyles from '@src/styles/styles';
import styles from '@src/features/myTenancy/styles';

import contacts from '@src/api/contacts';
import properties from '@src/api/properties';
import offers from '@src/api/offers';

export default class MyTenancyScreen extends Component {
	constructor(props) {
		super(props);

		this.state = {
			offer: null
		};

		this.init();
	}

	async init() {
		const contactId = await contacts.getContactId();
		const tenancy = await properties.getTenancy();

		if (!!tenancy) {
			this.setState({
				tenancy: tenancy,
				active: this.getActive(tenancy.tenancy_end_date),
				offer: await offers.getOffer(contactId, tenancy.tenancy_id)
			});
		}
	}

	getActive(date) {
		return date ? new Date(date).getTime() > new Date().getTime() : true;
	}

	getScreen() {
		return (
			<View style={styles.container}>
				<ScrollView>
					<View style={styles.controls}>
						<TenancyMenu {...this.props} active={this.state.active} />
					</View>
					<TenancyIndicator tenancy={this.state.tenancy} offer={this.state.offer} />
					<View style={styles.controls}>
						<TenancyResponsibility offer={this.state.offer} />
						<TenancyClauses offer={this.state.offer} />
					</View>
				</ScrollView>
			</View>
		);
	}

	render() {
		return <ViewBackground styles={[globalStyles.container, styles.screen]}>
			{this.state.offer ? this.getScreen() : null}
		</ViewBackground>;
	}
}
