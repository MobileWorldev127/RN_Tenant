import { StyleSheet } from 'react-native';
import { colors } from '@src/styles/colors';
import globalStyles from '@src/styles/styles';

export default StyleSheet.create({
	card: {
		marginBottom: 20,
		marginHorizontal: 20,
		height: 130,
		flex: 1,
		flexDirection: 'row',
		backgroundColor: colors.white
	},

	first: {
		marginTop: 20
	},

	photo: {
		width: 100,
		height: 130,
		backgroundColor: colors.silver
	},

	information: {
		height: 130,
		paddingHorizontal: 19,
		paddingVertical: 17,
		justifyContent: 'center',
		flex: 1
	},

	title: {
		color: colors.gray
	},

	separator: {
		flex: 1
	},

	link: {
		flex: -1,
		flexDirection: 'row',
		alignItems: 'center',
		height: 24
	},

	iconContainer: {
		width: 13,
		marginRight: 8,
		justifyContent: 'center',
		alignItems: 'center'
	},

	phoneIcon: {
		width: 9,
		height: 16
	},

	emailIcon: {
		width: 13,
		height: 9
	}
});
