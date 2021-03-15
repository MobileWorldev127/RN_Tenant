import { StyleSheet } from 'react-native';
import { colors } from '@src/styles/colors';

export default StyleSheet.create({
	button: {
		height: 30,
		backgroundColor: colors.eggBlue,
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center'
	},

	text: {
		flex: 1,
		width: '100%'
	},

	icon: {
		width: 30,
		alignItems: 'center'
	},

	arrow: {
		position: 'absolute',
		right: 0,
		width: 24,
		justifyContent: 'center',
		alignItems: 'center'
	},

	arrowIcon: {
		width: 10,
		height: 8
	}
});
