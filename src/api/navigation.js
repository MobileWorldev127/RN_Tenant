import { NavigationActions } from 'react-navigation';

let _navigation;

function setNavigation(navigationComponent) {
	_navigation = navigationComponent;
}

function getNavigation() {
	return _navigation;
}

function reset(routeName, params) {
	_navigation.dispatch(
		NavigationActions.reset({
			index: 0,
			actions: [
				NavigationActions.navigate({
					type: 'Navigation/NAVIGATE',
					routeName,
					params
				})
			]
		})
	);
}

function navigate(routeName, params) {
	_navigation.dispatch(
		NavigationActions.navigate({
			type: 'Navigation/NAVIGATE',
			routeName,
			params
		})
	);
}

function getCurrentRoute() {
	if (!_navigation || !_navigation.state.nav) return null;
	return _navigation.state.nav.routes[_navigation.state.nav.index] || null;
}

export default {
	setNavigation,
	getNavigation,
	navigate,
	reset,
	getCurrentRoute
};
