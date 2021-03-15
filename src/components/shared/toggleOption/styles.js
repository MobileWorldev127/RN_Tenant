import { StyleSheet } from 'react-native';
import { colors } from '@src/styles/colors';

export default StyleSheet.create({
	button: {
		height: 50,
		backgroundColor: colors.white,
		paddingHorizontal: 20,
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		borderTopWidth: 1,
		borderTopColor: colors.gallery
	},

	text: {
		flex: 1,
		width: '100%'
	},

	arrow: {
		justifyContent: 'center',
		alignItems: 'center',
		padding: 5,
	},

	arrowIcon: {
		width: 14,
		height: 12
	},

	content: {
		backgroundColor: colors.white
	}
});
