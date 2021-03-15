import React, { Component } from 'react';
import { Text, FlatList, View, Image } from 'react-native';

import ViewBackground from '@src/components/shared/viewBackground/ViewBackground';
import IssueTypeCard from '@src/components/issues/issueTypeCard/IssueTypeCard';
import globalStyles from '@src/styles/styles';
import styles from '@src/features/issues/new/styles';
import issues from '@src/api/issues';
import icons from '@src/assets/icons';
import properties from '@src/api/properties';
import { Routes } from '@src/navigation/screenNames';
import { issueType } from '@src/features/issues/constants/issueType';
import Indicator from '@src/components/shared/indicator/Indicator';


class NewIssueScreen extends Component {
	constructor(props) {
		super(props);
		this.getListHeaderComponent.bind(this.getListHeaderComponent);
		this.getMarginStyling.bind(this.getMarginStyling);
		this.onPress.bind(this.onPress);

		this.state = {
			items: [],
			loading: true,
			isManaged: null,
		};

		this.init();
	}

	async init() {
		this.setState({
			isManaged: await properties.isManaged(),
			items: await issues.getIssuesType(),
		});
	}

	componentWillUpdate(nextProps, nextState) {
		const { loading, isManaged } = nextState;
		// only remove the loader when we get a reponse
		if (loading && typeof isManaged === 'boolean' ) {
			this.setState({ loading: false });
		}
	}

	getLandlordManage() {
		if (!this.state.isManaged) {
			return (
				<View style={styles.warning}>
					<Image style={styles.warningIcon} source={icons.issuesIcon} />
					<Text style={[globalStyles.description, styles.warningText]}>
						{'Your landlord has opted to manage this property independently of Foxtons'}
					</Text>
				</View>
			);
		}
	}

	onPress(item) {
		switch (item.issue_type_code) {
			case issueType.MAINTENANCE:
				this.props.navigation.navigate(Routes.MAINTENANCE);
				break;
			case issueType.UTILITIES:
				this.props.navigation.navigate(Routes.UTILITIES);
				break;
			default:
				this.props.navigation.navigate(Routes.NEW_ISSUE_FORM, {
					item: item
				});
				break;
		}
	}

	getResponsible() {
		return this.state.isManaged ? 'Foxtons?' : 'your Landlord?';
	}

	getListHeaderComponent() {
		return (
			<View style={styles.containerView}>
				<View style={styles.advice}>
					<View style={styles.issueTitle}>
						<Text style={[globalStyles.issueTitle, globalStyles.fontLight]}>
							{'What type of issue would you like to raise with'}{' '}
							{this.getResponsible()}
						</Text>
					</View>
					{this.getLandlordManage()}
				</View>
			</View>
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
				{this.state.loading && <Text style={styles.loading}>Loading...</Text>}
				{!this.state.loading && <FlatList
					ListHeaderComponent={this.getListHeaderComponent()}
					data={this.state.items}
					horizontal={false}
					numColumns={2}
					keyExtractor={item => item.issue_type_code}
					renderItem={({ item, index }) => (
						<View style={this.getMarginStyling(index)}>
							<IssueTypeCard
								item={item}
								icon={icons[item.issue_type_code.toLowerCase()]}
								click={item => this.onPress(item)}
							/>
						</View>
					)}
				/>}
			</ViewBackground>
		);
	}
}

export default NewIssueScreen;
