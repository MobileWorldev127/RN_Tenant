import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';

import globalStyles from '@src/styles/styles';
import styles from '@src/components/issueDetails/detailsInfo/styles';
import icons from '@src/assets/icons';
import { Routes } from '@src/navigation/screenNames';

export default class DetailsInfo extends Component {
	static propTypes = {
		issue: PropTypes.object.isRequired,
		isClosed: PropTypes.bool.isRequired,
		onPressClose: PropTypes.func.isRequired
	};

	getStartDate() {
		const startDate = this.props.issue.created_datetime;
		return (
			<Text style={globalStyles.description}>
				{'Opened on ' +
					moment(startDate).format('D MMMM YYYY') +
					' at ' +
					moment(startDate).format('hh:mma')}
			</Text>
		);
	}

	getReference() {
		return <Text style={globalStyles.description}>{'Ref: ' + this.props.issue.reference}</Text>;
	}

	getInfo() {
		const imageCount = this.getFileCount('image');
		const videoCount = this.getFileCount('video');
		const documentCount = this.getFileCount() - (imageCount + videoCount);

		return (
			<View style={styles.info}>
				<TouchableOpacity
					style={styles.images}
					disabled={imageCount > 0 ? false : true}
					onPress={() => {
						if (imageCount > 0) this.getImages();
					}}>
					<Image style={styles.icon} source={icons.image} />
					<Text style={[globalStyles.text, styles.text]}>
						{imageCount + (imageCount > 1 ? ' Images' : ' Image')}
					</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.images}
					disabled={documentCount > 0 ? false : true}
					onPress={() => {
						if (documentCount > 0) this.getDocuments();
					}}>
					<Image style={[styles.icon, styles.documentIcon]} source={icons.document} />
					<Text style={[globalStyles.text, styles.text]}>
						{documentCount + (documentCount > 1 ? ' Documents' : ' Document')}
					</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.images}
					disabled={videoCount > 0 ? false : true}
					onPress={() => {
						if (videoCount > 0) this.getVideos();
					}}>
					<Image style={styles.icon} source={icons.video} />
					<Text style={[globalStyles.text, styles.text]}>
						{videoCount + (videoCount > 1 ? ' Videos' : ' Video')}
					</Text>
				</TouchableOpacity>
			</View>
		);
	}

	getImages() {
		let images = []
		let getAttachedImages = source => {
			source.map(file => {
				if (file.mime_type && file.mime_type.indexOf('image') !== -1) {
					let add = true;

					images.forEach(image => {
						if (image.web_key === file.web_key) {
							add = false;
						}
					});
					if (add) images.push(file);
				}
			});
		};

		getAttachedImages(this.props.issue.supporting_media);
		this.props.issue.issue_updates.forEach(update => {
			getAttachedImages(update.supporting_media);
		});

		this.props.navigation.navigate(Routes.IMAGE_CAROUSEL, {
			images
		});
	}

	getDocuments() {
		let documents = [];
		let getAttachedDocuments = source => {
			source.map(file => {
				if (file.mime_type && file.mime_type.indexOf('pdf') !== -1) {
					let add = true;

					documents.forEach(document => {
						if (document.web_key === file.web_key) {
							add = false;
						}
					})
					if (add) documents.push(file);
				}
			});
		};

		getAttachedDocuments(this.props.issue.supporting_media);
		this.props.issue.issue_updates.forEach(update => {
			getAttachedDocuments(update.supporting_media);
		});


		this.props.navigation.navigate(Routes.DOCUMENT_CAROUSEL, {
			documents: documents
		});
	}

	getVideos() {
		let videos = [];
		let getAttachedVideos = source => {
			source.map(file => {
				if (file.mime_type && file.mime_type.indexOf('video') !== -1) {
					let add = true;

					videos.forEach(video => {
						if (video.web_key === file.web_key) {
							add = false
						}
					});

					if (add) videos.push(file)
				}
			});
		};


		getAttachedVideos(this.props.issue.supporting_media);
		this.props.issue.issue_updates.forEach(update => {
			getAttachedVideos(update.supporting_media);
		});

		this.props.navigation.navigate(Routes.VIDEO_CAROUSEL, {
			videos
		});
	}

	getFileCount(type) {
		let count = source => {
			return source.filter(file => !type || file.mime_type.indexOf(type) > -1).length;
		};

		const issueFileCount = count(this.props.issue.supporting_media);
		let messageFileCount = 0;
		this.props.issue.issue_updates.forEach(update => {
			messageFileCount += count(update.supporting_media);
		});

		return (issueFileCount || 0) + messageFileCount;
	}

	getManageIssueButton() {
		if (this.props.isClosed) {
			return <Text style={[globalStyles.text, styles.closedButtonText]}>Closed</Text>;
		} else {
			return (
				<TouchableOpacity onPress={() => this.props.onPressClose()}>
					<Text style={[globalStyles.text, styles.closeButtonText]}>Close Issue</Text>
				</TouchableOpacity>
			);
		}
	}

	render() {
		return (
			<View style={[globalStyles.containerColor, styles.container]}>
				<View style={styles.header}>
					<View style={styles.title}>
						<Text style={globalStyles.subTitleTextBold}>{this.props.issue.title}</Text>
						<Text>{this.getStartDate()}</Text>
						<Text>{this.getReference()}</Text>
					</View>
					<View style={styles.closeButton}>{this.getManageIssueButton()}</View>
				</View>
				{this.getInfo()}
			</View>
		);
	}
}
