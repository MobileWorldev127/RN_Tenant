import React, { Component } from 'react';
import { View, Text, Button, Image, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';
import { colors } from '@src/styles/colors';

import issues from '@src/api/issues';
import noticesApi from '@src/api/notices';
import IconButton from '@src/components/shared/iconButton/IconButton';
import { Routes } from '@src/navigation/screenNames';

import globalStyles from '@src/styles/styles';
import styles from '@src/components/issues/IssueTabs/styles';
import icons from '@src/assets/icons';
import PushNotification from 'react-native-push-notification-ce';

import { issues_statuses, update_types } from '/src/features/issues/constants/issuesStatuses';

export const OPEN = 'OPEN';

export default class IssuesTabs extends Component {
	static propTypes = {
		closingIssueId: PropTypes.string // It comes from Close Issue panel, indicates the CLOSING action
	};

	constructor(props) {
		super(props);

		this.state = {
			closingIssueId: this.props.closingIssueId,
			showOpen: !this.props.closingIssueId,
			loading: true,
			issues: null,
			notices: {},
		};
	}

	componentDidMount() {
		this.willFocusSubscription = this.props.navigation.addListener('willFocus', () =>
			this.init()
		);
	}

	componentWillUnmount() {
		// unsubscribe to event listener
		this.willFocusSubscription.remove();
	}

	async init() {
		this.setState({ loading: true });
		// let issuelist = await issues.getIssues();
		let [issuelist, noticeList] = await Promise.all([issues.getIssues(), noticesApi.getNotices()]);

		let notices = {}
		noticeList.map(notice => {
			if (notice.event_notification_type.notification_type_code === "UNRIU") {
				notices[notice.action_id] = notice.object_count
			}
		})

		// Sort issues according to the one created most recently
		issuelist.sort((issue_a, issue_b) => {
			const a = new Date(issue_a.created_datetime);
			const b = new Date(issue_b.created_datetime);

			return a > b ? -1 : a < b ? 1 : 0;
		});

		this.setState({
			issues: {
				OPEN: issuelist.filter(
					issue =>
						this.getLastUpdateIssue(issue).update_type !== update_types.CLOSE &&
							issue.status !== issues_statuses.RESOLVED &&
								issue.status !== issues_statuses.NO_ACTION
				),
				CLOSE: issuelist.filter(
					issue =>
						this.getLastUpdateIssue(issue).update_type === update_types.CLOSE ||
							issue.status === issues_statuses.RESOLVED ||
								issue.status === issues_statuses.NO_ACTION
				)
			},
			loading: false,
			notices: notices
		});
	}

	getLastUpdateIssue(issue) {
		return issue && !issue.Message && issue.issue_updates && !!issue.issue_updates.length
			? issue.issue_updates[0]
			: {};
	}

	getTabHeader(open) {
		const active = (open && this.state.showOpen) || !(open || this.state.showOpen);
		return (
			<TouchableOpacity
				style={[styles.button, active ? styles.active : {}]}
				activeOpacity={0.5}
				onPress={() => this.setState({ showOpen: open })}>
				<Text style={[globalStyles.textDescription, active ? styles.activeText : {}]}>
					{open ? 'Open Issues' : 'Closed Issues'}
				</Text>
			</TouchableOpacity>
		);
	}

	getDescription(issue) {
		return (
			<Text style={[styles.descriptionText, globalStyles.fontLight]}>
				{'Opened on ' +
					moment(issue.created_datetime).format('D MMMM YYYY') +
					' at ' +
					moment(issue.created_datetime).format('hh:mm A') +
					(!!issue.reference ? '\nRef: ' + issue.reference : '')}
			</Text>
		);
	}

	getContent() {
		return (
			<FlatList
				data={this.state.issues[this.state.showOpen ? OPEN : update_types.CLOSE]}
				keyExtractor={item => item.issue_id}
				extraData={this.state.closingIssueId}
				renderItem={({ item, index }) => this.getContentIssue(item, index)}
			/>
		);
	}

	getClosingMessage() {
		return (
			<View style={styles.closingMessage}>
				<View style={styles.closingText}>
					<Text style={[globalStyles.textBold, styles.text]}>
						Thank you for closing this issue
					</Text>
					<Text style={[globalStyles.text, styles.text]}>
						If you are still experiencing problems, please reopen this issue
					</Text>
				</View>
				<View style={styles.closeIconContainer}>
					<TouchableOpacity onPress={() => this.setState({ closingIssueId: null })}>
						<Image style={styles.closeIcon} source={icons.smallWhiteX} />
					</TouchableOpacity>
				</View>
			</View>
		);
	}

	getContentIssue(item, index) {
		return (
			<View>
				{!this.state.showOpen && item.issue_id === this.state.closingIssueId
					? this.getClosingMessage()
					: null}
				<IconButton
					index={index}
					id={item.issue_id}
					style={this.getButtonStyle(index)}
					icon={{
						source: icons[item.issue_type.toLowerCase()],
						style: styles.icons
					}}
					title={item.title}
					type={item.issue_type ? item.issue_type.replace(/_/g, ' ') : null}
					updates={this.state.notices[item.issue_id]}
					description={this.getDescription(item)}
					click={() => this.onClickIssue(item)}
				/>
			</View>
		);
	}

	onClickIssue(item) {

		const noticesObject = this.state.notices

		// Count the total number of unread messages, excluding the undread messages
		// for this issue (the issue the user clicked on)
		const notificationCount = Object.keys(noticesObject).reduce((previous, key) => {
			if (key !== item.issue_id) {
				return previous + noticesObject[key];
			}
			return previous;
		}, 0);

		// Update the badge number on the home screen
		PushNotification.setApplicationIconBadgeNumber(notificationCount || 0);

		// Navigate to the issue
		this.props.navigation.navigate(Routes.ISSUE_DETAILS, {
			issueId: item.issue_id
		})
	}

	getButtonStyle(index) {
		return {
			highlight: styles.issueHighlight,
			button: [styles.issueButton, index === 0 ? styles.issueButtonFirst : {}],
			title: [
				globalStyles.issueTitleBold,
				globalStyles.fontMedium,
				this.state.showOpen ? {} : styles.issueTitleClosed
			],
			description: styles.description,
			type: this.state.showOpen ? {} : styles.issueTypeClosed
		};
	}

	render() {
		return (
			<View>
				<View style={styles.header}>
					{this.getTabHeader(true)}
					{this.getTabHeader(false)}
				</View>
				{this.state.loading &&
					<View style={styles.loading}>
						<Text>Loading...</Text>
					</View>}
				<View style={styles.content}>{this.state.issues ? this.getContent() : null}</View>
			</View>
		);
	}
}
