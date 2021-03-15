import { StyleSheet } from 'react-native';
import { colors } from '@src/styles/colors';

export default StyleSheet.create({
	container: {
		flex: 1,
		overflow: 'hidden',
		backgroundColor: colors.black
	},
	text: {
		color: colors.white
	},
	gesture: {
		flex: 1,
		width: '100%'
	},
	pagination: {
		flex: 1,
		marginBottom: 50
	},
	pageButton: {
		color: 'white',
		fontSize: 60
	}
});
