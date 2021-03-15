import React, { Component } from 'react';
import { Text, View, Image, Linking, ScrollView, StyleSheet, Platform } from 'react-native';
import HTMLView from 'react-native-htmlview';
import PropTypes from 'prop-types';
import FxButton from '@src/components/shared/button/FxButton';
import { colors } from '@src/styles/colors';

import globalStyles from '@src/styles/styles';
import styles from '@src/features/vouchers/voucher/styles';
import images from '@src/assets/images';
import icons from '@src/assets/icons';

export default class VoucherScreen extends Component {
	constructor(props) {
		super(props);

		this.state = {
			voucher: this.props.navigation.state.params
				? this.props.navigation.state.params.item
				: null
		};
	}

	getCompanyName() {
		return (
			<Text style={[globalStyles.subTitleTextBold, styles.companyName]}>
				{this.state.voucher.voucher_company}
			</Text>
		);
	}

	getName() {
		return (
			<Text style={[globalStyles.subTitleTextBold, styles.offer]}>
				{this.state.voucher.voucher_name}
			</Text>
		);
	}

	getPhoneNumber() {
		return (
			<Text
				onPress={() =>
					Linking.openURL('tel:' + this.state.voucher.voucher_telephone_number)
				}
				style={[globalStyles.subTitleTextBold, styles.phoneNumber]}>
				{this.state.voucher.voucher_telephone_number}
			</Text>
		);
	}

	getDiscountCode() {
		return (
			<View>
				<Text style={[globalStyles.text, styles.discount_info]}>
					Please use the below code
				</Text>
				<FxButton
					disabled={!!!this.state.voucher.voucher_link_url}
					onPress={this.onPressButton}
					text={this.state.voucher.voucher_code}
					style={styles.button}
				/>
			</View>
		);
	}

	getDescription = () => (
		<HTMLView
			value={`<p>${this.state.voucher.voucher_description}</p>`}
			stylesheet={{ ...htmlStyles, p: { fontSize: 18, paddingBottom: 20 } }}
		/>
	);

	getTermsAndConditions = () => (
		<View>
			<Text style={styles.termsAndConditions}>Terms and Conditions</Text>
			<HTMLView
				value={`<p>${this.state.voucher.voucher_ts_and_cs}</p>`}
				stylesheet={htmlStyles}
			/>
		</View>
	);

	onPressButton = () => {
		if (this.state.voucher.voucher_link_url) {
			Linking.openURL(this.state.voucher.voucher_link_url);
		}
	};

	render() {
		return (
			this.state.voucher && (
				<ScrollView style={styles.container}>
					<View style={styles.logoContainer}>
						<Image
							style={styles.logo}
							source={{
								uri:
									this.state.voucher.voucher_image_url &&
									this.state.voucher.voucher_image_url
							}}
						/>
					</View>

					<View style={styles.content}>
						{this.state.voucher.voucher_company ? this.getCompanyName() : null}
						{this.state.voucher.voucher_telephone_number ? this.getPhoneNumber() : null}
						{this.state.voucher.voucher_name ? this.getName() : null}
						{this.state.voucher.voucher_code ? this.getDiscountCode() : null}
						{this.state.voucher.voucher_description ? this.getDescription() : null}
						{this.state.voucher.voucher_ts_and_cs ? this.getTermsAndConditions() : null}
					</View>
				</ScrollView>
			)
		);
	}
}

const htmlStyles = StyleSheet.create({
	p: {
		fontSize: 14,
		fontFamily: Platform.OS === 'android' ? 'sans-serif' : 'Helvetica Neue',
		color: colors.doveGray
	}
});
