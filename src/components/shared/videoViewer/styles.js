import { StyleSheet } from 'react-native';
import { colors } from '@src/styles/colors';

export default StyleSheet.create({
	videoContainer: {
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
