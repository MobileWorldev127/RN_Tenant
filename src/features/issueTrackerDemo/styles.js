import { StyleSheet } from 'react-native';
import { colors } from '@src/styles/colors';

export default StyleSheet.create({
	slideShow: {
		flex: 1,
		backgroundColor: colors.white
	},
	imageContainer: {
		flex: 1,
	},
	image: {
		flex: 1,
		resizeMode: 'contain' // cover stretch center
	},
	separator: {
		height: 3,
		width: 25,
		backgroundColor: colors.eggBlue,
		marginBottom: 4.5
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 5,
		color: colors.mineshaft
	},
	progress: {
		padding: 30,
		flexDirection: 'row'
	},
	progressDot: {
		height: 8,
		width: 8,
		marginRight: 8,
		borderRadius: 5
	},
	button: {
		margin: 10
	}
});
