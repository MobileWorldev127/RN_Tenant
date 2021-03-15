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
		color: colors.white,
		zIndex: 10
	},
	close: {
		position: 'absolute',
		transform: [{ rotate: '45deg' }],
		padding: 10,
		right: 0,
		top: 0,
		fontSize: 60
	},
	cancel: {
		position: 'absolute',
		left: 15,
		bottom: 16,
		padding: 20
	},
	select: {
		position: 'absolute',
		right: 15,
		bottom: 16,
		padding: 20
	},
	videoContainer: {
		position: 'relative',
		flex: 1,
		width: '100%'
	},
	controlButtons: {
		flex: 1,
		flexDirection: 'column',
		position: 'absolute',
		justifyContent: 'center',
		alignItems: 'center',
		left: 0,
		width: '100%',
		height: '100%',
		zIndex: 10
	},
	play: {
		width: 80,
		height: 80
	},
	video: {
		flex: 1,
		width: '100%'
	}
});
