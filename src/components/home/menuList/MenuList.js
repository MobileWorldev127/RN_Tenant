import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Routes } from '@src/navigation/screenNames';
import { Menu } from '@src/components/home/menuList/menuNames';
import IconButton from '@src/components/shared/iconButton/IconButton';
import styles from '@src/components/home/menuList/styles';

const ISSUES_OPT_TEXT = 'Open Issues';

export default class MenuList extends Component {
	static propTypes = {
		active: PropTypes.bool,
		homeType: PropTypes.string.isRequired,
		issueCount: PropTypes.number
	};

	getDescription(opt) {
		let description = opt.description;

		if (opt.route === Routes.ISSUES) {
			description = this.props.issueCount + ' ' + ISSUES_OPT_TEXT;
		}

		return description;
	}

	/**
	 * Get menu list
	 */
	render() {
		return Menu.filter(menu => menu.source === this.props.homeType).map((menu, index) => {
			return !menu.active || (menu.active && this.props.active) ? (
				this.props.tenancyStatus === 'COM' || this.props.tenancyStatus === 'CLO' ? (
					menu.route === Routes.MY_TENANCY || menu.route === Routes.CONTACTS ? (
						<IconButton
							key={index}
							index={index}
							id={menu.route}
							title={menu.title.toUpperCase()}
							updates={menu.title.toUpperCase() === 'ISSUES' ? this.props.updates : 0}
							icon={menu.icon}
							description={this.getDescription(menu)}
							style={{ highlight: styles.button }}
							click={() => this.props.navigation.navigate(menu.route)}
						/>
					) : null
				) : (
					<IconButton
						key={index}
						index={index}
						id={menu.route}
						title={menu.title.toUpperCase()}
						updates={menu.title.toUpperCase() === 'ISSUES' ? this.props.updates : 0}
						icon={menu.icon}
						description={this.getDescription(menu)}
						style={{ highlight: styles.button }}
						click={() => this.props.navigation.navigate(menu.route)}
					/>
				)
			) : null;
		});
	}
}
