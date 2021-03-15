import { StyleSheet } from 'react-native';
import { colors } from '@src/styles/colors';

export default StyleSheet.create({
	screen: {
		marginRight: 35,
		marginBottom: 21
	},

	row: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		height: 30
	},

	title: {
		marginBottom: 16
	},

	text: {
		flex: 1,
		width: '100%',
		paddingHorizontal: 10
	},

	icon: {
		width: 30,
		alignItems: 'flex-start'
	},

	iconImage: {
		width: 12,
		height: 10
	}
});
