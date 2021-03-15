import { StyleSheet } from 'react-native';
import { colors } from '@src/styles/colors';

export default StyleSheet.create({
	header: {
		backgroundColor: colors.white,
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center'
	},
	button: {
		flex: 1,
		alignItems: 'center',
		alignSelf: 'stretch',
		padding: 15,
		width: '50%',
		borderBottomWidth: 2,
		borderBottomColor: colors.white
	},
	active: {
		borderBottomWidth: 2,
		borderBottomColor: colors.primary
	},
	activeText: {
		color: colors.black
	},
	content: {
		flex: 1
	},
	icons: {
		width: 40,
		height: 40
	},
	description: {
		marginTop: 6.16
	},
	descriptionText: {
		lineHeight: 18
	},
	issueHighlight: {
		marginBottom: 1
	},
	issueButton: {
		height: 'auto',
		paddingVertical: 20
	},
	issueButtonFirst: {
		borderTopWidth: 1,
		borderTopColor: colors.gallery
	},
	issueTypeClosed: {
		color: colors.silver
	},
	issueTitleClosed: {
		color: colors.doveGray
	},
	closeIconContainer: {
		width: 100
	},
	closingText: {
		flex: 1
	},
	closeIcon: {
		alignSelf: 'flex-end',
		width: 10,
		height: 10
	},
	closingMessage: {
		padding: 15,
		backgroundColor: colors.cyprus,
		flex: 1,
		flexDirection: 'row'
	},
	text: {
		color: colors.white
	},
	loading: {
		padding: 5,
		backgroundColor: 'white',
		borderTopWidth: 1,
		borderTopColor: colors.gallery
	}
});
