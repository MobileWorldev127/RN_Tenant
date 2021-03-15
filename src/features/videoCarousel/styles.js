import { StyleSheet } from 'react-native';
import { colors } from '@src/styles/colors';

export default StyleSheet.create({
	container: {
		position: 'absolute',
		width: '100%',
		height: '100%',
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
	pageButton: {
		color: 'white',
		fontSize: 60
	}
});
