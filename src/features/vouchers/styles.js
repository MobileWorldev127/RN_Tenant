import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
	container: {
		alignItems: 'flex-start',
		padding: 0,
		paddingLeft: 0,
		paddingTop: 80,
		width: '100%'
	},
	card: {
		height: 167.5,
		borderRadius: 2
	},
	cardLeft: {
		flex: 1,
		paddingLeft: 15,
		marginRight: 10,
		marginBottom: 10
	},
	cardRight: {
		flex: 1,
		paddingRight: 15,
		marginBottom: 10
	}
});
