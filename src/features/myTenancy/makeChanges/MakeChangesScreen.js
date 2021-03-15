import React, { Component } from 'react';
import { ScrollView, View, Text, Alert } from 'react-native';

import globalStyles from '@src/styles/styles';
import styles from '@src/features/myTenancy/makeChanges/styles';
import FxButton from '@src/components/shared/button/FxButton';
import { Routes } from '@src/navigation/screenNames';
import issues from '@src/api/issues';
import { issueType } from '@src/features/issues/constants/issueType';
import Indicator from '@src/components/shared/indicator/Indicator';

class MakeChangesScreen extends Component {
	constructor(props) {
		super(props);
		this.onPressButton = this.onPressButton.bind(this);
		this.state = {
			loading: false
		};
	}

	onPressButton(type) {
		this.setState({ loading: true });
		let title = type ? type.replace(/_/g, ' ') : null;
		if (title) {
			title = title[0].toUpperCase() + title.substring(1).toLowerCase();
		}

		const params = {
			type: type,
			title: title || '',
			description: title || ''
		};

		issues.create(params).then(async res => {
			if (res.issue_id) {
				this.setState({ loading: false }, () => {
					this.props.navigation.navigate(Routes.MAKE_CHANGES_CONFIRM, { type: type });
				});
			} else {
				Alert.alert('Error Message', 'There is a problem, please try again', [
					{
						text: 'Close',
						onPress: () => {
							this.setState({ loading: false });
						}
					}
				]);
			}
		});
	}

	render() {
		return (
			<ScrollView>
				<Indicator visible={this.state.loading} />
				<View style={globalStyles.containerColor}>
					<Text
						style={[globalStyles.subTitleText, globalStyles.fontLight, styles.margin]}>
						Need to change your tenancy? Let us know using the buttons below and we’ll get in touch with you.
					</Text>

					<View style={[styles.line, styles.margin]} />

					<FxButton
						onPress={() => this.onPressButton(issueType.RENEWALS)}
						text="I WANT TO RENEW"
						style={styles.margin}
					/>
					<Text style={[globalStyles.description, styles.description, styles.margin]}>
						Renew your contract if you want to stay in your property after the end date
						of your tenancy agreement. Ideally you should do this two months before the
						end date. Remember, any extension of your tenancy is dependent on your
						landlord and acceptable terms being agreed.
					</Text>

					<View style={[styles.line, styles.margin]} />

					<FxButton
						onPress={() => this.onPressButton(issueType.END_OF_TENANCY)}
						text="I WANT TO BREAK"
						style={styles.margin}
						disabled={this.state.loading}
					/>
					<Text style={[globalStyles.description, styles.description, styles.margin]}>
						Carefully check your tenancy agreement to see whether you can end your
						tenancy early. If you can, you’ll find the process described there,
						along with any consequences you should consider. If only one, or some,
						occupants want to leave, you need the Change of Occupancy option below.
					</Text>

					<View style={[styles.line, styles.margin]} />

					<FxButton
						onPress={() => this.onPressButton(issueType.CHANGE_OF_OCCUPANCY)}
						text="CHANGE OF OCCUPANCY"
						style={styles.margin}
					/>
					<Text style={[globalStyles.description, styles.description, styles.margin]}>
						If you or another occupant in your rental property wants to move out early,
						and potentially be replaced by a new occupant, a Change of Occupancy must
						be completed. If this is not done, departing occupants are still legally
						responsible for bills and rent at the property.
					</Text>
				</View>
			</ScrollView>
		);
	}
}

export default MakeChangesScreen;
