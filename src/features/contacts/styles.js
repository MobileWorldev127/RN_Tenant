import { StyleSheet } from 'react-native';
import { colors } from '@src/styles/colors';

export default StyleSheet.create({
	container: {
		backgroundColor: '#EDEDED',
		height: '100%'
	},
	noContacts: {
		marginTop: 20,
		marginLeft: 10
	},
	header: {
		backgroundColor: colors.white,
		flexDirection: 'row',
		alignItems: 'center',
		height: 50
	},
	button: {
		flex: 1,
		alignItems: 'center',
		alignSelf: 'stretch',
		padding: 15,
		width: '50%',
		borderBottomWidth: 2,
		borderBottomColor: colors.white
	},
	active: {
		borderBottomWidth: 2,
		borderBottomColor: colors.primary
	},
	activeText: {
		color: colors.black
	},
});
