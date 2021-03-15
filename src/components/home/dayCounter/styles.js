import { StyleSheet } from 'react-native';
import { colors } from '@src/styles/colors';
import globalStyles from '@src/styles/styles';

export default StyleSheet.create({
	counter: {
		backgroundColor: colors.white,
		borderBottomWidth: 1,
		borderBottomColor: colors.gallery
	},

	container: {
		flexDirection: 'row',
		alignItems: 'center'
	},

	dayContainer: {
		width: 83,
		justifyContent: 'center',
		alignItems: 'center'
	},

	days: {
		fontSize: 80,
		color: colors.primary,
	},

	description: {
		color: colors.primary,
	}
});
