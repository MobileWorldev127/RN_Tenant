import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Swiper from 'react-native-swiper';
import VideoViewer from '@src/components/shared/videoViewer/VideoViewer';
import globalStyles from '@src/styles/styles';
import styles from '@src/features/videoCarousel/styles';

export default class VideoCarouselScreen extends Component {
	constructor(props) {
		super(props);

		this.state = {
			index: 0,
			videos: []
		};
	}

	componentDidMount() {
		if (this.props.navigation.state.params && this.props.navigation.state.params.videos) {
			this.setState({
				videos: this.props.navigation.state.params.videos
			});
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<Swiper
					containerStyle={styles.gesture}
					loop={false}
					dotColor={'gray'}
					activeDotColor={'white'}
					nextButton={
						<Text style={[globalStyles.fontDefault, styles.pageButton]}>›</Text>
					}
					prevButton={
						<Text style={[globalStyles.fontDefault, styles.pageButton]}>‹</Text>
					}
					onIndexChanged={index => this.setState({ index })}
					showsButtons={true}>
					{this.state.videos.filter(video => video.file_url).map((video, index) => {
						return this.state.index === index ? (
							<VideoViewer key={index} videoURI={video.file_url} />
						) : null;
					})}
				</Swiper>
			</View>
		);
	}
}
