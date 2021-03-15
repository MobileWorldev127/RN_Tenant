import React from 'react';
// import { StackNavigator } from 'react-navigation';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import { Routes } from '@src/navigation/screenNames';
import IntroScreen from '@src/features/intro/IntroScreen';

import HeaderButton from '@src/components/shared/headerButton/HeaderButton';

import styles from '@src/styles/styles';
import icons from '@src/assets/icons';

const AuthNavigator = createStackNavigator(
	{
		[Routes.INTRO]: {
			screen: IntroScreen,
			navigationOptions: ({ navigation }) => {
				return {
					headerStyle: styles.headerTransparent,
					headerTransparent: true,
					headerBackTitle: null,
					headerLeft: <HeaderButton style={styles.headerIconLeft} source={icons.logo} />
				};
			}
		}
	},
	{
		initialRouteName: Routes.INTRO
	}
);

export default createAppContainer(AuthNavigator);
