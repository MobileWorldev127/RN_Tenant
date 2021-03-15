import { StyleSheet } from 'react-native';
import { colors } from '@src/styles/colors';

export default StyleSheet.create({
	container: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		overflow: 'hidden',
		backgroundColor: colors.black
	},
	text: {
		color: colors.white
	},
	image: {
		flex: 1,
		width: '100%',
		resizeMode: 'contain'
	},
	close: {
		position: 'absolute',
		transform: [{ rotate: '45deg' }],
		padding: 10,
		right: 0,
		top: 0,
		fontSize: 60,
		zIndex: 10
	},
	cancel: {
		position: 'absolute',
		left: 15,
		bottom: 16,
		zIndex: 10,
		padding: 20
	},
	select: {
		position: 'absolute',
		right: 15,
		bottom: 16,
		zIndex: 10,
		padding: 20
	}
});
