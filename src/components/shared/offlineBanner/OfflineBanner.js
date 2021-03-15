import React, { PureComponent } from 'react';
import styles from '@src/components/shared/offlineBanner/styles';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import NetInfo from "@react-native-community/netinfo";

class OfflineBanner extends PureComponent {

	constructor(props) {
		super(props);

		this.state = {
			isConnected: true
		}
	}

	componentDidMount() {
		NetInfo.addEventListener(this.handleConnectivityChange);
	}

	componentWillUnmount() {
		NetInfo.addEventListener(this.handleConnectivityChange);
	}

	handleConnectivityChange = state => {
		this.setState({ isConnected: state.isConnected });
	};

	render() {
    return !this.state.isConnected && (
			<View style={styles.offlineContainer}>
				<Text style={styles.offlineText}>No Internet Connection</Text>
			</View>
		)
	}
}

export default OfflineBanner;
