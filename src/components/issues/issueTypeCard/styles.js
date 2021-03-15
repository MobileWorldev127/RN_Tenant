import { StyleSheet } from 'react-native';
import { colors } from '@src/styles/colors';
import globalStyles from '@src/styles/styles';

export default StyleSheet.create({
	card: {
		flex: 1,
		paddingTop: 15,
		paddingBottom: 8.25,
		paddingHorizontal: 12.15,
		minHeight: 115,
		borderRadius: 2,
		backgroundColor: colors.white
	},
	viewCard: {
		flex: 1
	},
	info: {
		flex: 1,
		justifyContent: 'flex-end'
	},
	infoCentered: {
		alignItems: 'center'
	},
	iconView: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	icon: {
		width: 42,
		height: 42
	},
	description: {
		color: colors.silver
	}
});
