import React, { Component } from 'react';
import { FlatList, View, Text, TouchableOpacity } from 'react-native';

import ContactCard from '@src/components/contacts/contactCard/ContactCard';
import auth from '@src/api/auth';
import properties from '@src/api/properties';
import clientContacts from '@src/api/clientContacts';
import styles from '@src/features/contacts/styles';
import globalStyles from '@src/styles/styles';
import Indicator from '@src/components/shared/indicator/Indicator';
import LiveChatScreen from '@src/features/liveChat/LiveChatScreen';

export default class ContactsScreen extends Component {
	constructor(props) {
		super(props);

		this.state = {
			items: [],
			loading: true,
			showContacts: true,
			enableLiveChat: false
		};

		this.init();
	}

	/**
	 * Init contact_id and items, get property list
	 */
	async init() {
		const contactId = await auth.getContactId();
		const tenancy = await properties.getTenancy();

		// Enable Live Chat if tenant has moved in and the user doesn't expire within the next 7 days
		const enableLiveChat = tenancy
			? this.isTenantHasMoved(tenancy) && !this.isTenancyExpireWithinSevenDays(tenancy)
			: false;

		this.setState({
			items: await clientContacts.getClientContacts(contactId),
			enableLiveChat,
			loading: false
		});
	}

	isTenantHasMoved = tenancy => {
		return new Date(tenancy.tenancy_start_date).getTime() - new Date().getTime() < 1;
	};

	isTenancyExpireWithinSevenDays = tenancy => {
		return new Date(tenancy.tenancy_end_date).getTime() - new Date().getTime() < 604800000;
	};

	getTabHeader = () => {
		return (
			<View style={styles.header}>
				<TouchableOpacity
					style={[styles.button, this.state.showContacts ? styles.active : {}]}
					activeOpacity={0.5}
					onPress={() => this.setState({ showContacts: !this.state.showContacts })}>
					<Text
						style={[
							globalStyles.textDescription,
							this.state.showContacts ? styles.activeText : {}
						]}>
						Contacts
					</Text>
				</TouchableOpacity>

				{this.state.enableLiveChat ? (
					<TouchableOpacity
						style={[styles.button, !this.state.showContacts ? styles.active : {}]}
						activeOpacity={0.5}
						onPress={() => this.setState({ showContacts: !this.state.showContacts })}>
						<Text
							style={[
								globalStyles.textDescription,
								!this.state.showContacts ? styles.activeText : {}
							]}>
							Live Chat
						</Text>
					</TouchableOpacity>
				) : null}
			</View>
		);
	};

	render() {
		return !this.state.items.length && !this.state.loading ? (
			<View>
				<Text style={[globalStyles.subTitleText, styles.noContacts]}>
					You currently have no contacts related to your tenancy
				</Text>
			</View>
		) : (
			<View style={styles.container}>
				<Indicator visible={this.state.loading} />

				{this.getTabHeader()}

				{this.state.showContacts ? (
					<FlatList
						data={this.state.items}
						keyExtractor={item => item.contact_id}
						renderItem={({ item, index }) => (
							<View>
								<ContactCard {...this.props} index={index} contact={item} />
							</View>
						)}
					/>
				) : this.state.enableLiveChat ? (
					<LiveChatScreen />
				) : null}
			</View>
		);
	}
}
