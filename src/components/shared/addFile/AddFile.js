import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Image, ImageBackground } from 'react-native';
import globalStyles from '@src/styles/styles';
import styles from '@src/components/shared/addFile/styles';
import { PDF, VIDEO, IMAGE } from '@src/components/shared/addFile/fileTypes';
import PropTypes from 'prop-types';

import icons from '@src/assets/icons';

// TODO: Enable uploading multiple media?
class AddFile extends Component {
	static propTypes = {
		file: PropTypes.object,
		style: PropTypes.any,
		disabled: PropTypes.bool,
		onPressAddFile: PropTypes.func,
		onPressRemoveFile: PropTypes.func
	};

	render() {
		const { file } = this.props;
		return (
			<View>
				{file &&
					file.mime_type &&
					file.mime_type.indexOf('image') > -1 && (
						<ImageBackground source={file.source} style={styles.image}>
							<TouchableOpacity onPress={this.props.onPressRemoveFile}>
								<Image source={icons.close} style={styles.close} />
							</TouchableOpacity>
						</ImageBackground>
					)}
				{file &&
					file.mime_type &&
					file.mime_type.indexOf('image') === -1 && (
						<View style={styles.file}>
							<Text>{file.fileName}</Text>
							<TouchableOpacity
								onPress={this.props.onPressRemoveFile} // TODO: Alert before removing
							>
								<Image source={icons.close} style={styles.close} />
							</TouchableOpacity>
						</View>
					)}

				<TouchableOpacity
					onPress={this.props.onPressAddFile}
					activeOpacity={0.5}
					style={styles.addFile}
					disabled={this.props.disabled}>
					<Image source={icons.addFile} style={styles.addFileIcon} />
					<Text style={[globalStyles.fontDefault, styles.addFileText, this.props.style]}>
						Add Photo, Video or PDF
					</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

export default AddFile;
