import { StyleSheet } from 'react-native';
import { colors } from '@src/styles/colors';

export default StyleSheet.create({
	image: {
		height: 80,
		width: 106.5,
		marginTop: 10,
		marginBottom: 13.5,
		marginRight: 15,
		borderRadius: 2,
		backgroundColor: colors.primary
	},
	close: {
		alignSelf: 'flex-end',
		margin: 3.5
	},
	file: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingBottom: 5
	},
	addFile: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 10
	},
	addFileIcon: {
		width: 25,
		height: 25,
		marginRight: 6,
		alignSelf: 'center'
	},
	addFileText: {
		flex: 1,
		color: colors.white,
		fontSize: 13
	}
});
