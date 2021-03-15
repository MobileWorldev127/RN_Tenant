import { StyleSheet, Platform } from 'react-native';
import { colors } from '@src/styles/colors.js';

export default StyleSheet.create({
	container: {
		width: '100%',
		paddingTop: Platform.OS === 'android' ? 62.07 : 80.07
	},

	controls: {
		marginLeft: 9
	}
});
