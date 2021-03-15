import { StyleSheet } from 'react-native';
import { colors } from '@src/styles/colors';
import globalStyles from '@src/styles/styles';

export default StyleSheet.create({
	card: {
		padding: 15,
		height: 65,
		width: '100%',
		backgroundColor: colors.white
	},
	viewCard: {
		height: '100%',
		width: '100%',
		flex: 1,
		flexDirection: 'row'
	},
	info: {
		alignItems: 'flex-start',
		height: '100%',
		justifyContent: 'center'
	},
	iconView: {
		alignItems: 'flex-start',
		height: '100%',
		justifyContent: 'center',
		marginRight: 20,
		marginLeft: 10
	},
	view: {
		flex: 1,
		width: '100%',
		flexDirection: 'row',
		alignItems: 'flex-start',
		justifyContent: 'flex-start'
	},
	icon: {
		width: 42,
		height: 42
	}
});
