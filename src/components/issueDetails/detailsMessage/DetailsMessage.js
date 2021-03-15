import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';

import { Routes } from '@src/navigation/screenNames';
import globalStyles from '@src/styles/styles';
import styles from '@src/components/issueDetails/detailsMessage/styles';
import icons from '@src/assets/icons';
import {
	messageTypes,
	messageOwner
} from '@src/components/issueDetails/detailsMessage/messageTypes';
import AttachmentList from '@src/components/issues/attachmentList/AttachmentList';

const LANDLORD = 'LL';

export default class DetailsMessage extends Component {
	static propTypes = {
		messageOwner: PropTypes.string.isRequired,
		message: PropTypes.object.isRequired,
		initials: PropTypes.string.isRequired,
		onFileSelect: PropTypes.func
	};

	getTitle() {
		return this.props.messageOwner !== messageOwner.TENANT &&
			messageTypes[this.props.message.update_type] &&
			messageTypes[this.props.message.update_type].title ? (
			<Text style={[globalStyles.description, styles.title]}>
				{messageTypes[this.props.message.update_type].title}
			</Text>
		) : null;
	}

	getNote() {
		return this.props.messageOwner !== messageOwner.TENANT &&
			messageTypes[this.props.message.update_type] &&
			messageTypes[this.props.message.update_type].note ? (
			<Text style={[globalStyles.description, styles.note]}>
				{messageTypes[this.props.message.update_type].note}
			</Text>
		) : null;
	}

	getContact() {
		this.props.navigation.navigate(Routes.CONTACT_DETAILS, {
			contact: this.props.message.update_creator
		});
	}

	getMessage(isTenant) {
		return (
			<View style={[styles.message, isTenant ? styles.messageRight : null]}>
				{this.getTitle()}

				<View style={[styles.content, isTenant ? styles.contentRight : null]}>
					{this.getNote()}
					<Text
						style={[
							globalStyles.text,
							isTenant ? styles.contentTextRight : styles.contentTextLeft
						]}>
						{this.props.message.description}
					</Text>
					{this.props.message.supporting_media.length > 0 ? (
						<View style={styles.filelist}>
							<AttachmentList
								{...this.props}
								isReadOnly={true}
								attachment={this.props.message.supporting_media}
								onChange={attachment => this.setState({ attachment })}
								onSelect={file =>
									this.props.onFileSelect && this.props.onFileSelect(file)
								}
							/>
						</View>
					) : null}
				</View>
				<Text
					style={[
						globalStyles.description,
						styles.date,
						isTenant ? styles.dateRight : null
					]}>
					{moment(this.props.message.created_datetime).format('hh:mmA')}
				</Text>
			</View>
		);
	}

	getAvatar() {
		switch (this.props.messageOwner) {
			case messageOwner.TENANT:
				return (
					<View style={[styles.avatarIcon, styles.tenantAvatar]}>
						<Text style={[globalStyles.issueTitleBold, styles.tenantInitials]}>
							{this.props.initials.toUpperCase()}
						</Text>
					</View>
				);
			case messageOwner.LANDLORD:
				return (
					<View style={[styles.avatarIcon, styles.landlordAvatar]}>
						<Text style={[globalStyles.issueTitleBold, styles.landlordInitials]}>
							{LANDLORD}
						</Text>
					</View>
				);
			default:
				return <Image style={styles.avatarIcon} source={icons.logo} />;
		}
	}

	render() {
		const isTenant = this.props.messageOwner === messageOwner.TENANT;
		return (
			<View style={styles.container}>
				<TouchableOpacity onPress={() => (!isTenant ? this.getContact() : null)}>
					<View style={styles.avatar}>{!isTenant ? this.getAvatar() : null}</View>
				</TouchableOpacity>
				{this.getMessage(isTenant)}
				<View style={styles.avatar}>{isTenant ? this.getAvatar() : null}</View>
			</View>
		);
	}
}
