import { StyleSheet } from 'react-native';
import { colors } from '@src/styles/colors';

export default StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: colors.white
	},
	logoContainer: {
		height: 232.5
	},
	logo: {
		flex: 1,
		resizeMode: 'contain',
		width: '100%',
		backgroundColor: colors.white
	},

	content: {
		paddingHorizontal: 15,
		paddingVertical: 18,
		justifyContent: 'flex-start',
	},

	companyName: {
		fontSize: 34
	},

	phoneNumber: {
		fontSize: 18,
		marginBottom: 10,
		color: colors.doveGray
	},
	offer: {
		color: colors.black
	},

	discount_info: {
		marginBottom: 14
	},

	button: { marginBottom: 21.5 },

	termsAndConditions: {
		fontSize: 16,
		paddingTop: 10,
		paddingBottom: 10,
	}
});
