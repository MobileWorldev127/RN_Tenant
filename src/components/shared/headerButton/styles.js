import { StyleSheet } from 'react-native';
import { colors } from '@src/styles/colors';

export default StyleSheet.create({
	button: {
		height: '100%',
		justifyContent: 'center'
	},
	image: {
		height: 25,
		width: 25
	},
	text: {
		marginRight: 15,
		color: colors.primary
	}
});
