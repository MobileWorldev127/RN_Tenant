import React, { Component } from 'react';
import { View, ScrollView, AppState } from 'react-native';

import ViewBackground from '@src/components/shared/viewBackground/ViewBackground';
import contacts from '@src/api/contacts';
import properties from '@src/api/properties';
import { HomeType } from '@src/features/home/homeTypes';
import MenuList from '@src/components/home/menuList/MenuList';
import PropertyInfo from '@src/components/home/propertyInfo/PropertyInfo';
import AppInfo from '@src/components/home/appInfo/AppInfo';
import DayCounter from '@src/components/home/dayCounter/DayCounter';
import WebsiteInfo from '@src/components/home/websiteInfo/WebsiteInfo';
import issues from '@src/api/issues';
import notices from '@src/api/notices';
import screens from '@src/api/screens';
import { Routes } from '@src/navigation/screenNames';
// import * as push from '@src/services/pushNotifications';

import globalStyles from '@src/styles/styles';

export default class HomeScreen extends Component {
	constructor(props) {
		super(props);

		this.state = {
			property: this.props.navigation.state.params
				? this.props.navigation.state.params.property
				: null,
			contact: null,
			homeType: null,
			updates: 0,
			appState: AppState.currentState,
			tenancyStatus: ''
		};

		this.init();
	}

	componentDidMount() {
		this.willFocusSubscription = this.props.navigation.addListener('willFocus', () =>
			this.getUpdateBadge()
		);
		AppState.addEventListener('change', this.handleAppStateChange);
	}

	componentWillUnmount() {
		// unsubscribe to event listener
		this.willFocusSubscription.remove();
		// AppState.removeEventListener('change', this.handleAppStateChange);
		NetInfo.removeEventListener(this.handleFirstConnectivityChange);
	}

	// Update the unread badge when the app is in focus
	handleAppStateChange = nextAppState => {
		// If app is in the foreground
		if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
			this.getUpdateBadge();
		}
		this.setState({ appState: nextAppState });
	};

	getUpdateBadge = async () => {
		const noticeList = await notices.getNotices();

		let updates = 0;
		for (let i = 0; i < noticeList.length; i++) {
			if (noticeList[i].event_notification_type.notification_type_code === 'UNRIU') {
				updates += noticeList[i].object_count;
			}
		}

		this.setState({
			updates: updates
		});
	};

	async init() {
		// Store screen reference
		screens.setReference(Routes.HOME, this);

		const timeDifference = this.state.property ? this.getTimeDifference() : 0;
		const tenancy = this.state.property ? await properties.getTenancy() : null;

		const contact = await contacts.getContact();
		this.setState({
			contact: contact,
			active: tenancy ? this.getActive(tenancy.tenancy_end_date) : null,
			days: parseInt(timeDifference / 86400000) + 1,
			homeType: this.getHomeType(timeDifference),
			issueCount: (await issues.getOpenIssues()).length || 0,
			tenancyStatus: tenancy.tenancy_status
		});

		console.log('initing push with contact id');
		// push.configure();
	}

	async refreshIssueCount() {
		this.setState({
			issueCount: (await issues.getOpenIssues()).length || 0
		});
	}

	getActive(date) {
		return date ? new Date(date).getTime() > new Date().getTime() : true;
	}

	getHomeType(timeDifference) {
		if (timeDifference < 1) {
			return HomeType.MOVED_IN;
		} else if (timeDifference < 604800000) {
			return HomeType.MOVE_IN_LESS;
		} else {
			return HomeType.MOVE_IN_MORE;
		}
	}

	getTimeDifference() {
		const tenancy = this.state.property.tenancies[0];
		return tenancy
			? new Date(tenancy.tenancy.tenancy_start_date).getTime() - new Date().getTime()
			: 0;
	}

	getHomeScreenMovedIn() {
		return (
			<ScrollView style={globalStyles.containerHome}>
				<PropertyInfo
					homeType={this.state.homeType}
					property={this.state.property}
					contact={this.state.contact}
					style={globalStyles.separator}
				/>
				<MenuList
					{...this.props}
					active={this.state.active}
					homeType={this.state.homeType}
					issueCount={this.state.issueCount}
					updates={this.state.updates}
					tenancyStatus={this.state.tenancyStatus}
				/>
			</ScrollView>
		);
	}

	getHomeScreenMoveLess() {
		return (
			<ScrollView style={globalStyles.containerHome}>
				<PropertyInfo
					homeType={this.state.homeType}
					property={this.state.property}
					contact={this.state.contact}
					style={globalStyles.separator}
				/>
				<DayCounter days={this.state.days} />
				<MenuList
					{...this.props}
					active={this.state.active}
					homeType={this.state.homeType}
					issueCount={this.state.issueCount}
					updates={this.state.updates}
					tenancyStatus={this.state.tenancyStatus}
				/>
			</ScrollView>
		);
	}

	getHomeScreenMoveMore() {
		return (
			<View style={globalStyles.containerColor}>
				<WebsiteInfo contact={this.state.contact} />
				<AppInfo />
			</View>
		);
	}

	getScreen() {
		switch (this.state.homeType) {
			case HomeType.MOVED_IN:
				return this.getHomeScreenMovedIn();
				break;
			case HomeType.MOVE_IN_MORE:
				return this.getHomeScreenMoveMore();
				break;
			case HomeType.MOVE_IN_LESS:
				return this.getHomeScreenMoveLess();
				break;
			default:
				return <View />;
		}
	}

	render() {
		return <ViewBackground>{this.getScreen()}</ViewBackground>;
	}
}
