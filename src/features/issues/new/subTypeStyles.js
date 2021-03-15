import { StyleSheet } from 'react-native';
import { colors } from '@src/styles/colors';

export default StyleSheet.create({
	container: {
		paddingTop: 80
	},
	containerView: {
		paddingTop: 20,
		flex: 1,
		width: '100%',
		alignItems: 'flex-start',
		justifyContent: 'flex-start'
	},
	containerViewUtilities: {
		flex: 1,
		width: '100%',
		alignItems: 'flex-start',
		justifyContent: 'flex-start'
	},
	containerEmergency: {
		paddingLeft: 20,
		flex: 1,
		paddingRight: 20,
		paddingBottom: 20,
		width: '100%',
		flexDirection: 'row',
		alignItems: 'flex-start',
		justifyContent: 'flex-start'
	},
	advice: {
		flex: 1,
		flexDirection: 'row',
		marginTop: 10,
		marginBottom: 10
	},
	description: {
		width: '70%'
	},
	card: {
		height: 85,
		minHeight: 85,
		padding: 5
	},
	cardLeft: {
		flex: 1,
		marginRight: 1,
		marginBottom: 1
	},
	cardRight: {
		flex: 1,
		paddingRight: 0,
		marginBottom: 1
	},
	icon: {
		width: 37.5,
		height: 37.5
	},
	titleSection: {
		color: colors.primary,
		marginBottom: 5
	},
	issueTitle: {
		marginBottom: 20
	},
	block: {
		marginBottom: 40
	},
	subBlock: {
		marginBottom: 10
	},
	mostCommon: {
		width: '100%',
		marginBottom: 30
	},
	emergency: {
		width: '100%',
		borderBottomWidth: 1,
		borderBottomColor: colors.gallery
	},
	link: {
		color: colors.primary
	}
});
