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
		position: 'absolute',
		color: colors.mineshaft,
		zIndex: 101
	},
	image: {
		flex: 1,
		width: '100%',
		resizeMode: 'contain'
	},
	close: {
		transform: [{ rotate: '45deg' }],
		padding: 10,
		right: 0,
		top: 0,
		fontSize: 60
	},
	cancel: {
		left: 15,
		bottom: 16,
		padding: 20
	},
	select: {
		right: 15,
		bottom: 16,
		padding: 20
	},
	download: {
		right: 15,
		bottom: 16,
		padding: 20
	}
});
