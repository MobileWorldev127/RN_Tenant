import { Routes } from '@src/navigation/screenNames';
import { HomeType } from '@src/features/home/homeTypes';

export const Menu = [
	{
		route: Routes.MAKE_CHANGES,
		title: 'Changes to Tenancy?',
		description: 'Let us know here',
		active: true
	},
	{
		route: Routes.MY_DEPOSIT,
		title: 'My Deposit',
		description: 'Details about your deposit'
	}
];
