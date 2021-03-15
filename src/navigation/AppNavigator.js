import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Button, View } from 'react-native';

import { Routes } from '@src/navigation/screenNames';
import SelectTenancyScreen from '@src/features/selectTenancy/SelectTenancyScreen';
import HomeScreen from '@src/features/home/HomeScreen';
import SettingsScreen from '@src/features/settings/SettingsScreen';
import ContactsScreen from '@src/features/contacts/ContactsScreen';
import FaqScreen from '@src/features/faq/FaqScreen';
import PrivacyPolicyScreen from '@src/features/privacyPolicy/PrivacyPolicyScreen';
import TermsAndConditionsScreen from '@src/features/termsAndConditions/TermsAndConditionsScreen';
import MyFoxtonsScreen from '@src/features/myFoxtons/MyFoxtonsScreen'
import VouchersScreen from '@src/features/vouchers/VouchersScreen';
import VoucherScreen from '@src/features/vouchers/voucher/VoucherScreen';
import CheckOnProgressScreen from '@src/features/checkOnProgress/CheckOnProgressScreen';
import NotTenantScreen from '@src/features/notTenant/NotTenantScreen';
import MakeChangesScreen from '@src/features/myTenancy/makeChanges/MakeChangesScreen';
import MakeChangesConfirmScreen from '@src/features/myTenancy/makeChanges/confirmation/MakeChangesConfirmScreen';
import MyTenancyScreen from '@src/features/myTenancy/MyTenancyScreen';
import MyDocumentsScreen from '@src/features/myDocuments/MyDocumentsScreen';
import IssueTrackerDemoScreen from '@src/features/issueTrackerDemo/IssueTrackerDemoScreen';
import MyDepositScreen from '@src/features/myTenancy/myDeposit/MyDepositScreen';
import IssuesScreen from '@src/features/issues/IssuesScreen';
import MainScreen from '@src/features/main/MainScreen';
import NewIssueFormScreen from '@src/features/issues/new/form/NewIssueFormScreen';
import NewIssueScreen from '@src/features/issues/new/NewIssueScreen';
import MaintenanceScreen from '@src/features/issues/new/maintenance/MaintenanceScreen';
import UtilitiesScreen from '@src/features/issues/new/utilities/UtilitiesScreen';
import IssueDetailsScreen from '@src/features/issues/issueDetails/IssueDetailsScreen';
import ContactDetailsScreen from '@src/features/contacts/contactDetails/ContactDetailsScreen';
import ImageCarouselScreen from '@src/features/imageCarousel/ImageCarouselScreen';
import DocumentCarouselScreen from '@src/features/documentCarousel/DocumentCarouselScreen';
import VideoCarouselScreen from '@src/features/videoCarousel/VideoCarouselScreen';
import LocalLifeScreen from '@src/features/localLife/LocalLifeScreen';
import PDFViewer from '@src/components/shared/pdfViewer/PdfViewer';

import HeaderButton from '@src/components/shared/headerButton/HeaderButton';

import styles from '@src/styles/styles';
import { colors } from '@src/styles/colors';
import icons from '@src/assets/icons';

// const icons.logo = icons.logo;

const AppNavigator = createStackNavigator(
	{
		[Routes.MAIN]: {
			screen: MainScreen,
			navigationOptions: ({ navigation }) => {
				return {
					headerStyle: styles.headerTransparent,
					headerTransparent: true
				};
			}
		},
		[Routes.NOT_TENANT]: {
			screen: NotTenantScreen,
			navigationOptions: ({ navigation }) => {
				return {
					headerStyle: styles.headerTransparent,
					headerTransparent: true,
					headerBackTitle: null,
					headerLeft: <HeaderButton style={styles.headerIconLeft} source={icons.logo} />,
					headerRight: (
						<HeaderButton
							style={styles.headerIconRight}
							source={icons.settings}
							click={() => navigation.navigate(Routes.SETTINGS)}
						/>
					),
					headerTitleStyle: styles.headerTitleStyle
				};
			}
		},
		[Routes.SELECT_TENANCY]: {
			screen: SelectTenancyScreen,
			navigationOptions: ({ navigation }) => {
				return {
					title: 'SELECT A TENANCY',
					headerStyle: styles.headerTransparent,
					headerTitleStyle: styles.headerTitleStyle,
					headerTintColor: colors.white,
					headerTransparent: true,
					headerLeft: () => {
						const icon = navigation.state.params ? icons.logo : icons.back,
							backStyle = navigation.state.params
								? styles.headerIconLeft
								: styles.headerBackIcon;
						return (
							<HeaderButton
								style={backStyle}
								containerStyle={styles.backButton}
								source={icon}
								click={() => {
									if (!navigation.state.params) navigation.pop();
								}}
							/>
						);
					},
					headerRight: (
						<HeaderButton
							style={styles.headerIconRight}
							source={icons.settings}
							click={() => navigation.navigate(Routes.SETTINGS)}
						/>
					)
				};
			}
		},
		[Routes.HOME]: {
			screen: HomeScreen,
			navigationOptions: ({ navigation }) => {
				const multiple = navigation.state.params && navigation.state.params.multiple;
				return {
					headerStyle: styles.headerTransparent,
					headerTransparent: true,
					headerBackTitle: null,
					headerLeft: (
						<HeaderButton
							style={styles.headerIconLeft}
							source={multiple ? icons.home : icons.logo}
							click={() =>
								multiple ? navigation.navigate(Routes.SELECT_TENANCY) : null
							}
						/>
					),
					headerRight: (
						<HeaderButton
							style={styles.headerIconRight}
							source={icons.settings}
							click={() => navigation.navigate(Routes.SETTINGS)}
						/>
					)
				};
			}
		},
		[Routes.CHECK_ON_PROGRESS]: {
			screen: CheckOnProgressScreen,
			navigationOptions: ({ navigation }) => {
				return {
					title: 'Move in Progress',
					headerStyle: styles.headerTransparent,
					headerTintColor: colors.white,
					headerTitleStyle: styles.headerTitleStyle,
					headerTransparent: true,
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
		[Routes.MY_TENANCY]: {
			screen: MyTenancyScreen,
			navigationOptions: ({ navigation }) => {
				return {
					title: 'MY TENANCY',
					headerStyle: styles.headerTransparent,
					headerTintColor: colors.white,
					headerTitleStyle: styles.headerTitleStyle,
					headerTransparent: true,
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
		[Routes.MY_DOCUMENTS]: {
			screen: MyDocumentsScreen,
			navigationOptions: ({ navigation }) => {
				return {
					title: 'MY DOCUMENTS',
					headerStyle: styles.headerTransparent,
					headerTintColor: colors.white,
					headerTitleStyle: styles.headerTitleStyle,
					headerTransparent: true,
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
		[Routes.ISSUES]: {
			screen: IssuesScreen,
			navigationOptions: ({ navigation }) => {
				return {
					title: 'ISSUES',
					headerStyle: styles.headerTransparent,
					headerTintColor: colors.white,
					headerTitleStyle: styles.headerTitleStyle,
					headerTransparent: true,
					headerRight: (
						<HeaderButton
							style={styles.headerTextRight}
							text={'Need Help?'}
							click={() => navigation.navigate(Routes.CONTACTS)}
						/>
					),
					headerLeft: (
						<HeaderButton
							style={styles.headerBackIcon}
							containerStyle={styles.backButton}
							source={icons.back}
							click={() => navigation.pop()}
						/>
					)
				};
			}
		},
		[Routes.ISSUE_DETAILS]: {
			screen: IssueDetailsScreen,
			navigationOptions: ({ navigation }) => {
				return {
					title: 'ISSUES',
					headerStyle: styles.headerStyle,
					headerTintColor: colors.white,
					headerTitleStyle: styles.headerTitleStyle,
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
		[Routes.CONTACTS]: {
			screen: ContactsScreen,
			navigationOptions: ({ navigation }) => {
				return {
					title: 'CONTACTS',
					headerTintColor: colors.white,
					headerStyle: styles.headerStyle,
					headerTitleStyle: styles.headerTitleStyle,
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
		[Routes.CONTACT_DETAILS]: {
			screen: ContactDetailsScreen,
			navigationOptions: ({ navigation }) => {
				const employee =
					navigation.state.params &&
					navigation.state.params.contact &&
					navigation.state.params.contact.foxtons_employee;
				return {
					title: `CONTACT ${employee ? 'FOXTONS' : 'LANDLORD'}`,
					headerTintColor: colors.white,
					headerStyle: styles.headerStyle,
					headerTitleStyle: styles.headerTitleStyle,
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
		[Routes.FAQ]: {
			screen: FaqScreen,
			navigationOptions: ({ navigation }) => {
				return {
					title: 'FAQs',
					headerTintColor: colors.white,
					headerStyle: styles.headerStyle,
					headerTitleStyle: styles.headerTitleStyle,
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
		[Routes.LOCAL_LIFE]: {
			screen: LocalLifeScreen,
			navigationOptions: ({ navigation }) => {
				return {
					title: 'LOCAL LIFE',
					headerTintColor: colors.white,
					headerStyle: styles.headerStyle,
					headerTitleStyle: styles.headerTitleStyle,
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
		[Routes.VOUCHERS]: {
			screen: VouchersScreen,
			navigationOptions: ({ navigation }) => {
				return {
					title: 'VOUCHERS',
					headerStyle: styles.headerTransparent,
					headerTintColor: colors.white,
					headerTitleStyle: styles.headerTitleStyle,
					headerTransparent: true,
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
		[Routes.VOUCHER]: {
			screen: VoucherScreen,
			navigationOptions: ({ navigation }) => {
				return {
					title: 'VOUCHERS',
					headerTintColor: colors.white,
					headerStyle: styles.headerStyle,
					headerTitleStyle: styles.headerTitleStyle,
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
		[Routes.SETTINGS]: {
			screen: SettingsScreen,
			navigationOptions: ({ navigation }) => {
				return {
					title: 'SETTINGS',
					headerStyle: styles.headerTransparent,
					headerTintColor: colors.white,
					headerTitleStyle: styles.headerTitleStyle,
					headerTransparent: true,
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
		[Routes.MAKE_CHANGES]: {
			screen: MakeChangesScreen,
			navigationOptions: ({ navigation }) => {
				return {
					title: 'CHANGES TO YOUR TENANCY',
					headerStyle: styles.headerStyle,
					headerTitleStyle: styles.headerTitleStyle,
					headerTintColor: colors.white,
					headerBackTitle: null,
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
		[Routes.MAKE_CHANGES_CONFIRM]: {
			screen: MakeChangesConfirmScreen,
			navigationOptions: ({ navigation }) => {
				return {
					title: 'CHANGES TO YOUR TENANCY',
					headerStyle: styles.headerStyle,
					headerTitleStyle: styles.headerTitleStyle,
					headerTintColor: colors.white,
					headerBackTitle: null,
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
		[Routes.ISSUE_TRACKER_DEMO]: {
			screen: IssueTrackerDemoScreen,
			navigationOptions: ({ navigation }) => {
				return {
					title: 'TRACKER TOUR',
					headerStyle: styles.headerStyle,
					headerTitleStyle: styles.headerTitleStyle,
					headerTintColor: colors.white,
					headerBackTitle: null,
					gesturesEnabled: false,
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
		[Routes.MY_DEPOSIT]: {
			screen: MyDepositScreen,
			navigationOptions: ({ navigation }) => {
				return {
					title: 'MY DEPOSIT',
					headerStyle: styles.headerStyle,
					headerTitleStyle: [styles.headerTitleStyle, styles.fontBold],
					headerTintColor: colors.white,
					headerBackTitle: null,
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
		[Routes.NEW_ISSUE_FORM]: {
			screen: NewIssueFormScreen,
			navigationOptions: ({ navigation }) => {
				return {
					title: `${navigation.state.params.item.issue_type_name.toUpperCase()}`,
					headerStyle: styles.headerTransparent,
					headerTintColor: colors.white,
					headerTitleStyle: styles.headerTitleStyle,
					headerTransparent: true,
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
		[Routes.NEW_ISSUE]: {
			screen: NewIssueScreen,
			navigationOptions: ({ navigation }) => {
				return {
					title: 'RAISE NEW ISSUE',
					headerStyle: styles.headerTransparent,
					headerTintColor: colors.white,
					headerTitleStyle: styles.headerTitleStyle,
					headerTransparent: true,
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
		[Routes.MAINTENANCE]: {
			screen: MaintenanceScreen,
			navigationOptions: ({ navigation }) => {
				return {
					title: 'MAINTENANCE',
					headerStyle: styles.headerTransparent,
					headerTintColor: colors.white,
					headerTitleStyle: styles.headerTitleStyle,
					headerTransparent: true,
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
		[Routes.UTILITIES]: {
			screen: UtilitiesScreen,
			navigationOptions: ({ navigation }) => {
				return {
					title: 'UTILITIES',
					headerStyle: styles.headerTransparent,
					headerTintColor: colors.white,
					headerTitleStyle: styles.headerTitleStyle,
					headerTransparent: true,
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
		[Routes.IMAGE_CAROUSEL]: {
			screen: ImageCarouselScreen,
			navigationOptions: ({ navigation }) => {
				return {
					title: 'IMAGES',
					headerStyle: styles.headerTransparent,
					headerTintColor: colors.white,
					headerTitleStyle: styles.headerTitleStyle,
					headerTransparent: true,
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
		[Routes.DOCUMENT_CAROUSEL]: {
			screen: DocumentCarouselScreen,
			navigationOptions: ({ navigation }) => {
				return {
					title: 'DOCUMENTS',
					headerStyle: styles.headerStyle,
					headerTitleStyle: [styles.headerTitleStyle, styles.fontBold],
					headerTintColor: colors.white,
					headerBackTitle: null,
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
		[Routes.VIDEO_CAROUSEL]: {
			screen: VideoCarouselScreen,
			navigationOptions: ({ navigation }) => {
				return {
					title: 'VIDEOS',
					headerStyle: styles.headerTransparent,
					headerTintColor: colors.white,
					headerTitleStyle: styles.headerTitleStyle,
					headerTransparent: true,
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
		[Routes.PDF_VIEWER]: {
			screen: PDFViewer,
			navigationOptions: ({ navigation }) => {
				return {
					title: navigation.state.params.name || '',
					headerTintColor: colors.white,
					headerStyle: styles.headerStyle,
					headerTitleStyle: styles.headerTitleStyle,
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
		[Routes.PRIVACY_POLICY]: {
			screen: PrivacyPolicyScreen,
			navigationOptions: ({ navigation }) => {
				return {
					title: 'PRIVACY POLICY',
					headerTintColor: colors.white,
					headerStyle: styles.headerStyle,
					headerTitleStyle: styles.headerTitleStyle,
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
		[Routes.TERMS_AND_CONDITIONS]: {
			screen: TermsAndConditionsScreen,
			navigationOptions: ({ navigation }) => {
				return {
					title: 'Terms and Conditions',
					headerTintColor: colors.white,
					headerStyle: styles.headerStyle,
					headerTitleStyle: styles.headerTitleStyle,
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
		[Routes.MY_FOXTONS]: {
			screen: MyFoxtonsScreen,
			navigationOptions: ({ navigation }) => {
				return {
					title: 'MY FOXTONS',
					headerTintColor: colors.white,
					headerStyle: styles.headerStyle,
					headerTitleStyle: styles.headerTitleStyle,
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
		initialRouteName: Routes.MAIN
	}
);

// export default AppNavigator;

export default createAppContainer(AppNavigator);
