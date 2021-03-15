import { StyleSheet } from 'react-native';
import { colors } from '@src/styles/colors';

export default StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		marginBottom: 20
	},
	message: {
		flex: 1,
		marginLeft: 16
	},
	messageRight: {
		marginLeft: 0,
		marginRight: 16
	},
	avatar: {
		width: 36
	},
	avatarIcon: {
		width: 36,
		height: 36,
		justifyContent: 'center',
		alignItems: 'center'
	},
	content: {
		flex: 1,
		paddingVertical: 12,
		paddingHorizontal: 15,
		backgroundColor: colors.white,
		borderRadius: 12.5
	},
	contentRight: {
		alignSelf: 'flex-end',
		backgroundColor: colors.altoGrey
	},
	contentTextLeft: {
		color: colors.black
	},
	contentTextRight: {
		color: colors.black
	},
	dateRight: {
		alignSelf: 'flex-end'
	},
	landlordAvatar: {
		borderRadius: 18,
		backgroundColor: colors.white
	},
	landlordInitials: {
		color: colors.gray
	},
	tenantAvatar: {
		borderRadius: 18,
		backgroundColor: colors.gray
	},
	tenantInitials: {
		color: colors.white
	},
	title: {
		marginBottom: 3
	},
	note: {
		color: colors.primary,
		marginBottom: 3
	},
	date: {
		marginTop: 3
	}
});
