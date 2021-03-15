import React, { Component } from 'react';
import { View, Text, Modal } from 'react-native';
import PropTypes from 'prop-types';

import globalStyles from '@src/styles/styles';
import styles from '@src/components/shared/mediaViewer/styles';
import VideoViewer from '@src/components/shared/videoViewer/VideoViewer';

export default class MediaViewer extends Component {
	static propTypes = {
		videoURI: PropTypes.string,
		isRemove: PropTypes.bool,
		isReadOnly: PropTypes.bool,
		onClose: PropTypes.func,
		onSelect: PropTypes.func
	};

	onClose() {
		this.props.onClose && this.props.onClose();
	}

	onSelect() {
		this.props.onSelect && this.props.onSelect();
	}

	render() {
		return (
			<Modal
				animationType="slide"
				transparent={false}
				visible={!!this.props.videoURI}
				onRequestClose={() => this.onClose()}>
				<View style={styles.container}>
					<Text
						style={[globalStyles.subTitleText, styles.text, styles.close]}
						onPress={() => this.onClose()}>
						{'+'}
					</Text>
					{!!this.props.videoURI ? <VideoViewer videoURI={this.props.videoURI} /> : null}
					<Text
						suppressHighlighting
						style={[globalStyles.advice, styles.text, styles.cancel]}
						onPress={() => this.onClose()}>
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
