import React, { Component } from 'react';
import { Image } from 'react-native';
import ViewBackground from '@src/components/shared/viewBackground/ViewBackground';
import styles from '@src/features/splash/styles';
import { Routes } from '@src/navigation/screenNames';
import storage from '@src/api/storage';
import auth from '@src/api/auth';
import images from '@src/assets/images';

class SplashScreen extends Component {
	constructor(props) {
		super(props);
		init();
	}

	init() {
		// const firstTime = await storage.get(Routes.INTRO);
		// const userAuth = await auth.getUserToken();
		// if(firstTime && userAuth){
		//     this.props.navigation.navigate(Routes.HOME);
		// } else if(firstTime){
		//     this.props.navigation.navigate(Routes.LOGIN);
		// }
	}

	render() {
		return (
			<ViewBackground styles={styles.container} source={images.background_login}>
				<Image style={styles.image} source={images.logoSplash} />
			</ViewBackground>
		);
	}
}

export default SplashScreen;
