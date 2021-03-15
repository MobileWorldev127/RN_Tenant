import React, { Component } from 'react';
import { View, Animated, Easing, Alert, Platform } from 'react-native';
import PropTypes from 'prop-types';

import IconButton from '@src/components/shared/iconButton/IconButton';
import globalStyles from '@src/styles/styles';
import styles from '@src/components/shared/attachFile/styles';
import { SOURCES, SOURCETITLES } from '@src/components/shared/attachFile/sourceNames';
import * as mime from 'react-native-mime-types';

import ImagePicker from 'react-native-image-picker'; // https://github.com/react-community/react-native-image-picker
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker'; // https://github.com/Elyx0/react-native-document-picker

export default class AttachFile extends Component {
	static propTypes = {
		visible: PropTypes.bool.isRequired,
		onAttach: PropTypes.func.isRequired // Callback with file metadata
	};

	constructor(props) {
		super(props);
		this.state = {
			visible: this.props.visible,
			animation: new Animated.Value(!this.props.visible ? 0 : 250)
		};
	}

	componentWillReceiveProps(nextProps) {
		if (this.state.visible !== nextProps.visible) {
			this.setState({ visible: nextProps.visible }, () => this.onToggle());
		}
	}

	getSource(source, index) {
		return (
			<IconButton
				key={index}
				title={source.title}
				style={{
					highlight: [styles.optionButton, index !== 0 ? styles.optionButtonNext : null],
					title: [globalStyles.issueTitle, globalStyles.fontLight, styles.sourceText]
				}}
				icon={source.icon}
				click={() => this.onPressOption(source.title)}
			/>
		);
	}

	onToggle() {
		this.state.animation.setValue(0);

		Animated.timing(this.state.animation, {
			toValue: this.state.visible ? 250 : 0,
			duration: 100,
			easing: Easing.ease
		}).start();
	}

	async onPressOption(source) {
		let attachment = null;

		switch (source) {
			case SOURCETITLES.CAMERA_PHOTO:
				ImagePicker.launchCamera({ mediaType: 'image' }, response => {
					this.addAttachment(response);
				});
				break;
			case SOURCETITLES.CAMERA_VIDEO:
				ImagePicker.launchCamera({ mediaType: 'video' }, response => {
					this.addAttachment(response);
				});
				break;
			case SOURCETITLES.LIBRARY_PHOTO:
				ImagePicker.launchImageLibrary({ mediaType: 'image' }, response => {
					this.addAttachment(response);
				});
				break;
			case SOURCETITLES.LIBRARY_VIDEO:
				ImagePicker.launchImageLibrary({ mediaType: 'video' }, response => {
					this.addAttachment(response);
				});
				break;
			case SOURCETITLES.DOCUMENT:
				await DocumentPicker.show(
					{
						filetype: [DocumentPickerUtil.allFiles()]
					},
					(error, response) => {
						this.addAttachment(response);
					}
				);
				break;
		}
	}

	addAttachment(file) {
		if (file && file.uri && !file.didCancel) {
			file.source = { uri: file.uri };
			file.mime_type =
				file.type ||
				mime.lookup(file.fileName) ||
				mime.lookup(file.uri) ||
				mime.lookup(file.path);
			file.file_url = file.uri;

			if (file.mime_type && file.mime_type.indexOf('image/jpeg') > -1) {
				file.fileName = file.fileName || 'IMG_' + Math.random(4000) + '.JPG';
				this.props.onAttach(file);
			} else if (
				file.mime_type &&
				(file.mime_type.indexOf('pdf') > -1 || file.mime_type.indexOf('video') > -1)
			) {
				if (!file.fileName) {
					if (file.path) {
						file.fileName = file.path.replace(/^.*[\\\/]/, '');
					} else {
						const extension = file.uri.split('.').pop();
						file.fileName = 'VID_' + Math.random(4000) + extension;
					}
				}

				// Change file extension because iOS transcodes videos
				if (Platform.OS === 'ios' && file.mime_type.indexOf('video') > -1) {
					const extension = file.fileName.split('.').pop();
					if (extension.toLowerCase() !== 'mov') {
						file.fileName = file.fileName.replace(`.${extension}`, '.mov');
					}
				}

				this.props.onAttach(file);
			} else {
				Alert.alert(
					'Invalid file',
					'Unsupported file type. Please, select a JPEG image, video or PDF file',
					[
						{
							text: 'Close',
							style: 'cancel'
						}
					]
				);
			}
		}
	}

	render() {
		return (
			<View>
				<Animated.View
					style={[styles.container, this.props.style, { height: this.state.animation }]}>
					{SOURCES.map((source, index) => this.getSource(source, index))}
				</Animated.View>
			</View>
		);
	}
}
