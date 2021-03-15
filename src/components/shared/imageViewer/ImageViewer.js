import React, { Component } from 'react';
import { View, Text, Image, Modal } from 'react-native';
import PropTypes from 'prop-types';

import globalStyles from '@src/styles/styles';
import styles from '@src/components/shared/imageViewer/styles';
import ZoomableImage from '@src/components/shared/zoomableImage/ZoomableImage';

export default class ImageViewer extends Component {
	static propTypes = {
		imageURI: PropTypes.string,
		isRemove: PropTypes.bool,
		isReadOnly: PropTypes.bool,
		onClose: PropTypes.func,
		onSelect: PropTypes.func
	};

	render() {
		return (
			<Modal
				animationType="slide"
				transparent={false}
				visible={!!this.props.imageURI}
				onRequestClose={() => this.props.onClose()}>
				<View style={styles.container}>
					<Text
						suppressHighlighting
						style={[globalStyles.subTitleText, styles.text, styles.close]}
						onPress={() => this.props.onClose()}>
						{'+'}
					</Text>
					{!!this.props.imageURI ? <ZoomableImage source={this.props.imageURI} /> : null}
					<Text
						style={[globalStyles.advice, styles.text, styles.cancel]}
						onPress={() => this.props.onClose()}>
						{'Cancel'}
					</Text>
					{!this.props.isReadOnly ? (
						<Text
							style={[globalStyles.advice, styles.text, styles.select]}
							onPress={() => this.props.onSelect()}>
							{this.props.isRemove ? 'Remove' : 'Choose'}
						</Text>
					) : null}
				</View>
			</Modal>
		);
	}
}
