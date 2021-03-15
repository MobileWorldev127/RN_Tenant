import { StyleSheet } from 'react-native';
import { colors } from '@src/styles/colors';

export default StyleSheet.create({
	container: {
		width: '100%',
		overflow: 'hidden',
		zIndex: 1
	},
	optionButton: {
		height: 50
	},
	optionButtonNext: {
		borderTopWidth: 1,
		borderTopColor: colors.gallery
	},
	iconContainer: {
		width: 50,
		height: 50
	},
	sourceText: {
		color: colors.black,
		marginLeft: 25
	},
	cameraIcon: {
		height: 20,
		width: 25
	},
	imageIcon: {
		height: 20,
		width: 26
	},
	documentIcon: {
		height: 20,
		width: 16
	}
});
