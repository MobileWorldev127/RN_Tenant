import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import PropTypes from 'prop-types';
import FxButton from '@src/components/shared/button/FxButton';
import ViewBackground from '@src/components/shared/viewBackground/ViewBackground';
import { Routes } from '@src/navigation/screenNames';

import progress from '@src/api/progress';

import { ActionType } from '@src/features/checkOnProgress/actionTypes';

import styles from '@src/features/checkOnProgress/styles';
import globalStyles from '@src/styles/styles';

export default class CheckOnProgressScreen extends Component {
	static propTypes = {
		contact: PropTypes.object
	};

	constructor(props) {
		super(props);

		this.state = {
			progress: []
		};
	}

	async componentDidMount() {
		this.setState({
			progress: await progress.getProgress()
		});
	}

	formatNumber = number => {
		var parts = number.toString().split('.');
		parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		return '£' + parts.join('.');
	};

	getActions = () => {
		const { progress } = this.state;

		let obligationValues = [
			{
				title: ActionType.AGREEMENTS_TO_SIGN,
				value: 0,
				total: 0
			},
			{
				title: ActionType.DOCUMENTS_REQUIRED,
				value: progress.standing_order_form ? 1 : 0,
				total: progress.standing_order_form ? 1 : 0
			},
			{
				title: ActionType.TO_PAY,
				value: progress.mims_balance ? progress.mims_balance : 0,
				total: progress.mims_total ? progress.mims_total : 0
			},
			{
				title: ActionType.OTHER_ACTIONS,
				value: progress.keys_collector ? 1 : 2,
				total: 3
			}
		];

		if (progress.tenants_progress) {
			for (let i in progress.tenants_progress) {
				// AGREEMENTS_TO_SIGN's value incrementation
				if (progress.tenants_progress[i].signable_documents) {
					for (let j in progress.tenants_progress[i].signable_documents) {
						if (
							progress.tenants_progress[i].signable_documents[j].document_status ===
							'PTW'
						) {
							obligationValues[0].value++;
						}
						obligationValues[0].total++;
					}
				}
				// DOCUMENTS_REQUIRED's value incrementation
				if (progress.tenants_progress[i].uploadable_documents) {
					for (let j in progress.tenants_progress[i].uploadable_documents) {
						if (
							progress.tenants_progress[i].uploadable_documents[j].document_status ===
								'CRE' ||
							progress.tenants_progress[i].uploadable_documents[j].document_status ===
								'REJ'
						) {
							obligationValues[1].value++;
						}
						obligationValues[1].total++;
					}
				}
			}
		}

		return obligationValues.map((action, index) => (
			<View key={index} style={styles.processItem}>
				<View style={styles.row}>
					<Text style={styles.value}>
						{action.title === ActionType.TO_PAY
							? this.formatNumber(action.value)
							: action.value}{' '}
					</Text>
					<Text style={globalStyles.textDescriptionLight}>{action.title}</Text>
				</View>
				<View style={styles.progressBar}>
					<View
						style={[
							styles.activeSeparator,
							{
								width: ((action.total - action.value) / action.total) * 100 + '%'
							}
						]}
					/>
					<View style={styles.separator} />
				</View>
			</View>
		));
	};

	getProcessList = () => {
		if (this.state.progress) {
			return (
				<View style={[styles.container, styles.processList]}>
					<ScrollView ref={ref => (this.scrollView = ref)}>
						{this.getActions()}
					</ScrollView>
					<View style={globalStyles.separator} />
				</View>
			);
		}
	};

	getWebsite = () => {
		return (
			<View style={styles.container}>
				<View>
					<Text style={[globalStyles.description, styles.note]}>
						Please visit{' '}
						<Text
							style={[globalStyles.fontDefault, styles.highlight]}
							onPress={() => this.onPressButton()}>
							My Foxtons
						</Text>{' '}
						to check on progress and to see if there’s anything you still need to do:
					</Text>
					<FxButton
						style={styles.linkButton}
						text="MY FOXTONS"
						onPress={() => this.onPressButton()}
					/>
				</View>
			</View>
		);
	};

	onPressButton = () => {
		this.props.navigation.navigate(Routes.MY_FOXTONS);
	};

	render() {
		return (
			<ViewBackground>
				<View style={[globalStyles.containerColor, styles.screen]}>
					{this.getProcessList()}
					{this.getWebsite()}
				</View>
			</ViewBackground>
		);
	}
}
