import { StyleSheet } from 'react-native';
import { colors } from '@src/styles/colors';

export default StyleSheet.create({
	container: {
		flex: 0
	},
	header: {
		flexDirection: 'row',
		marginBottom: 15
	},
	title: {
		flex: 1
	},
	closeButton: {
		marginTop: 5,
		width: 80,
		alignItems: 'center',
		justifyContent: 'flex-start'
	},
	closeButtonText: {
		color: colors.primary
	},
	closedButtonText: {
		color: colors.danger
	},
	info: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},
	icon: {
		width: 20,
		height: 15,
		marginRight: 8
	},
	documentIcon: {
		width: 12
	},
	text: {
		marginRight: 22
	},
	images: {
		flexDirection: 'row',
	}
});
