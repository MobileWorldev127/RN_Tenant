import { StyleSheet, Platform } from 'react-native';
import { colors } from '@src/styles/colors';

export default StyleSheet.create({
	container: {
		flexDirection: 'column',
		padding: 0,
		paddingLeft: 0,
		paddingTop: Platform.OS === 'android' ? 80 : 96,
		width: '100%'
	},
	containerGroup: {
		padding: 15
	},
	containerView: {
		paddingLeft: 15,
		width: '100%',
		alignItems: 'flex-start',
		justifyContent: 'flex-start'
	},
	advice: {
		minWidth: '100%',
		marginBottom: 10
	},
	issueTitle: {
		width: 245,
		marginBottom: 8.7
	},
	warning: {
		flexDirection: 'row',
		marginBottom: 10
	},
	warningIcon: {
		height: 25,
		width: 25,
		marginRight: 10,
		alignSelf: 'center'
	},

	warningText: {
		opacity: 0.8,
		color: colors.white,
		width: 245
	},
	description: {
		width: '70%'
	},
	cardLeft: {
		flex: 1,
		paddingLeft: 15,
		marginRight: 5,
		marginBottom: 5
	},
	cardRight: {
		flex: 1,
		paddingRight: 15,
		marginBottom: 5
	},
	icon: {
		marginRight: 10
	},
	loading: {
		padding: 10,
		color: 'white',
		width: '100%',
	}
});
