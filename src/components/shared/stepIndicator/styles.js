import { StyleSheet } from 'react-native';
import { colors } from '@src/styles/colors';

export default StyleSheet.create({
	row: {
		flex: 1,
		flexDirection: 'row'
	},

	spacing: {
		height: 40
	},

	progress: {
		width: 20,
		alignItems: 'center',
		justifyContent: 'flex-start'
	},

	detail: {
		flex: 1,
		marginRight: 35
	},

	content: {
		flex: 1,
		paddingLeft: 20
	},

	line: {
		width: 2,
		height: '100%',
		alignItems: 'flex-start',
		borderLeftWidth: 1,
		borderLeftColor: colors.eggBlue
	},

	point: {
		position: 'absolute',
		width: 12,
		height: 12,
		marginTop: 4,
		borderRadius: 6
	},

	today: {
		position: 'absolute',
		width: 16,
		height: 16,
		marginTop: '100%',
		marginLeft: 2,
		borderRadius: 8,
		backgroundColor: colors.white,
		zIndex: 10
	},

	unfinished: {
		borderWidth: 1,
		borderColor: colors.eggBlue,
		backgroundColor: colors.cyprus
	},

	finished: {
		backgroundColor: colors.eggBlue
	},

	last: {
		height: 10
	},
	separator: {
		flex: 1,
		marginTop: 9,
		marginBottom: 9,
		height: 2,
		marginLeft: -5,
		backgroundColor: colors.primary
	}
});
