import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import StepIndicator from '@src/components/shared/stepIndicator/StepIndicator';
import TenancyIndicatorInfo from '@src/components/myTenancy/tenancyIndicator/tenancyIndicatorInfo/TenancyIndicatorInfo';
import moment from 'moment';

import globalStyles from '@src/styles/styles';
import styles from '@src/components/myTenancy/tenancyIndicator/styles';

const START = 'START';
const END_OF_CONTRACT = 'END OF CONTRACT';
const BREAK_CLAUSE = 'BREAK CLAUSE';
const VACATE_DATE = 'VACATE DATE';

export default class TenancyIndicator extends Component {
	static propTypes = {
		offer: PropTypes.object.isRequired,
		tenancy: PropTypes.object.isRequired
	};

	constructor(props) {
		super(props);
		this.state = {
			indicators: []
		};
	}

	componentDidMount() {
		this.getDataMapping();
	}

	// Indicator mapping from timeslots
	getDataMapping() {
		const timeslots = this.props.offer.deal_timeslots;
		let indicators = [];
		let lastIndex = null;
		let previous = {};

		timeslots.forEach((timeslot, index) => {
			// Check, whether
			const modified =
				previous.timeslot_weekly_price !== timeslot.timeslot_weekly_price ||
				previous.timeslot_managed !== timeslot.timeslot_managed;

			if (modified || index === timeslots.length - 1) {
				const title = timeslots.length === 1 || lastIndex === 0 ? START : null;
				const breakDate = this.props.tenancy.tenancy_break_clause_date;
				let endDate = null;
				let breakDateFunc = endDate =>
					this.getBreakClause(
						previous.timeslot_from_date || timeslot.timeslot_from_date,
						endDate,
						breakDate
					);

				if (timeslots.length > 1 && index === timeslots.length - 1) {
					// Last timeslot
					endDate = timeslot.timeslot_to_date;
					indicators.push(
						this.getTimeslotIndicator(previous, title, endDate, breakDateFunc(endDate))
					);
				} else if (lastIndex !== null) {
					// Indicators
					endDate = timeslots[index - 1].timeslot_to_date;
					indicators.push(
						this.getTimeslotIndicator(previous, title, endDate, breakDateFunc(endDate))
					);
				} else if (timeslots.length === 1) {
					// First indicator if there is only one timeslot
					endDate = timeslot.timeslot_to_date;
					indicators.push(
						this.getTimeslotIndicator(timeslot, title, endDate, breakDateFunc(endDate))
					);
				}

				if (
					index === 1 &&
					this.props.tenancy.tenancy_vacate_date &&
					this.props.tenancy.tenancy_vacate_date !== breakDate &&
					this.props.tenancy.tenancy_vacate_date !== endDate
				) {
					indicators.push(this.getVacateDateIndicator(this.props.tenancy.tenancy_vacate_date))
				}

				// Break clause indicator
				const isBreakClause = !!breakDateFunc(endDate);
				if ((timeslots.length === 1 || lastIndex !== null) && isBreakClause) {
					indicators.push(this.getBreakClauseIndicator(breakDate, endDate));
				}


				// End of contract indicator
				if (index === timeslots.length - 1) {
					// If last timeslot is different, indicator added
					if (modified && timeslots.length !== 1) {
						endDate = timeslot.timeslot_to_date;
						indicators.push(
							this.getTimeslotIndicator(
								timeslot,
								null,
								endDate,
								breakDateFunc(endDate)
							)
						);
					}
					indicators.push(this.getEndIndicator(timeslot.timeslot_to_date));
				}

				lastIndex = index;
				previous = timeslot;
			}
		});


		this.getIndicators(indicators);
	}

	// Get today indicator position multiplier
	getToday(startDate, endDate) {
		const start = new Date(startDate).getTime();
		const end = new Date(endDate).getTime();
		let date = new Date();
		date.setHours(0, 0, 0, 0);
		const now = date.getTime();

		if (now >= start && now <= end) {
			return (now - start) / (end - start);
		} else {
			return now >= start ? 1 : 0;
		}
	}

	// Break clause interval check
	getBreakClause(startDate, endDate, breakDate) {
		if (breakDate) {
			const start = new Date(startDate).getTime();
			const end = new Date(endDate).getTime();
			const clause = new Date(breakDate).getTime();

			return clause >= start && clause <= end ? breakDate : null;
		} else {
			return null;
		}
	}

	// Generate indicator data record
	getTimeslotIndicator(timeslot, title, endDate, breakDate) {
		return {
			title: title,
			date: timeslot.timeslot_from_date,
			endDate: endDate,
			breakDate: breakDate || endDate,
			amount: '£' + timeslot.timeslot_weekly_price + ' per week',
			managed: timeslot.timeslot_managed,
			detailsNote: this.getDetailsNote(timeslot.timeslot_managed)
		};
	}

	// Generate break clause indicator data record
	getBreakClauseIndicator(date, endDate) {
		return {
			title: BREAK_CLAUSE,
			date: date,
			breakDate: endDate,
			breakIndicator: true
		};
	}

	getVacateDateIndicator(vacateDate) {
		return {
			title: VACATE_DATE,
			date: new Date(vacateDate).getTime(),
			breakIndicator: true
		}
	}



	// Generate end of contract indicator data record
	getEndIndicator(date) {
		return {
			title: END_OF_CONTRACT,
			date: date,
			endDate: date
		};
	}

	// Generate detail time interval view
	getDetailsDate(startDate, stopDate) {
		return (
			moment(startDate).format('DD MMMM YYYY') +
			' - ' +
			moment(stopDate).format('DD MMMM YYYY')
		);
	}

	// Generate detail note (depends on managed/not managed)
	getDetailsNote(managed) {
		return managed
			? 'Professionally managed by Foxtons'
			: 'Your landlord has chosen to manage this tenancy independently. ' +
					'All maintenance enquiries should be directed towards your landlord.';
	}

	// Generate indicator view
	getIndicators(indicators) {
		let items = [];
		indicators.forEach(tenancy => {
			items.push({
				finished: new Date(tenancy.date).getTime() < new Date().getTime(),
				todayPosition: this.getToday(tenancy.date, tenancy.breakDate) || 0,
				breakIndicator: tenancy.breakIndicator,
				content: (
					<TenancyIndicatorInfo
						title={tenancy.title}
						date={moment(tenancy.date).format('DD MMMM YYYY')}
						amount={tenancy.amount}
						managed={tenancy.managed}
						detailsDate={this.getDetailsDate(tenancy.date, tenancy.endDate)}
						detailsNote={tenancy.detailsNote}
					/>
				)
			});
		});
		this.setState({ indicators: items });
	}

	render() {
		const timeslots = this.props.offer.deal_timeslots;
		return (
			<View>
				{this.state.indicators.length > 0 ? (
					<StepIndicator
						items={this.state.indicators}
						startDate={new Date(timeslots[0].timeslot_from_date).getTime()}
						endDate={new Date(
							timeslots[timeslots.length - 1].timeslot_to_date
						).getTime()}
					/>
				) : null}
			</View>
		);
	}
}
