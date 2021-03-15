import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '@src/styles/colors';

export default StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center',
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		zIndex: 100,
		backgroundColor: 'white'
	},
	pdf: {
		flex: 1,
		width: Dimensions.get('window').width
	},
	zoomNote: {
		position: 'absolute',
		top: 20,
		backgroundColor: 'rgba(0, 0, 0, 0.8)',
		padding: 15,
		zIndex: 1,
		borderRadius: 10
	},
	zoomNoteText: {
		color: 'white'
	},
	text: {
		position: 'absolute',
		color: colors.mineshaft,
		zIndex: 101
	},
	downloadContainer: {
		width: '100%',
		height: 60,
		padding: 10,
		backgroundColor: colors.alabaster
	},
	download: {
		height: 29,
		alignSelf: 'center'
	}
});
