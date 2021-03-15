import { StyleSheet } from 'react-native';
import { colors } from '@src/styles/colors';
import globalStyles from '@src/styles/styles';

export default StyleSheet.create({
	card: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		minHeight: 115,
		backgroundColor: colors.white
	},
	icon: {
		height: '100%',
		width: '100%',
		borderRadius: 2
	}
});
