import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Menu } from '@src/components/myTenancy/tenancyMenu/menuNames';
import ArrowButton from '@src/components/shared/arrowButton/ArrowButton';
import styles from '@src/components/myTenancy/tenancyMenu//styles';

export default class TenancyMenu extends Component {
	static propTypes = {
		active: PropTypes.bool
	};

	/**
	 * Get menu list
	 */
	render() {
		return Menu.map((menu, index) => {
			return !menu.active || (menu.active && this.props.active) ? (
				<ArrowButton
					index={index}
					key={index}
					id={menu.route}
					title={menu.title}
					description={menu.description}
					arrow={true}
					style={styles.button}
					click={() => this.props.navigation.navigate(menu.route)}
				/>
			) : null;
		});
	}
}
