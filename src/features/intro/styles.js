import { StyleSheet } from 'react-native';
import { colors } from '@src/styles/colors';

export default StyleSheet.create({
	container: {},
	introPanel: {
		width: '100%',
		position: 'absolute',
		backgroundColor: colors.white,
		padding: 20,
		right: 0,
		bottom: '13%'
	},
	title: {
		paddingTop: 40,
		lineHeight: 30
	},
	header: {
		marginBottom: 25,
		paddingTop: 10
	},
	listItems: {
		marginBottom: 15
	},
	point: {
		fontSize: 8,
		lineHeight: 10
	}
});
