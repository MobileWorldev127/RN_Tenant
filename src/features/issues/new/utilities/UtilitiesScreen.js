import React, { Component } from 'react';
import { Text, FlatList, View, Image, Linking } from 'react-native';

import ViewBackground from '@src/components/shared/viewBackground/ViewBackground';
import IssueTypeCard from '@src/components/issues/issueTypeCard/IssueTypeCard';
import IssueSubTypeCard from '@src/components/issues/issueSubTypeCard/IssueSubTypeCard';
import globalStyles from '@src/styles/styles';
import styles from '@src/features/issues/new/subTypeStyles';
import { Routes } from '@src/navigation/screenNames';
import issues from '@src/api/issues';
import icons from '@src/assets/icons';
import { issueType } from '@src/features/issues/constants/issueType';
import { utilities } from '@src/features/issues/constants/subIssueType';
import ToggleOption from '@src/components/shared/toggleOption/ToggleOption';
import Link from '@src/components/shared/link/Link';

const PHONE_NUM_GAS = '0800 111 999';
const PHONE_NUM_ELECTRICAL = '0800 028 0247';
const PHONE_NUM_WATER = ' 0845 9200 800';
const PHONE_NUM_WATER_2 = '0845 769 7985';
const PHONE_NUM_BURGLARY = '999';
class UtilitiesScreen extends Component {
	constructor(props) {
		super(props);
		this.onPress.bind(this.onPress);
	}

	onPress(item) {
		this.props.navigation.navigate(Routes.NEW_ISSUE_FORM, {
			item: item,
			pop: 3
		});
	}

	getListHeaderComponent() {
		return (
			<View style={styles.containerView}>
				<View style={styles.issueTitle}>
					<Text style={[globalStyles.issueTitle]}>Is your issue an emergency?</Text>
				</View>
				<View style={styles.emergency}>{this.getGas()}</View>
				<View style={styles.emergency}>{this.getElectricalPowerCut()}</View>
				<View style={styles.emergency}>{this.getWater()}</View>
				<View style={[styles.emergency, styles.block]}>{this.getBurglary()}</View>
				<View>
					<Text style={[globalStyles.issueTitle, styles.subBlock]}>
						In the event of an non-emergency fill out the following details.
					</Text>
				</View>
				<View>
					<Text style={[globalStyles.descriptionBackground, styles.subBlock]}>
						What sort of utility issue are you experiencing?
					</Text>
				</View>
			</View>
		);
	}

	getGas() {
		return (
			<ToggleOption
				text={'Gas Leak?'}
				content={
					<View style={styles.containerEmergency}>
						<Text>
							<Text style={globalStyles.textDescription}>
								In the event of a gas leak, please call National Grid on{' '}
							</Text>
							<Text
								onPress={() => Linking.openURL('tel:' + PHONE_NUM_GAS)}
								style={[globalStyles.text, styles.link]}>
								{PHONE_NUM_GAS}
							</Text>
							<Text style={globalStyles.textDescription}>.</Text>
						</Text>
					</View>
				}
			/>
		);
	}

	getElectricalPowerCut() {
		return (
			<ToggleOption
				text={'Electrical Power Cut'}
				content={
					<View style={styles.containerEmergency}>
						<Text>
							<Text style={globalStyles.textDescription}>
								In the event of total loss of power, please contact your supplier
								direct or London Energy on{' '}
							</Text>
							<Text
								onPress={() => Linking.openURL('tel:' + PHONE_NUM_ELECTRICAL)}
								style={[globalStyles.text, styles.link]}>
								{PHONE_NUM_ELECTRICAL}
							</Text>
							<Text style={globalStyles.textDescription}>.</Text>
						</Text>
					</View>
				}
			/>
		);
	}

	getWater() {
		return (
			<ToggleOption
				text={'No water'}
				content={
					<View style={styles.containerEmergency}>
						<Text>
							<Text style={globalStyles.textDescription}>
								In the event of a water supply interruption, please call Thames
								Water on{' '}
							</Text>
							<Text
								onPress={() => Linking.openURL('tel:' + PHONE_NUM_WATER)}
								style={[globalStyles.text, styles.link]}>
								{PHONE_NUM_WATER}
							</Text>
							<Text style={globalStyles.textDescription}>
								{' '}
								for London properties, or Three Valleys Water on{' '}
							</Text>
							<Text
								onPress={() => Linking.openURL('tel:' + PHONE_NUM_WATER_2)}
								style={[globalStyles.text, styles.link]}>
								{PHONE_NUM_WATER_2}
							</Text>
							<Text style={globalStyles.textDescription}>
								{' '}
								for Surrey properties.
							</Text>
						</Text>
					</View>
				}
			/>
		);
	}

	getBurglary() {
		return (
			<ToggleOption
				text={'Burglary'}
				content={
					<View style={styles.containerEmergency}>
						<Text>
							<Text style={globalStyles.textDescription}>
								If you have suffered from a break in, please call{' '}
							</Text>
							<Text
								onPress={() => Linking.openURL('tel:' + PHONE_NUM_BURGLARY)}
								style={[globalStyles.text, styles.link]}>
								{PHONE_NUM_BURGLARY}
							</Text>
							<Text style={globalStyles.textDescription}>
								{' '}
								or contact your local police station and they will provide a crime
								number for insurance purposes and help to organise an emergency
								locksmith.
							</Text>
						</Text>
					</View>
				}
			/>
		);
	}

	getMarginStyling(index) {
		let style = null;
		if (Math.abs(index % 2) == 1) {
			style = styles.cardRight;
		} else {
			style = styles.cardLeft;
		}

		return style;
	}

	render() {
		return (
			<ViewBackground styles={[styles.container]}>
				<FlatList
					ListHeaderComponent={this.getListHeaderComponent()}
					data={utilities.most_common}
					keyExtractor={item => item.issue_category}
					renderItem={({ item, index }) => (
						<View key={index} style={[styles.cardRight, styles.containerViewUtilities]}>
							<IssueSubTypeCard
								item={item}
								icon={icons[item.issue_category.toLowerCase()]}
								styles={styles.card}
								iconStyles={styles.icon}
								click={item => this.onPress(item)}
							/>
						</View>
					)}
				/>
			</ViewBackground>
		);
	}
}

export default UtilitiesScreen;
