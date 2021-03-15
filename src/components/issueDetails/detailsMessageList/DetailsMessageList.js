import React, { Component } from 'react';
import { View, Text, SectionList } from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';

import DetailsMessage from '@src/components/issueDetails/detailsMessage/DetailsMessage';
import ImageViewer from '@src/components/shared/imageViewer/ImageViewer';
import DocumentViewer from '@src/components/shared/documentViewer/DocumentViewer';
import MediaViewer from '@src/components/shared/mediaViewer/MediaViewer';
import globalStyles from '@src/styles/styles';
import styles from '@src/components/issueDetails/detailsMessageList/styles';
import { messageOwner } from '@src/components/issueDetails/detailsMessage/messageTypes';
import contacts from '@src/api/contacts';

export default class DetailsMessageList extends Component {
	actualDate = null;

	static propTypes = {
		issue: PropTypes.object.isRequired
	};

	constructor(props) {
		super(props);

		this.state = {
			initials: null,
			selectedFile: null
		};

		this.getMessage = this.getMessage.bind(this);

		this.init();
	}

	async init() {
		const contact = await contacts.getContact();
		const firstName = contact.first_name && contact.first_name.charAt(0);
		const lastName = contact.last_name && contact.last_name.charAt(0);

		let initials = `${firstName || ''}${lastName || ''}`;

		this.setState({
			initials: initials.trim() === '' ? 'T' : initials,
			messages: this.getSortedMessages(this.props.issue)
		});
	}

	componentWillReceiveProps(nextProps) {
		if (
			nextProps.issue &&
			nextProps.issue.issue_updates &&
			this.state.messages.length !== nextProps.issue.issue_updates.length + 1
		) {
			this.setState({
				messages: this.getSortedMessages(nextProps.issue)
			});
		}
	}

	getSortedMessages = issue => {
		// Sort the data in ascending
		let messages = issue.issue_updates;
		messages.push({
			created_datetime: issue.created_datetime,
			description: issue.description,
			supporting_media: issue.supporting_media,
			isFirstMessage: true
		});

		// Separate data into sections by date
		let lastDate = new Date(messages[0].created_datetime);
		lastDate.setHours(0, 0, 0, 0);
		let actualDate = lastDate.getTime();
		let index = 0;
		let sections = [
			{
				title: moment(actualDate).format('D MMMM YYYY'),
				data: [messages[0]]
			}
		];

		for (let i = 1; i < messages.length; i++) {
			if (messages[i].created_datetime) {
				let thisDate = new Date(messages[i].created_datetime);
				thisDate.setHours(0, 0, 0, 0);
				thisDate = thisDate.getTime();
				if (thisDate === actualDate) {
					sections[index].data.push({
						...messages[i],
						isFirstMessage: messages[i].isFirstMessage
					});
				} else {
					sections.push({
						title: moment(thisDate).format('D MMMM YYYY'),
						data: [
							{
								...messages[i],
								isFirstMessage: messages[i].isFirstMessage
							}
						]
					});

					actualDate = thisDate;
					index++;
				}
			}
		}

		return sections;
	};

	getMessageTitle = ({ section }) => {
		return (
			<View>
				<View style={styles.separator} />
				<Text style={[globalStyles.description, styles.date]}>{section.title}</Text>
			</View>
		);
	};

	getMessage({ item }) {
		let msgType = messageOwner.FOXTONS;
		if (item.isFirstMessage) {
			msgType = messageOwner.TENANT;
		} else if (
			item.update_creator &&
			[messageOwner.TENANT, messageOwner.LANDLORD].indexOf(
				item.update_creator.contact_type_code
			) > -1
		) {
			msgType = item.update_creator.contact_type_code;
		}

		return (
			<View>
				<DetailsMessage
					{...this.props}
					initials={this.state.initials}
					message={item}
					messageOwner={msgType}
					onFileSelect={file =>
						this.setState({
							selectedFile: file
						})
					}
				/>
			</View>
		);
	}

	getFileUrlByType = mime => {
		return this.state.selectedFile
			? this.state.selectedFile.mime_type &&
			  this.state.selectedFile.mime_type.indexOf(mime) > -1
				? this.state.selectedFile.file_url
				: null
			: null;
	};

	getFileNameByType = mime => {
		return this.state.selectedFile
			? this.state.selectedFile.mime_type &&
			  this.state.selectedFile.mime_type.indexOf(mime) > -1
				? this.state.selectedFile.title
				: null
			: null;
	};

	getMessages() {
		return (
			<View>
				<SectionList
					inverted={true}
					sections={this.state.messages}
					keyExtractor={(item, index) => index}
					renderItem={this.getMessage}
					renderSectionFooter={this.getMessageTitle}
					style={styles.list}
					contentContainerStyle={styles.listContent}
				/>
				<ImageViewer
					imageURI={this.getFileUrlByType('image')}
					isRemove={false}
					isReadOnly={true}
					onClose={() => this.setState({ selectedFile: null })}
				/>
				<DocumentViewer
					documentURI={this.getFileUrlByType('pdf')}
					name={this.getFileNameByType('pdf')}
					isRemove={false}
					isReadOnly={true}
					onClose={() => this.setState({ selectedFile: null })}
				/>
				<MediaViewer
					videoURI={this.getFileUrlByType('video')}
					isRemove={false}
					isReadOnly={true}
					onClose={() => this.setState({ selectedFile: null })}
				/>
			</View>
		);
	}

	render() {
		return (
			<View style={[styles.container, this.props.style]}>
				{this.state.initials ? this.getMessages() : null}
			</View>
		);
	}
}
