import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

import clausesText from '@src/components/myTenancy/tenancyClauses/clausesText';
import globalStyles from '@src/styles/styles';
import styles from '@src/components/myTenancy/tenancyClauses/styles';

export default class TenancyClauses extends Component {
	static propTypes = {
		offer: PropTypes.object.isRequired
	};

	getFurnished() {
		return (
			<View style={styles.screen}>
				<Text style={[globalStyles.textBold, styles.text]}>
					{clausesText.furniture.title.toUpperCase()}
				</Text>

				<Text style={[globalStyles.text, styles.text]}>
					{this.props.offer.property_furnished
						? clausesText.furniture.furnished
						: clausesText.furniture.unfurnished}
				</Text>
			</View>
		);
	}

	getClauses() {
		return this.props.offer.offer_clauses.map((item, index) => {
			return (
				<View key={index} style={styles.screen}>
					<Text style={[globalStyles.textBold, styles.text]}>
						{item.offer_clause_title.toUpperCase()}
					</Text>
					<Text style={[globalStyles.text, styles.text]}>{item.offer_clause_text}</Text>
				</View>
			);
		});
	}

	render() {
		return (
			<View>
				{this.getFurnished()}
				{this.getClauses()}
			</View>
		);
	}
}
