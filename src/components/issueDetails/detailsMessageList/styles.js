import { StyleSheet } from 'react-native';
import { colors } from '@src/styles/colors';

export default StyleSheet.create({
	container: {
		flex: 1
	},
	list: {
		paddingHorizontal: 20
	},
	listContent: {
		flexGrow: 1,
		justifyContent: 'flex-end'
	},
	separator: {
		opacity: 0.5,
		borderBottomWidth: 1,
		borderBottomColor: colors.silver
	},
	date: {
		paddingVertical: 15,
		alignSelf: 'center'
	}
});
