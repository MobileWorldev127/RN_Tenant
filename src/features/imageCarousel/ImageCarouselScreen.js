import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import PropTypes from 'prop-types';
import Swiper from 'react-native-swiper';
import globalStyles from '@src/styles/styles';
import styles from '@src/features/imageCarousel/styles';
import ZoomableImage from '@src/components/shared/zoomableImage/ZoomableImage';

export default class ImageCarouselScreen extends Component {
	constructor(props) {
		super(props);

		this.state = {
			index: 0,
			images: []
		};
	}

	componentDidMount() {
		if (this.props.navigation.state.params && this.props.navigation.state.params.images) {
			this.setState({
				images: this.props.navigation.state.params.images
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
					{this.state.images.filter(image => image.file_url).map((image, index) => {
						return this.state.index === index ? (
							<ZoomableImage key={index} source={image.file_url} />
						) : null;
					})}
				</Swiper>
			</View>
		);
	}
}
