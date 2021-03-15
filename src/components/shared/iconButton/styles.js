import { StyleSheet } from 'react-native';
import { colors } from '@src/styles/colors';
import globalStyles from '@src/styles/styles';

export default StyleSheet.create({
	container: {
		height: 80,
		backgroundColor: colors.white,
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		width: '100%'
	},

	buttonBorder: {
		borderTopWidth: 1,
		borderTopColor: colors.gallery
	},

	icon: {
		width: 83,
		justifyContent: 'center',
		alignItems: 'center'
	},

	text: {
		flex: 1,
		width: '100%',
		paddingRight: 20
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	description: {
		color: colors.gray
	},
	updated: {
		marginLeft: 5,
		paddingTop: 3,
		paddingBottom: 3,
		paddingRight: 5,
		paddingLeft: 5,
		backgroundColor: colors.primary,
		borderRadius: 10
	},
	updatedText: {
		fontSize: 10,
		color: colors.white
	}
});
