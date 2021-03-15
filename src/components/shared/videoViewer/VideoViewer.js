import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Platform } from 'react-native';
import PropTypes from 'prop-types';
import Video from 'react-native-video';
import styles from '@src/components/shared/videoViewer/styles';
import icons from '@src/assets/icons';
import Indicator from '@src/components/shared/indicator/Indicator';

export default class VideoViewer extends Component {
	static propTypes = {
		videoURI: PropTypes.string.isRequired,
		noPlaying: PropTypes.bool,
		onPress: PropTypes.func
	};

	constructor(props) {
		super(props);

		this.video = null;

		this.state = {
			videoURI: this.props.videoURI || '',
			loading: false,
			pause: false
		};

		this.resetPlayer = this.resetPlayer.bind(this);
		this.onPressVideo = this.onPressVideo.bind(this);
		this.onStop = this.onStop.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.videoURI !== this.state.videoURI) {
			this.setState({ videoURI: nextProps.videoURI });
		}
	}

	componentWillUnmount() {
		if (this.video) {
			this.resetPlayer();
			this.video = null;
		}
	}

	resetPlayer = () => {
		this.video.seek(0);
	};

	onPressVideo = () => {
		if (!this.props.noPlaying) {
			if (!this.state.loading) {
				this.setState(
					prevState => ({
						pause: !prevState.pause
					}),
					() => {
						this.state.pause && this.resetPlayer();
						this.props.onPress && this.props.onPress(this.state.pause);
					}
				);
			}
		} else {
			this.props.onPress && this.props.onPress();
		}
	};

	onStop = isEnding => {
		this.setState(
			{ pause: true, loading: false },
			() => (Platform.OS === 'android' || isEnding) && this.resetPlayer()
		);
	};

	render() {
		return (
			<TouchableOpacity
				style={styles.videoContainer}
				activeOpacity={1}
				onPress={() => this.onPressVideo()}>
				{!this.props.noPlaying ? <Indicator visible={this.state.loading} /> : null}
				<View style={styles.controlButtons}>
					{this.state.pause ? <Image style={styles.play} source={icons.play} /> : null}
				</View>
				<Video
					ref={ref => (this.video = ref)}
					source={{ uri: this.state.videoURI }}
					style={styles.video}
					resizeMode={'contain'}
					paused={this.state.pause}
					onLoadStart={() => this.setState({ loading: true })}
					onLoad={() => this.onStop()}
					onEnd={() => this.onStop(true)}
				/>
			</TouchableOpacity>
		);
	}
}
