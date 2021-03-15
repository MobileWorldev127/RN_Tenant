import React, { Component } from 'react';
import { Text, FlatList, View, Image } from 'react-native';

import ViewBackground from '@src/components/shared/viewBackground/ViewBackground';
import VoucherCard from '@src/components/vouchers/VoucherCard/VoucherCard';
import { Routes } from '@src/navigation/screenNames';
import styles from '@src/features/vouchers/styles';
import vouchers from '@src/api/vouchers';
import Indicator from '@src/components/shared/indicator/Indicator';

export default class VouchersScreen extends Component {
	constructor(props) {
		super(props);

		this.state = {
			voucherList: [],
			loading: false
		};
	}

	componentDidMount() {
		this.loadData();
	}

	loadData = async () => {
		this.setState({ loading: true });
		const voucherList = await vouchers.getVouchers();
		if (voucherList) this.setState({ voucherList });
		this.setState({ loading: false });
	};

	onPress = item => {
		// Check if item is not the empty-item
		if (Object.keys(item).length > 0) {
			this.props.navigation.navigate(Routes.VOUCHER, {
				item: item
			});
		}
	};

	getMarginStyling = index => {
		let style = null;
		if (index < this.state.voucherList.length) {
			if (Math.abs(index % 2) == 1) {
				style = styles.cardRight;
			} else {
				style = styles.cardLeft;
			}
		} else if (this.state.voucherList.length > 1 && Math.abs(index % 2) == 1) {
			// Set empty-item's style if, and only if, the voucherList.length larger than 1
			style = [styles.cardRight, { opacity: 0 }];
		}

		return style;
	};

	render() {
		return (
			<ViewBackground styles={styles.container}>
				<Indicator visible={this.state.loading} />
				{this.state.voucherList && this.state.voucherList.length > 0 ? (
					<FlatList
						data={[...this.state.voucherList, {}]} // added an empty-item to the array for correctly setting the really last item's style
						horizontal={false}
						numColumns={2}
						keyExtractor={(item, index) => index}
						renderItem={({ item, index }) => (
							<View style={this.getMarginStyling(index)}>
								{/* Insert VoucherCard if item is not the empty-item */}
								{Object.keys(item).length > 0 && (
									<VoucherCard
										icon={item.voucher_image_url}
										styles={styles.card}
										onPress={() => this.onPress(item)}
									/>
								)}
							</View>
						)}
					/>
				) : (
					!this.state.loading && (
						<View style={{ flex: 1, height: '100%', padding: 10 }}>
							<Text style={{ color: 'white' }}>No vouchers available right now</Text>
						</View>
					)
				)}
			</ViewBackground>
		);
	}
}
