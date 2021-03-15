import { StyleSheet } from 'react-native';
import { colors } from '@src/styles/colors';
import globalStyles from '@src/styles/styles';

export default StyleSheet.create({
	websiteInfo: {
		paddingBottom: 15
	},
	name: {
		marginBottom: 16
	},

	description: {
		marginBottom: 20,
		color: colors.mineshaft
	},

	highlight: {
		color: colors.primary,
		opacity: 0.9
	},

	linkButton: {
		marginBottom: 20
	}
});
