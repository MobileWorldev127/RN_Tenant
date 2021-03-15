import React from 'react';
import { createSwitchNavigator } from 'react-navigation';
import { createAppContainer } from 'react-navigation';
// import { createStackNavigator } from 'react-navigation-stack';
import IntroNavigator from '@src/navigation/IntroNavigator';
import AuthNavigator from '@src/navigation/AuthNavigator';
import AppNavigator from '@src/navigation/AppNavigator';

import { Routes } from '@src/navigation/screenNames';

const createRootNavigator = route => {
	return createAppContainer(createSwitchNavigator(
		{
			[Routes.INTRO_NAVIGATOR]: IntroNavigator,
			[Routes.AUTH_NAVIGATOR]: AuthNavigator,
			[Routes.APP_NAVIGATOR]: AppNavigator
		},
		{
			initialRouteName: route
		}
	));
};

export default createRootNavigator;
