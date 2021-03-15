import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import AppInfoText from '@src/components/shared/appInfoText/AppInfoText';
import { infoText } from '@src/features/intro/infoText';

import globalStyles from '@src/styles/styles';
import styles from '@src/components/home/appInfo/styles';

export default class AppInfo extends Component {
	render() {
		return (
			<View>
				<Text style={[globalStyles.fontDefault, styles.title]}>
					Once you've moved in you can use this app to:
				</Text>
				<AppInfoText items={infoText} />
			</View>
		);
	}
}
