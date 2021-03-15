import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import PropTypes from 'prop-types';

import styles from '@src/components/shared/zoomableImage/styles';
import PhotoView from 'react-native-photo-view';

export default class ZoomableImage extends Component {
	static propTypes = {
		source: PropTypes.string.isRequired
	};

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View style={styles.container}>
				<PhotoView
					source={{ uri: this.props.source }}
					minimumZoomScale={1}
					maximumZoomScale={3}
					androidScaleType="fitCenter"
					resizeMode={'contain'}
					style={styles.photoView}
				/>
			</View>
		);
	}
}
