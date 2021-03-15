import React, { Component } from 'react';
import { Text, FlatList, View, Image } from 'react-native';

import ViewBackground from '@src/components/shared/viewBackground/ViewBackground';
import IssueTypeCard from '@src/components/issues/issueTypeCard/IssueTypeCard';
import IssueSubTypeCard from '@src/components/issues/issueSubTypeCard/IssueSubTypeCard';
import globalStyles from '@src/styles/styles';
import subTypeStyles from '@src/features/issues/new/subTypeStyles';
import { Routes } from '@src/navigation/screenNames';
import issues from '@src/api/issues';
import icons from '@src/assets/icons';
import { issueType } from '@src/features/issues/constants/issueType';
import { maintenance } from '@src/features/issues/constants/subIssueType';
import styles from '@src/features/issues/new/maintenance/styles';

class MaintenanceScreen extends Component {
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
			<View style={subTypeStyles.containerView}>
				<View style={subTypeStyles.issueTitle}>
					<Text style={[globalStyles.issueTitle]}>
						What sort of maintenance issue are you experiencing?
					</Text>
				</View>
				<View>
					<Text style={[globalStyles.label, subTypeStyles.titleSection]}>
						Most common
					</Text>
				</View>
				<View style={subTypeStyles.mostCommon}>{this.getMostCommonList()}</View>
				<View>
					<Text style={[globalStyles.label, subTypeStyles.titleSection]}>Other</Text>
				</View>
			</View>
		);
	}

	getMostCommonList() {
		return maintenance.most_common.map((item, index) => {
			return (
				<View key={index} style={subTypeStyles.cardRight}>
					<IssueSubTypeCard
						item={item}
						icon={icons[item.issue_category.toLowerCase()]}
						styles={subTypeStyles.card}
						iconStyles={subTypeStyles.icon}
						click={item => this.onPress(item)}
					/>
				</View>
			);
		});
	}

	getMarginStyling(index) {
		let itemStyles = [];
		if (Math.abs(index % 2) == 1) {
			itemStyles.push(subTypeStyles.cardRight);
		} else {
			itemStyles.push(subTypeStyles.cardLeft);
		}

		const noOfItems = maintenance.other.length;
		if (index + 2 == noOfItems || index + 1 == noOfItems) {
			itemStyles.push(styles.maintenance);
		}

		return itemStyles;
	}

	render() {
		return (
			<ViewBackground styles={[subTypeStyles.container]}>
				<FlatList
					ListHeaderComponent={this.getListHeaderComponent()}
					data={maintenance.other}
					horizontal={false}
					numColumns={2}
					keyExtractor={item => item.issue_category}
					renderItem={({ item, index }) => (
						<View style={this.getMarginStyling(index)}>
							<IssueTypeCard
								item={item}
								icon={icons[item.issue_category.toLowerCase()]}
								isSubIssue={true}
								styles={subTypeStyles.card}
								iconStyles={subTypeStyles.icon}
								click={item => this.onPress(item)}
							/>
						</View>
					)}
				/>
			</ViewBackground>
		);
	}
}

export default MaintenanceScreen;
