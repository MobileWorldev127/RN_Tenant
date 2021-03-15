import { StyleSheet } from 'react-native';
import { colors } from '/src/styles/colors';

export default StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		margin: 80
	},

	panel: {
		minWidth: 160,
		maxWidth: 280,
		padding: 40,
		backgroundColor: colors.silk,
		borderRadius: 10
	},

	text: {
		marginTop: 20,
		textAlign: 'center'
	}
});
