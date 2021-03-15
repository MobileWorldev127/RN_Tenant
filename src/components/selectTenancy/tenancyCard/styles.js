import { StyleSheet } from 'react-native';
import { colors } from '@src/styles/colors.js';

export default StyleSheet.create({
	card: {
		marginBottom: 15,
		marginHorizontal: 15,
		flex: 1,
		flexDirection: 'column'
	},

	photoContainer: {
		width: 'auto',
		minHeight: 205,
		backgroundColor: colors.gallery
	},

	photo: {
		flex: 1
	},

	address: {
		marginBottom: 4
	},

	text: {
		backgroundColor: colors.white,
		paddingVertical: 12,
		paddingHorizontal: 15
	},

	dates: {
		flexDirection: 'row'
	},

	textAddress: {
		color: colors.mineshaft
	},
	date: {
		flex: 1,
		color: colors.mineshaft
	},
	left: {
		paddingLeft: 10,
		textAlign: 'right'
	}
});
