import { StyleSheet } from 'react-native';
import { colors } from '@src/styles/colors';

export default StyleSheet.create({
	container: {
		justifyContent: 'flex-start',
		alignItems: 'flex-end',
		paddingBottom: '15%'
	},
	listTitle: {
		marginBottom: 16,
		lineHeight: 12.6
	},
	listItems: {
		marginBottom: 4
	},
	separator: {
		borderBottomColor: colors.concrete,
		marginBottom: 16
	},
	title: {
		color: colors.mineshaft
	}
});
