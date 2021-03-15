import React, { Component } from 'react';
import { View, KeyboardAvoidingView, Platform, Keyboard, Dimensions } from 'react-native';

import styles from '@src/features/issues/issueDetails/styles';
import issues from '@src/api/issues';
import FxButton from '@src/components/shared/button/FxButton';
import DetailsInfo from '@src/components/issueDetails/detailsInfo/DetailsInfo';
import DetailsMessageList from '@src/components/issueDetails/detailsMessageList/DetailsMessageList';
import DetailsInput from '@src/components/issueDetails/detailsInput/DetailsInput';
import CloseIssueModal from '@src/features/issues/closeIssue/CloseIssueModal';
import ReOpenIssueModal from '@src/features/issues/reOpenIssue/ReOpenIssueModal';
import { issues_statuses, update_types } from '@src/features/issues/constants/issuesStatuses';
import Indicator from '@src/components/shared/indicator/Indicator';

export default class IssueDetailsScreen extends Component {
	constructor(props) {
		super(props);

		this.state = {
			issue: null,
			showClose: false,
			showReOpen: false,
			lastUpdate: null,
			loading: false
		};
	}

	componentDidMount() {
		this.init(this.getIssueId());
	}

	getIssueId() {
		const issueId =
			this.props.navigation.state.params && this.props.navigation.state.params.issueId;

		return issueId || null;
	}

	init = async issueId => {
		this.setState({
			loading: true,
			showClose: false,
			showReOpen: false
		});
		let issue;
		if (issueId) issue = await issues.getIssue(issueId);
		this.setState({
			issue: issue && !issue.Message ? issue : null,
			lastUpdate: this.getLastUpdateIssue(issue),
			loading: false
		});
	};

	onSendIssueUpdate = async (message, attachment) => {
		Keyboard.dismiss();
		this.setState({ loading: true });
		const update = await issues.update(
			this.state.issue.issue_id,
			message,
			attachment,
			async () => {}
		);

		this.setState({ loading: false });
		await this.init(this.state.issue.issue_id);
	};

	onCloseModal = () => {
		this.init(this.getIssueId());
	};

	getLastUpdateIssue(issue) {
		return issue && !issue.Message && issue.issue_updates && !!issue.issue_updates.length
			? issue.issue_updates[0]
			: {};
	}

	isClosed() {
		return (
			this.state.lastUpdate.update_type === update_types.CLOSE ||
			this.state.issue.status === issues_statuses.RESOLVED ||
			this.state.issue.status === issues_statuses.NO_ACTION
		);
	}

	getFooterComponent() {
		if (this.isClosed()) {
			return (
				<FxButton
					onPress={() => this.setState({ showReOpen: true })}
					text="RE-OPEN THIS ISSUE"
				/>
			);
		} else {
			return <DetailsInput onSend={this.onSendIssueUpdate} />;
		}
	}

	getMessageListScrollView() {
		return <DetailsMessageList {...this.props} issue={this.state.issue} />;
	}

	render() {
		return (
			<View style={styles.container}>
				<Indicator visible={this.state.loading} />
				{this.state.issue ? (
					<View style={{ flex: 1 }}>
						<CloseIssueModal
							visible={this.state.showClose}
							id={this.state.issue.issue_id}
							onHide={() => this.onCloseModal()}
						/>
						<ReOpenIssueModal
							visible={this.state.showReOpen}
							id={this.state.issue.issue_id}
							onHide={() => this.onCloseModal()}
						/>
						<DetailsInfo
							{...this.props}
							issue={this.state.issue}
							isClosed={this.isClosed()}
							onPressClose={() => this.setState({ showClose: true })}
						/>
						{Platform.OS === 'ios' ? (
							<KeyboardAvoidingView
								enabled
								behavior={'padding'}
								style={styles.container}
								keyboardVerticalOffset={
									Dimensions.get('window').height >= 812 ? 84 : 64 // if device is an iPhone X, it's necessary to increase the value
								}>
								{this.getMessageListScrollView()}
								{this.getFooterComponent()}
							</KeyboardAvoidingView>
						) : (
							<KeyboardAvoidingView enabled={false} style={styles.container}>
								{this.getMessageListScrollView()}
								{this.getFooterComponent()}
							</KeyboardAvoidingView>
						)}
					</View>
				) : null}
			</View>
		);
	}
}
