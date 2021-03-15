import { StyleSheet } from 'react-native';
import { colors } from '@src/styles/colors';

export default StyleSheet.create({
	container: {
		marginBottom: 40,
		marginRight: 40
	},

	text: {
		color: colors.white,
		marginBottom: 5,
	},
	details: {
		width: 247
	},
	managed: {
		width: 120
	},

	nonmanaged: {
		width: 148
	},

	button: {
		borderRadius: 2,
		marginBottom: 10
	},

	buttonIcon: {
		width: 16,
		height: 18
	}
});
