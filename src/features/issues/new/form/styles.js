import { StyleSheet, Platform } from 'react-native';
import { colors } from '@src/styles/colors';

export default StyleSheet.create({
	screen: {
		paddingTop: Platform.OS === 'android' ? 40 : 56,
		paddingLeft: 0
	},
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		paddingLeft: '15%'
	},
	heading: {
		marginBottom: 21.5
	},
	title: {
		color: colors.silk
	},
	titleInput: {
		height: 40,
		backgroundColor: colors.semiTransparent,
		marginTop: 3.5,
		marginBottom: 17,
		padding: 5,
		color: colors.white
	},
	description: {
		color: colors.silk
	},
	descriptionInput: {
		height: 140,
		backgroundColor: colors.semiTransparent,
		marginTop: 3.5,
		marginBottom: 11,
		padding: 5,
		color: colors.white
	},
	reportIssue: {
		marginTop: 38.5,
		marginBottom: 40
	},
	attachContainer: {
		position: 'absolute',
		bottom: 0
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
