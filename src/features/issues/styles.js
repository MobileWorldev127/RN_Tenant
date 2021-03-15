import { StyleSheet, Platform, Dimensions } from 'react-native';
import { colors } from '@src/styles/colors';

const { height } = Dimensions.get('window');
export default StyleSheet.create({
	screen: {
		alignItems: 'flex-start',
		padding: 0,
		paddingLeft: 0,
		paddingTop:
			Platform.OS === 'android'
				? 52
				: Platform.OS === 'ios' && height > 810 // If iphone X
					? 90
					: 68,
		width: '100%',
		justifyContent: 'center'
	},
	scrollView: {
		paddingHorizontal: 15
	},
	button: {
		marginBottom: 18
	},

	description: {
		marginBottom: 18
	},

	text: {
		color: colors.white,
		textAlign: 'left',
		lineHeight: 20
	}
});
