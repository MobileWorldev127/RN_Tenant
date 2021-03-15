import { StyleSheet } from 'react-native';
import { colors } from '@src/styles/colors';

export default StyleSheet.create({
	container: {
		height: 80,
		backgroundColor: colors.white,
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
	},

	buttonBorder: {
		borderTopWidth: 1,
		borderTopColor: colors.gallery
	},

	text: {
		flex: 1,
		width: '100%',
		paddingHorizontal: 20
	},

	title: {
		marginBottom: 2
	},

	description: {
		color: colors.gray
	},

	arrow: {
		width: 60,
		justifyContent: 'center',
		alignItems: 'center'
	},

	arrowIcon: {
		width: 8,
		height: 15
	},
	arrowButton: {
		flex: 1
	}
});
