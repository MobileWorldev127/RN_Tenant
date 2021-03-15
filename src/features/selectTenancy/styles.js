import { StyleSheet, Platform } from 'react-native';
import { colors } from '@src/styles/colors';

export default StyleSheet.create({
	screen: {
		paddingTop: Platform.OS === 'android' ? 60 : 76,
		paddingLeft: 0,
		paddingRight: 0,
		paddingBottom: 0,
		height: '100%',
		backgroundColor: colors.cyprus
	},

	container: {
		padding: 10
	}
});
