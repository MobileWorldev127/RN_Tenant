import { StyleSheet } from 'react-native';
import { colors } from '@src/styles/colors';

export default StyleSheet.create({
	container: {
		flexDirection: 'row'
	},
	addButton: {
		width: 50,
		height: 50,
		backgroundColor: colors.primary,
		justifyContent: 'center',
		alignSelf: 'flex-end'
	},
	addButtonSelected: {
		backgroundColor: colors.tropicalRainForest
	},
	addIcon: {
		width: 22,
		height: 22,
		alignSelf: 'center'
	},
	sendButton: {
		width: 50,
		height: 50,
		justifyContent: 'center'
	},
	sendIcon: {
		width: 25,
		height: 25,
		alignSelf: 'center'
	},
	sendContainer: {
		backgroundColor: colors.white,
		justifyContent: 'flex-end'
	},
	inputFieldContainer: {
		flex: 1,
		backgroundColor: colors.white,
		paddingHorizontal: 15
	},
	inputField: {
		height: 50,
		backgroundColor: colors.white
	},
	attachContainer: {
		position: 'absolute',
		bottom: 50,
		width: '100%',
		zIndex: 10
	},
	photos: {
		backgroundColor: 'rgba(166,166,166, 0.2)',
	},
	fileList: {
		flexDirection: 'row',
		marginBottom: 0,
		padding: 5
	}
});
