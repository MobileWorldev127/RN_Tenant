import { StyleSheet } from 'react-native';
import { colors } from '@src/styles/colors';

export default StyleSheet.create({
	container: {
		flex: 0
	},
	fileList: {
		marginBottom: 10
	},
	fileItem: {
		width: 150,
		height: 100,
		marginBottom: 5,
		marginRight: 5,
		justifyContent: 'center',
		backgroundColor: colors.black
	},
	fileImage: {
		width: '100%',
		height: '75%',
		resizeMode: 'contain'
	},
	documentItem: {
		backgroundColor: colors.white
	},
	text: {
		color: colors.primary,
		alignSelf: 'center'
	},
	image: {
		width: '100%',
		height: '100%'
	}
});
