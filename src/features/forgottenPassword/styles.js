import { StyleSheet } from 'react-native';
import { colors } from '@src/styles/colors';

export default StyleSheet.create({
	container: {
		paddingTop: 214,
		justifyContent: 'flex-start',
		alignItems: 'flex-start'
	},
	description: {
		marginBottom: 20,
		color: colors.mineshaft
	},
	emailContainer: {
		marginBottom: 20
	},
	keyboardHide: {
		flex: 1
	},
	label: {
		marginBottom: 10.08
	}
});
