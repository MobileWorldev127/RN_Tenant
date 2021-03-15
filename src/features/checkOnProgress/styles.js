import { StyleSheet } from 'react-native';
import { colors } from '@src/styles/colors';
import globalStyles from '@src/styles/styles';

export default StyleSheet.create({
	screen: {
		paddingBottom: 15
	},
	container: {
		width: '100%'
	},
	note: {
		marginBottom: 20,
		lineHeight: 22.61
	},
	linkButton: {
		marginBottom: 20
	},
	processList: {
		marginBottom: 22,
		maxHeight: 465
	},
	processItem: {
		marginBottom: 35
	},
	row: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center'
	},
	value: {
		color: colors.primary,
		fontSize: 30,
		lineHeight: 30
	},
	progressBar: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		width: '100%'
	},
	separator: {
		height: 3,
		width: '100%',
		backgroundColor: colors.gallery
	},
	activeSeparator: {
		height: 3,
		width: '0%',
		backgroundColor: colors.eggBlue
	},
	highlight: {
		color: colors.primary,
		opacity: 0.9
	},
});
