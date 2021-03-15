import React, { Component } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { ProcessingManager } from 'react-native-video-processing';
import RNFetchBlob from 'rn-fetch-blob';

import styles from '@src/components/shared/videoPreview/styles';
import icons from '@src/assets/icons';

export default class VideoPreview extends Component {
	static propTypes = {
		videoURI: PropTypes.string.isRequired,
		isLocalFile: PropTypes.bool,
		onPress: PropTypes.func,
		style: PropTypes.any
	};

	constructor(props) {
		super(props);

		this.state = {
			videoURI: '',
			thumbnail: '',
			loaded: false
		};

		this.getVideoPreviewImage();
	}

	getPreviewData = async path => {
		const second = 0;
		const maximumSize = { width: 150, height: 100 }; // default is { width: 1080, height: 1080 } iOS only
		const format = 'base64'; // JPEG

		const result = await ProcessingManager.getPreviewForSecond(
			path,
			second,
			maximumSize,
			format
		);

		return 'data:image/png;base64,' + result;
	};

	getVideoPreviewImage = async () => {
		try {
			if (this.props.videoURI) {
				let thumbnail;

				if (this.props.isLocalFile) {
					thumbnail = await this.getPreviewData(this.props.videoURI);
				} else {
					const res = await RNFetchBlob.config({
						fileCache: true,
						path: `${RNFetchBlob.fs.dirs.CacheDir}/tmpPreview${(Math.random() * 1000) |
							0}.mp4`
					}).fetch('GET', this.props.videoURI);

					if (res) {
						if (res.info().status === 200) {
							thumbnail = await this.getPreviewData(res.path());
							await RNFetchBlob.fs.unlink(res.path());
						}
					}
				}

				if (thumbnail) {
					this.setState({
						thumbnail
					});
				}
			}
		} catch (error) {
			throw error;
		}
	};

	render() {
		return (
			<TouchableOpacity
				activeOpacity={1}
				style={[styles.container, this.props.style]}
				onPress={() => this.props.onPress && this.props.onPress()}>
				{this.state.thumbnail ? (
					<View style={styles.controlButtons}>
						<Image style={styles.play} source={icons.play} />
					</View>
				) : null}
				{this.state.thumbnail ? (
					<Image
						style={styles.preview}
						source={{ uri: this.state.thumbnail }}
						resizeMode={'contain'}
					/>
				) : null}
			</TouchableOpacity>
		);
	}
}
