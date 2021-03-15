import { StyleSheet } from 'react-native';
import { colors } from '@src/styles/colors';

export default StyleSheet.create({
	container: {
		width: '100%'
	},
	activedInput: {
		borderWidth: 1,
		borderColor: colors.primary
	},
	multiline: {
		textAlignVertical: "top"
	}
});
