import { StyleSheet, Platform } from 'react-native';
import { colors } from '@src/styles/colors';

const defaultFontFamily = Platform.OS === 'android' ? 'sans-serif' : 'Helvetica Neue';
const thinFontFamily = Platform.OS === 'android' ? 'sans-serif-thin' : 'HelveticaNeue-Thin';
const lightFontFamily = Platform.OS === 'android' ? 'sans-serif-light' : 'HelveticaNeue-Light';
const mediumFontFamily = Platform.OS === 'android' ? 'sans-serif-medium' : 'HelveticaNeue-Medium';
const boldFontFamily = Platform.OS === 'android' ? 'sans-serif' : 'HelveticaNeue-Bold';

export default StyleSheet.create({
	containerHeader: {
		flex: 1,
		backgroundColor: colors.white,
		padding: 30,
		paddingTop: 100,
		alignItems: 'center',
		justifyContent: 'flex-start'
	},
	containerLeft: {
		flex: 1,
		flexDirection: 'row',
		backgroundColor: colors.cyprus,
		paddingLeft: '15%',
		alignItems: 'center',
		justifyContent: 'flex-start'
	},
	containerColor: {
		flex: 1,
		backgroundColor: colors.white,
		padding: 20,
		alignItems: 'flex-start',
		justifyContent: 'flex-start'
	},
	containerHome: {
		flex: 1,
		marginTop: 70
	},
	container: {
		flex: 1,
		padding: 20
	},
	textInput: {
		height: 40,
		padding: 5,
		width: '100%',
		backgroundColor: colors.gallery
	},
	titleText: {
		fontSize: 30,
		fontWeight: 'bold',
		fontFamily: defaultFontFamily,
		color: colors.mineshaft
	},
	subTitleTextBold: {
		fontSize: 20,
		fontWeight: 'bold',
		fontFamily: defaultFontFamily
	},
	subTitleText: {
		fontSize: 20,
		fontWeight: 'normal',
		fontFamily: defaultFontFamily
	},
	contactName: {
		fontSize: 17,
		fontFamily: mediumFontFamily,
		color: colors.black
	},
	contactDetailsName: {
		fontSize: 20,
		fontWeight: 'normal',
		fontFamily: mediumFontFamily,
		color: colors.black
	},
	issueTitle: {
		fontSize: 17,
		fontFamily: defaultFontFamily,
		color: colors.white
	},
	issueTitleBold: {
		fontSize: 17,
		fontFamily: defaultFontFamily,
		fontWeight: 'bold'
	},
	advice: {
		fontSize: 15,
		fontWeight: 'normal',
		fontFamily: defaultFontFamily
	},
	adviceBold: {
		fontSize: 15,
		fontWeight: 'bold',
		fontFamily: defaultFontFamily
	},
	textBold: {
		fontSize: 13,
		fontWeight: 'bold',
		fontFamily: boldFontFamily,
		color: colors.mineshaft
	},
	textMedium: {
		fontSize: 13,
		fontFamily: mediumFontFamily,
		color: colors.mineshaft
	},
	text: {
		fontSize: 13,
		fontFamily: defaultFontFamily,
		color: colors.mineshaft
	},
	textDescription: {
		fontSize: 13,
		fontFamily: defaultFontFamily,
		color: colors.doveGray
	},
	textDescriptionLight: {
		fontSize: 13,
		fontFamily: lightFontFamily,
		color: colors.mineshaft
	},
	description: {
		fontSize: 12,
		fontFamily: defaultFontFamily,
		color: colors.doveGray
	},
	descriptionBackground: {
		fontSize: 12,
		fontFamily: defaultFontFamily,
		color: colors.white
	},
	label: {
		fontSize: 12,
		fontFamily: defaultFontFamily,
		color: colors.mineshaft
	},
	typeLabel: {
		fontSize: 11,
		fontWeight: 'bold',
		fontFamily: defaultFontFamily,
		color: colors.tropical
	},
	headerStyle: {
		backgroundColor: colors.cyprus,
		shadowOpacity: 0,
		shadowOffset: {
			height: 0
		},
		shadowRadius: 0,
		elevation: 0
	},
	headerTransparent: {
		borderBottomWidth: 0,
		shadowOpacity: 0,
		shadowOffset: {
			height: 0
		},
		shadowRadius: 0,
		elevation: 0
	},
	headerTitleStyle: {
		fontSize: 13,
		fontFamily: defaultFontFamily,
		flex: 1,
		color: colors.white,
		textAlign: 'center',
		alignSelf: 'center'
	},
	headerIconLeft: {
		height: 35,
		width: 35,
		marginLeft: 15
	},
	headerIconRight: {
		height: 25,
		width: 25,
		marginRight: 15
	},
	headerTextRight: {
		marginRight: 15
	},
	headerBackIcon: {
		height: 17,
		width: 10,
		marginLeft: 15
	},
	separator: {
		width: '100%',
		borderBottomWidth: 1,
		borderBottomColor: colors.gallery
	},
	backButton: {
		width: 50
	},
	icon: {
		height: 25,
		width: 25
	},
	fontDefault: {
		fontFamily: defaultFontFamily
	},
	fontThin: {
		fontWeight: '100',
		fontFamily: thinFontFamily
	},
	fontLight: {
		fontWeight: '300',
		fontFamily: lightFontFamily
	},
	fontRegular: {
		fontWeight: '400',
		fontFamily: defaultFontFamily
	},
	fontMedium: {
		fontWeight: '500',
		fontFamily: mediumFontFamily
	},
	fontBold: {
		fontWeight: '700',
		fontFamily: boldFontFamily
	}
});
