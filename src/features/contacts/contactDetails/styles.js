import { StyleSheet } from 'react-native';
import { colors } from '@src/styles/colors';

export default StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: colors.white
	},
	photo: {
		flex: 1,
		resizeMode: 'contain',
		width: '100%',
		backgroundColor: colors.alabaster
	},

	fit: {
		resizeMode: 'cover'
	},

	information: {
		height: 130,
		paddingHorizontal: 20,
		paddingVertical: 18,
		justifyContent: 'flex-start',
		flex: 1
	},

	title: {
		color: colors.gray
	},

	separator: {
		height: 20
	},

	link: {
		flex: -1,
		flexDirection: 'row',
		alignItems: 'center',
		height: 24
	},

	phoneIcon: {
		width: 9,
		height: 16,
		marginRight: 14
	},

	emailIcon: {
		width: 13,
		height: 9,
		marginRight: 10
	}
});
