import { Routes } from '@src/navigation/screenNames';
import { HomeType } from '@src/features/home/homeTypes';
import icons from '@src/assets/icons';

export const Menu = [
	{
		icon: {
			source: icons.checkOnProgress,
			style: {
				width: 35,
				height: 32
			}
		},
		route: Routes.CHECK_ON_PROGRESS,
		title: 'Check on progress',
		description: 'See what you have to do before you move in',
		source: HomeType.MOVE_IN_LESS
	},
	{
		icon: {
			source: icons.myTenancy,
			style: {
				width: 38,
				height: 32
			}
		},
		route: Routes.MY_TENANCY,
		title: 'My Tenancy',
		source: HomeType.MOVED_IN,
		description: 'Details, your deposit and making changes'
	},
	{
		icon: {
			source: icons.issues,
			style: {
				width: 32,
				height: 32
			}
		},
		active: true,
		route: Routes.ISSUES,
		title: 'Issues',
		source: HomeType.MOVED_IN
	},
	{
		icon: {
			source: icons.myDocuments,
			style: {
				width: 27,
				height: 33
			}
		},
		route: Routes.MY_DOCUMENTS,
		title: 'My Documents',
		description: 'View your documents related to your tenancy',
		source: HomeType.MOVED_IN
	},
	{
		icon: {
			source: icons.contacts,
			style: {
				width: 36,
				height: 32
			}
		},
		active: true,
		route: Routes.CONTACTS,
		title: 'Contacts',
		source: HomeType.MOVED_IN,
		description: 'Foxtons, Live Chat and your Landlord'
	},
	{
		icon: {
			source: icons.localIcon,
			style: {
				width: 25,
				height: 35
			}
		},
		active: true,
		route: Routes.LOCAL_LIFE,
		title: 'Local Life',
		description: 'See your neighbourhood',
		source: HomeType.MOVED_IN
	},
	{
		icon: {
			source: icons.localIcon,
			style: {
				width: 25,
				height: 35
			}
		},
		active: true,
		route: Routes.LOCAL_LIFE,
		title: 'Local Life',
		description: 'See your neighbourhood',
		source: HomeType.MOVE_IN_LESS
	},
	{
		icon: {
			source: icons.issueTracker,
			style: {
				width: 35,
				height: 35
			}
		},
		route: Routes.ISSUE_TRACKER_DEMO,
		title: 'Tracker Tour',
		description: 'Learn how to use the tracker',
		source: HomeType.MOVE_IN_LESS
	},
	{
		icon: {
			source: icons.contacts,
			style: {
				width: 35,
				height: 32
			}
		},
		route: Routes.CONTACTS,
		title: 'Contact Foxtons',
		description: 'Foxtons, Live Chat and your Landlord',
		source: HomeType.MOVE_IN_LESS
	},
	{
		icon: {
			source: icons.vouchers,
			style: {
				width: 39.5,
				height: 27
			}
		},
		route: Routes.VOUCHERS,
		title: 'Vouchers',
		description: 'See what discounts are available',
		source: HomeType.MOVED_IN
	},
	{
		icon: {
			source: icons.faq,
			style: {
				width: 35,
				height: 35
			}
		},
		route: Routes.FAQ,
		title: 'FAQ',
		description: 'Quick answers to frequent questions',
		source: HomeType.MOVED_IN
	},
	{
		icon: {
			source: icons.faq,
			style: {
				width: 35,
				height: 35
			}
		},
		route: Routes.FAQ,
		title: 'FAQ',
		description: 'Quick answers to frequent questions',
		source: HomeType.MOVE_IN_LESS
	}
];
