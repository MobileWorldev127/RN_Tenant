import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import globalStyles from '@src/styles/styles';
import styles from '@src/components/shared/stepIndicator/styles';
import { colors } from '@src/styles/colors';

export default class StepIndicator extends PureComponent {
	blockHeights = [];

	static propTypes = {
		items: PropTypes.array.isRequired,
		startDate: PropTypes.number.isRequired,
		endDate: PropTypes.number.isRequired
	};

	constructor(props) {
		super(props);
		this.state = {
			items: this.props.items || [],
			todayPosition: 0
		};
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ items: nextProps.items });
	}

	getTodayPointStyle() {
		return [styles.today, { marginTop: this.state.todayPosition }];
	}

	getPointStyle(finished) {
		return [styles.point, finished ? styles.finished : styles.unfinished];
	}

	getLineStyle(index) {
		return [styles.line, index + 1 === this.state.items.length ? styles.last : {}];
	}

	getListSpacing() {
		return (
			<View style={styles.row}>
				<View style={[styles.progress, styles.spacing]}>
					<View style={this.getLineStyle()} />
				</View>
			</View>
		);
	}

	setBlockHeight(event, index, todayPosition) {
		if (this.showTodayIndicator()) {
			this.blockHeights[index] = event.nativeEvent.layout.height * todayPosition;
		}
	}

	setTodayPosition() {
		if (this.showTodayIndicator()) {
			let margin = 42;
			this.blockHeights.forEach(height => (margin += height));
			this.setState({ todayPosition: margin });
		}
	}

	showTodayIndicator() {
		let date = new Date();
		date.setHours(0, 0, 0, 0);
		const now = date.getTime();
		return now >= this.props.startDate && now <= this.props.endDate;
	}

	getSeparator(index) {
		if (index > 0 && index < this.state.items.length - 1) {
			return <View style={styles.separator} />;
		}
	}

	getList() {
		return this.state.items.map((item, index) => {
			return (
				<View
					onLayout={event => this.setBlockHeight(event, index, item.todayPosition)}
					key={index}
					style={styles.row}>
					<View style={styles.progress}>
						<View style={this.getLineStyle(index)} />
						<View style={this.getPointStyle(item.finished)} />
					</View>
					<View style={styles.detail}>
						{item.breakIndicator ? null : this.getSeparator(index)}
						<View style={styles.content}>{item.content}</View>
					</View>
				</View>
			);
		});
	}

	render() {
		return (
			<View onLayout={event => setTimeout(() => this.setTodayPosition())}>
				{this.getListSpacing()}
				{this.getList()}
				{this.showTodayIndicator() ? <View style={this.getTodayPointStyle()} /> : null}
			</View>
		);
	}
}
