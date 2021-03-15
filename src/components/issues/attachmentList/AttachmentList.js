import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, Linking, ScrollView, Platform } from 'react-native';
import PropTypes from 'prop-types';

import VideoPreview from '@src/components/shared/videoPreview/VideoPreview';

import globalStyles from '@src/styles/styles';
import styles from '@src/components/issues/attachmentList/styles';
import icons from '@src/assets/icons';

export default class AttachmentList extends Component {
	static propTypes = {
		isLocalFile: PropTypes.bool,
		isReadOnly: PropTypes.bool,
		attachment: PropTypes.array.isRequired,
		onSelect: PropTypes.func
	};

	constructor(props) {
		super(props);

		this.state = {
			attachment: this.props.attachment || []
		};
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.attachment !== this.state.attachment) {
			this.setState({ attachment: nextProps.attachment });
		}
	}

	getFileList = () => {
		return (
			<ScrollView
				style={[styles.fileList, this.props.fileListStyle]}
				scrollEnabled={!!this.props.isLocalFile}
				horizontal={!!this.props.isLocalFile}>
				{this.state.attachment.map((file, index) => this.getFileItem(file, index))}
			</ScrollView>
		);
	};

	getFileItem = (file, index) => {
		if (file.mime_type) {
			if (file.mime_type.indexOf('image') > -1) {
				return (
					<View key={index} style={[styles.fileItem, this.props.itemStyle]}>
						<TouchableOpacity
							onPress={() =>
								this.props.onSelect &&
								this.props.onSelect(this.getFileData(index, 'image'), index)
							}>
							<Image
								style={styles.image}
								source={file.source ? file.source : { uri: file.file_url }}
							/>
						</TouchableOpacity>
					</View>
				);
			} else if (file.mime_type.indexOf('video') > -1) {
				return (
					<VideoPreview
						key={index}
						isLocalFile={!!this.props.isLocalFile}
						videoURI={
							Platform.OS === 'android' && file.path ? file.path : file.file_url
						}
						style={[styles.fileItem, this.props.itemStyle]}
						onPress={() =>
							this.props.onSelect &&
							this.props.onSelect(this.getFileData(index, 'video'), index)
						}
					/>
				);
			} else if (file.mime_type.indexOf('pdf') > -1) {
				return (
					<View
						key={index}
						style={[styles.fileItem, this.props.itemStyle, styles.documentItem]}>
						<TouchableOpacity
							onPress={() =>
								this.props.onSelect &&
								this.props.onSelect(this.getFileData(index, 'pdf'), index)
							}>
							<Image style={styles.fileImage} source={icons.document} />
							<Text numberOfLines={1} style={[globalStyles.text, styles.text]}>
								{file.fileName || file.title || file.web_key}
							</Text>
						</TouchableOpacity>
					</View>
				);
			} else {
				return (
					<View key={index} style={[styles.fileItem, this.props.itemStyle]}>
						<TouchableOpacity onPress={() => Linking.openURL(file.file_url)}>
							<Image style={styles.fileImage} source={icons.document} />
							<Text numberOfLines={1} style={[globalStyles.text, styles.text]}>
								{file.fileName || file.title || file.web_key}
							</Text>
						</TouchableOpacity>
					</View>
				);
			}
		} else {
			return (
				<View key={index} style={[styles.fileItem, this.props.itemStyle]}>
					<TouchableOpacity onPress={() => Linking.openURL(file.file_url)}>
						<Image style={styles.fileImage} source={icons.document} />
						<Text numberOfLines={1} style={[globalStyles.text, styles.text]}>
							{file.fileName || file.title || file.web_key}
						</Text>
					</TouchableOpacity>
				</View>
			);
		}
	};

	getFileData = (index, fileType) => {
		return index || index === 0
			? this.state.attachment[index].mime_type &&
			  this.state.attachment[index].mime_type.indexOf(fileType) > -1
				? this.state.attachment[index]
				: null
			: null;
	};

	render() {
		return <View style={styles.container}>{this.getFileList()}</View>;
	}
}
