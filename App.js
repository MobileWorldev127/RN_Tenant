import React, { Component } from 'react';
import { View, Text } from 'react-native';
import auth from '@src/api/auth';
import { Routes } from '@src/navigation/screenNames';
import storage from '@src/api/storage';
import * as push from '@src/services/pushNotifications';

import createRootNavigator from '@src/navigation/RootNavigator';
import ViewBackground from '@src/components/shared/viewBackground/ViewBackground';
import images from '@src/assets/images';
import navigation from '@src/api/navigation';
import network from '@src/api/network';
import OfflineBanner from '@src/components/shared/offlineBanner/OfflineBanner';
import firebase from 'react-native-firebase';

console.log('initing push');
push.configure();

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			route: null
		};
	}

	async componentDidMount() {
		await network.setIpAddress();

		const value = await storage.get(Routes.INTRO);

		let route = Routes.INTRO_NAVIGATOR;

		if (value) {
			const signedIn = await auth.getAccessToken();
			route = signedIn ? Routes.APP_NAVIGATOR : Routes.AUTH_NAVIGATOR;
		}

		this.setState({ route: route });
	}

	// gets the current screen from navigation state
	getActiveRouteName = (navigationState) => {
		if (!navigationState) {
			return null;
		}
		const route = navigationState.routes[navigationState.index];
		// dive into nested navigators
		if (route.routes) {
			return this.getActiveRouteName(route);
		}
		return route.routeName;
	}


	render() {
		const tracker = firebase.analytics();

		if (!this.state.route) {
			return <ViewBackground source={images.splash} />;
		} else {
			const RootNavigator = createRootNavigator(this.state.route);
			return (
				<View style={{ flex: 1}}>
					<OfflineBanner />
					<RootNavigator
						onNavigationStateChange={(prevState, currentState) => {
							const currentScreen = this.getActiveRouteName(currentState);
							const prevScreen = this.getActiveRouteName(prevState);

							if (prevScreen !== currentScreen) {
								// the line below uses the Google Analytics tracker
								// change the tracker here to use other Mobile analytics SDK.
								tracker.setCurrentScreen(currentScreen);
							}
						}}
						ref={nav => {
							navigation.setNavigation(nav);
						}}
					/>
				</View>
			);
		}
	}
}

export default App;
