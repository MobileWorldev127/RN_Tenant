import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  offlineContainer: {
    backgroundColor: '#b52424',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width,
    marginTop: 25,
		zIndex: 100,
  },
  offlineText: {
    color: '#fff'
  }
});
