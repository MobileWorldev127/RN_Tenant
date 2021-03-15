import React, { Component } from 'react';
import Indicator from '@src/components/shared/indicator/Indicator';
import auth from '@src/api/auth';
import contacts from '@src/api/contacts';
import propertiesApi from '@src/api/properties';
import { NavigationActions } from 'react-navigation';
import { Routes } from '@src/navigation/screenNames';
import ViewBackground from '@src/components/shared/viewBackground/ViewBackground';
import images from '@src/assets/images';

const TENANT_RELATIONSHIP = 'TEN';
class MainScreen extends Component {
	constructor(props) {
		super(props);

		this.state = {
			properties: [],
			loading: false
		};
	}

	componentDidMount() {
		this.loadProperties();
	}

	loadProperties = async () => {
		this.setState({ loading: true });

		const contact = await contacts.getContact();

		const [properties, isTokenValid] = await Promise.all([
			propertiesApi.getProperties(contact.contact_id),
			auth.hasValidToken()
		]);

		this.setState({ loading: false });

		if (isTokenValid) this.redirectUser(properties, contact);
	};


	redirectUser(properties, contact) {
		if (properties.length > 0) {
			// If user has only one property, go to main page otherwise go to select tenancy
			if (properties.length > 1) {
				this.props.navigation.navigate(Routes.SELECT_TENANCY, { properties: properties });
			} else {
				propertiesApi.setProperty(properties[0]);
				//We need to mark home screen as the main in the routing history
				const resetAction = NavigationActions.reset({
					index: 0,
					actions: [
						NavigationActions.navigate({
							routeName: Routes.HOME,
							params: { property: properties[0] }
						})
					]
				});

				this.props.navigation.dispatch(resetAction);
			}
		} else {
			this.props.navigation.navigate(Routes.NOT_TENANT, { contact: contact });
		}
	}

	render() {
		return (
			<ViewBackground source={images.splash}>
				<Indicator visible={this.state.loading} />
			</ViewBackground>
		);
	}
}

export default MainScreen;
