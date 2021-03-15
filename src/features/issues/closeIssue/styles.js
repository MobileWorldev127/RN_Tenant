import { StyleSheet } from 'react-native';
import { colors } from '@src/styles/colors';

export default StyleSheet.create({
	modal: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.8)'
	},
	container: {
		width: 315,
		backgroundColor: colors.white
	},
	header: {
		justifyContent: 'center',
		height: 50,
		backgroundColor: colors.tropicalRainForest
	},
	headerText: {
		alignSelf: 'center',
		color: colors.white
	},
	modalScroll: {
		flexGrow: 1
	},
	form: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	},
	content: {
		paddingTop: 17,
		paddingBottom: 19.5,
		paddingLeft: 20,
		paddingRight: 20
	},
	label: {
		alignSelf: 'flex-start'
	},
	textArea: {
		height: 100,
		width: 275,
		marginTop: 4.5,
		marginBottom: 9.5,
		borderColor: colors.alto,
		borderWidth: 1,
		padding: 5,
		backgroundColor: colors.white
	},
	ratingText: {
		marginTop: 37,
		marginBottom: 7
	},
	rating: {
		flexDirection: 'row'
	},
	star: {
		marginRight: 11.9,
		height: 25,
		width: 25
	},
	closeButton: {
		marginTop: 33.5
	},
	disabled: {
		backgroundColor: colors.alto
	},
	cancelButton: {
		marginTop: 17.5,
		marginBottom: 30,
		color: colors.primary,
		alignSelf: 'center'
	},
	addFileText: {
		color: colors.primary
	},
	attachContainer: {
		position: 'absolute',
		bottom: 0,
		alignSelf: 'center',
		zIndex: 10
	},
	photos: {
		backgroundColor: 'rgba(166,166,166, 0.2)'
	},
	fileList: {
		flexDirection: 'row',
		marginBottom: 0
	},
	fileItem: {
		width: 106.5,
		height: 80
	}
});
