import { StyleSheet } from 'react-native';
import { colors } from '@src/styles/colors';

export default StyleSheet.create({
	button: {
		alignItems: 'center',
		alignSelf: 'stretch',
		height: 50,
		borderRadius: 2,
		backgroundColor: colors.primary,
		justifyContent: 'center'
	},
	buttonText: {
		color: colors.white,
		fontSize: 13,
		fontWeight: 'bold'
	},
	disabled: {
		opacity: 0.4
	}
});
