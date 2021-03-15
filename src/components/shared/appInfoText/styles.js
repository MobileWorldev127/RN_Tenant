import { StyleSheet } from 'react-native';
import { colors } from '@src/styles/colors';

export default StyleSheet.create({
	listItemPoint: {
		lineHeight: 12.6,
		color: colors.primary
	},
	listItem: {
		width: '100%',
		opacity: 0.9,
		flexDirection: 'row',
		paddingBottom: 16
	},
	text: {
		lineHeight: 12.6,
		flex: 1
	}
});
