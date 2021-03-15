import { StyleSheet } from 'react-native';
import { colors } from '@src/styles/colors';

export default StyleSheet.create({
	imageBackground: {
		flex: 1,
		paddingTop: 80
	},
	flatList: {
		paddingHorizontal: 15
	},
  place: {
		marginBottom: 20,
		height: 315,
		flex: 1,
		backgroundColor: colors.white
	},
	image: {
		backgroundColor: colors.primary,
		height: 205
	},
	info: {
		padding: 15.5
	},
	description: {
		marginTop: 5,
		marginBottom: 2.5
	},
	submittedBy: {
		color: colors.silver
	},
	footer: {
		marginTop: 8.5,
		textAlign: 'right',
		color: colors.primary
	}
});
