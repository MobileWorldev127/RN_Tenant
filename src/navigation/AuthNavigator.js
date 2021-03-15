import React from 'react';
import { View } from 'react-native';
// import { StackNavigator } from 'react-navigation';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Button } from 'react-native';

import { Routes } from '@src/navigation/screenNames';
import SplashScreen from '@src/features/splash/SplashScreen';
import LoginScreen from '@src/features/login/LoginScreen';
import ForgottenPasswordScreen from '@src/features/forgottenPassword/ForgottenPasswordScreen';
import ResetPasswordScreen from '@src/features/resetPassword/ResetPasswordScreen';
import WathsThisScreen from '@src/features/whatsThis/WathsThisScreen';

import HeaderButton from '@src/components/shared/headerButton/HeaderButton';

import styles from '@src/styles/styles';
import { colors } from '@src/styles/colors';
import icons from '@src/assets/icons';

const AuthNavigator = createStackNavigator(
	{
		[Routes.LOGIN]: {
			screen: LoginScreen,
			navigationOptions: ({ navigation }) => {
				return {
					headerStyle: styles.headerTransparent,
					headerTransparent: true,
					headerBackTitle: null,
					headerLeft: <HeaderButton style={styles.headerIconLeft} source={icons.logo} />,
					headerTitleStyle: styles.headerTitleStyle
				};
			}
		},
		[Routes.FORGOTTEN_PASSWORD]: {
			screen: ForgottenPasswordScreen,
			navigationOptions: ({ navigation }) => {
				return {
					title: 'FORGOTTEN PASSWORD',
					headerTransparent: true,
					headerStyle: styles.headerTransparent,
					headerTitleStyle: styles.headerTitleStyle,
					headerTintColor: colors.white,
					headerLeft: (
						<HeaderButton
							style={styles.headerBackIcon}
							containerStyle={styles.backButton}
							source={icons.back}
							click={() => navigation.pop()}
						/>
					),
					headerRight: <View /> // To ensure title is centered
				};
			}
		},
		[Routes.RESET_PASSWORD]: {
			screen: ResetPasswordScreen,
			navigationOptions: ({ navigation }) => {
				return {
					title: 'FORGOTTEN PASSWORD',
					headerTransparent: true,
					headerStyle: styles.headerTransparent,
					headerTitleStyle: styles.headerTitleStyle,
					headerTintColor: colors.white,
					headerLeft: (
						<HeaderButton
							style={styles.headerBackIcon}
							containerStyle={styles.backButton}
							source={icons.back}
							click={() => navigation.navigate(Routes.LOGIN)}
						/>
					),
					headerRight: <View /> // To ensure title is centered
				};
			}
		},
		[Routes.WHATS_THIS]: {
			screen: WathsThisScreen,
			navigationOptions: ({ navigation }) => {
				return {
					title: 'MY FOXTONS',
					headerTransparent: true,
					headerStyle: styles.headerTransparent,
					headerTitleStyle: styles.headerTitleStyle,
					headerTintColor: colors.white,
					headerLeft: (
						<HeaderButton
							style={styles.headerBackIcon}
							containerStyle={styles.backButton}
							source={icons.back}
							click={() => navigation.pop()}
						/>
					),
					headerRight: <View /> // To ensure title is centered
				};
			}
		}
	},
	{
		initialRouteName: Routes.LOGIN
	}
);

export default createAppContainer(AuthNavigator);
