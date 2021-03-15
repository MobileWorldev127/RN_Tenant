import React, { Component } from 'react';
import { ImageBackground } from 'react-native';
import PropTypes from 'prop-types';
import globalStyles from '@src/styles/styles';
import images from '@src/assets/images';

class ViewBackground extends Component {
	static propTypes = {
		source: PropTypes.any,
		styles: PropTypes.any
	};

	render() {
		return (
			<ImageBackground
				style={[globalStyles.containerLeft, this.props.styles]}
				source={this.props.source || images.background}>
				{this.props.children}
			</ImageBackground>
		);
	}
}

export default ViewBackground;
